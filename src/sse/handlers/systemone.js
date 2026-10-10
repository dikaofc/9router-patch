import {
  getProviderCredentials,
  markAccountUnavailable,
  clearAccountError,
  extractApiKey,
  isValidApiKey,
} from "../services/auth.js";
import { getSettings } from "@/lib/localDb";
import { AI_PROVIDERS, resolveProviderId } from "@/shared/constants/providers.js";
import { errorResponse, unavailableResponse } from "open-sse/utils/error.js";
import { HTTP_STATUS } from "open-sse/config/runtimeConfig.js";
import * as log from "../utils/logger.js";
import { updateProviderCredentials, checkAndRefreshToken } from "../services/tokenRefresh.js";
import { getSystemOneCore } from "open-sse/handlers/systemone/index.js";

/**
 * Handle System One requests for providers that declare a compatible endpoint.
 * Body: { provider?, model, state, questions, ... }
 */
export async function handleSystemOne(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    log.warn("SYSTEMONE", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const url = new URL(request.url);
  const modelInput = typeof body.model === "string" ? body.model : "";
  let providerInput = body.provider;
  let model = modelInput;
  if (!providerInput && modelInput.includes("/")) {
    const slash = modelInput.indexOf("/");
    providerInput = modelInput.slice(0, slash);
    model = modelInput.slice(slash + 1);
  } else if (!providerInput) {
    providerInput = modelInput;
  }

  log.request("POST", `${url.pathname} | ${providerInput}`);

  const apiKey = extractApiKey(request);
  if (apiKey) {
    log.debug("AUTH", `API Key: ${log.maskKey(apiKey)}`);
  } else {
    log.debug("AUTH", "No API key provided (local mode)");
  }

  const settings = await getSettings();
  if (settings.requireApiKey) {
    if (!apiKey) {
      log.warn("AUTH", "Missing API key (requireApiKey=true)");
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Missing API key");
    }
    const valid = await isValidApiKey(apiKey);
    if (!valid) {
      log.warn("AUTH", "Invalid API key (requireApiKey=true)");
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
    }
  }

  if (!providerInput) {
    log.warn("SYSTEMONE", "Missing model");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  if (body.state === undefined || body.state === null) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: state");
  }
  if (!body.questions || typeof body.questions !== "object" || Array.isArray(body.questions)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: questions");
  }

  const providerId = resolveProviderId(providerInput);
  const providerInfo = AI_PROVIDERS[providerId];

  if (!providerInfo) {
    log.warn("SYSTEMONE", "Unknown provider", { providerInput });
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Unknown provider: ${providerInput}`);
  }

  if (!providerInfo.serviceKinds?.includes("systemone")) {
    log.warn("SYSTEMONE", "Provider does not support systemone", { providerId });
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Provider '${providerId}' does not support System One.`);
  }

  const systemoneConfig = providerInfo.systemoneConfig;
  if (!systemoneConfig?.baseUrl) {
    log.warn("SYSTEMONE", "Provider has no systemoneConfig.baseUrl", { providerId });
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Provider '${providerId}' has no System One configuration.`);
  }

  if (!model) {
    log.warn("SYSTEMONE", "Missing model");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }

  const requestBody = { ...body, model };
  const excludeConnectionIds = new Set();
  let lastError = null;
  let lastStatus = null;

  while (true) {
    const credentials = await getProviderCredentials(providerId, excludeConnectionIds, model);
    if (!credentials || credentials.allRateLimited) {
      if (credentials?.allRateLimited) {
        const message = lastError || credentials.lastError || "Provider unavailable";
        const status = lastStatus || Number(credentials.lastErrorCode) || HTTP_STATUS.SERVICE_UNAVAILABLE;
        return unavailableResponse(status, message, credentials.retryAfter, credentials.retryAfterHuman);
      }
      if (excludeConnectionIds.size === 0) {
        log.warn("SYSTEMONE", `No active credentials for provider: ${providerId}`);
        return errorResponse(HTTP_STATUS.NOT_FOUND, `No active credentials for provider: ${providerId}`);
      }
      return errorResponse(lastStatus || HTTP_STATUS.SERVICE_UNAVAILABLE, lastError || "All provider accounts are unavailable");
    }

    const refreshedCredentials = await checkAndRefreshToken(providerId, credentials);
    const result = await getSystemOneCore({
      body: requestBody,
      provider: providerId,
      systemoneConfig,
      credentials: refreshedCredentials,
      log,
      onRequestSuccess: async () => {
        await clearAccountError(credentials.connectionId, credentials, model);
      },
    });

    if (result.success) return result.response;

    const { shouldFallback } = await markAccountUnavailable(
      credentials.connectionId,
      result.status,
      result.error,
      providerId,
      model
    );
    if (!shouldFallback) return result.response;

    log.warn("SYSTEMONE", `Account ${credentials.connectionName} unavailable (${result.status}), trying fallback`);
    excludeConnectionIds.add(credentials.connectionId);
    lastError = result.error;
    lastStatus = result.status;
  }
}
