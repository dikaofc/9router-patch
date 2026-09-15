import crypto from "node:crypto";

const INTERNAL_TOKEN_LABEL = "9router-internal-model-test";

export function getInternalRequestToken() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return crypto
    .createHmac("sha256", secret)
    .update(INTERNAL_TOKEN_LABEL)
    .digest("hex");
}

export function isValidInternalRequestToken(token) {
  const expected = getInternalRequestToken();
  if (!expected || typeof token !== "string" || token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function isInternalRequest(request) {
  return isValidInternalRequestToken(request?.headers?.get("x-9r-internal-token"));
}
