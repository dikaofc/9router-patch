import crypto from "node:crypto";
import { getDashboardAuthSecret } from "./dashboardSession";

const INTERNAL_TOKEN_LABEL = "9router-internal-model-test";

export function getInternalRequestToken() {
  try {
    const secret = getDashboardAuthSecret();
    if (!secret) return null;
    return crypto
      .createHmac("sha256", secret)
      .update(INTERNAL_TOKEN_LABEL)
      .digest("hex");
  } catch {
    return null;
  }
}

export function isValidInternalRequestToken(token) {
  try {
    const expected = getInternalRequestToken();
    if (!expected || typeof token !== "string" || token.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    // Fail-closed for this check only — callers try other auth methods.
    return false;
  }
}

export function isInternalRequest(request) {
  return isValidInternalRequestToken(request?.headers?.get("x-9r-internal-token"));
}
