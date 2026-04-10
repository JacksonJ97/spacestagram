import { Response, CookieOptions } from "express";
import { SESSION_COOKIE_NAME } from "modules/auth/constants";

export const defaultOptions: CookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

export function setSessionCookie({
  res,
  token,
  expiresAt,
}: {
  res: Response;
  token: string;
  expiresAt: Date;
}) {
  return res.cookie(SESSION_COOKIE_NAME, token, {
    ...defaultOptions,
    expires: expiresAt,
  });
}

export function clearSessionCookie(res: Response) {
  return res.clearCookie(SESSION_COOKIE_NAME, defaultOptions);
}
