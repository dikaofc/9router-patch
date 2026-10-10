import {
  getProviderCredentials,
  markAccountUnavailable,
  clearAccountError,
  extractApiKey,
  isValidApiKey,
} from "../services/auth.js";
import { getSettings, getCombos } from "@/lib/localDb";
import { AI_PROVIDERS, resolveProviderId } from "@/shared/constants/providers.js";
import { errorResponse } from "open-sse/utils/error.js";
import { HTTP_STATUS } from "open-sse/config/runtimeConfig.js";
import * as log from "../utils/logger.js";
import { updateProviderCredentials, checkAndRefreshToken } from "../services/tokenRefresh.js";
import { getSystemOneCore } from "open-sse/handlers/systemone/index.js";

/**
 * Handle System One (v1m) request.
 * Body: { model, state, questions, ... } — provider IS the model (like webSearch).
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
  const providerInput = body.provider || body.model;

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

  return await getSystemOneCore({
    body,
    provider: providerId,
    systemoneConfig,
    credentials: providerId,
    log,
    onRequestSuccess: async () => {},
  });
}
