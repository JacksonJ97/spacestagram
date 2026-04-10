import { randomBytes, createHash, timingSafeEqual } from "node:crypto";

export function generateRandomString(length = 24): string {
  return randomBytes(length).toString("base64url");
}

export function hashSecret(secret: string) {
  return createHash("sha256").update(secret).digest("base64url");
}

export function timingSafeCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;

  return timingSafeEqual(aBuffer, bBuffer);
}
