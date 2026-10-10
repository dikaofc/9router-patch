// System One (v1m) core handler — sends { model, state, questions } to the provider's
// System One endpoint, mirroring the webSearch pattern (provider IS the model).
import { createErrorResult } from "../../utils/error.js";
import { HTTP_STATUS } from "../../config/runtimeConfig.js";

export async function getSystemOneCore({ body, provider, systemoneConfig, credentials, log, onRequestSuccess }) {
  const { model } = body;
  const baseUrl = systemoneConfig.baseUrl;

  if (!baseUrl) {
    log?.warn?.("SYSTEMONE", "Provider has no systemoneConfig.baseUrl", { provider });
    return createErrorResult(HTTP_STATUS.BAD_REQUEST, `Provider '${provider}' does not support System One.`);
  }

  // Resolve baseUrl with optional {accountId} and {model} placeholders
  let resolvedUrl = baseUrl;
  if (resolvedUrl.includes("{accountId}")) {
    const accountId = credentials?.providerSpecificData?.accountId;
    if (!accountId) {
      log?.warn?.("SYSTEMONE", "Provider requires accountId in providerSpecificData", { provider });
      return createErrorResult(HTTP_STATUS.BAD_REQUEST, `Provider '${provider}' requires accountId in providerSpecificData.`);
    }
    resolvedUrl = resolvedUrl.replace("{accountId}", accountId);
  }
  if (resolvedUrl.includes("{model}")) {
    resolvedUrl = resolvedUrl.replace(/\{model\}/g, model);
  }

  const apiKey = credentials?.apiKey || credentials?.accessToken;
  const headers = {
    "Content-Type": "application/json",
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    ...(systemoneConfig.headers || {}),
  };

  const upstreamBody = { ...body };
  log?.debug?.("SYSTEMONE", `${provider.toUpperCase()} | ${model}`);

  let response;
  try {
    response = await fetch(resolvedUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(upstreamBody),
      ...(typeof AbortSignal?.timeout === "function"
        ? { signal: AbortSignal.timeout(HTTP_STATUS.FETCH_CONNECT_TIMEOUT_MS || 60000) }
        : {}),
    });
  } catch (err) {
    const msg = `Fetch error: ${err?.message || err}`;
    log?.debug?.("SYSTEMONE", msg);
    return createErrorResult(HTTP_STATUS.BAD_GATEWAY, msg);
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    const msg = `Provider error: ${response.status} ${text.slice(0, 200)}`;
    log?.debug?.("SYSTEMONE", msg);
    return createErrorResult(response.status, msg);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    return createErrorResult(HTTP_STATUS.BAD_GATEWAY, `Invalid JSON response from ${provider}`);
  }

  if (onRequestSuccess) await onRequestSuccess();

  const usage = data?.usage;
  return {
    success: true,
    usage: usage
      ? {
          prompt_tokens: usage.input_tokens || 0,
          completion_tokens: usage.output_tokens || 0,
        }
      : null,
    response: new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  };
}
