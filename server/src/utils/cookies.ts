import { Response, CookieOptions } from "express";
import { addThirtyDays, addFifteenMinutes } from "utils/functions";

const ACCESS_PATH = "/";
const REFRESH_PATH = "/api/auth/refresh";

export const defaults: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export const accessTokenOptions: CookieOptions = {
  ...defaults,
  path: ACCESS_PATH,
};

export const refreshTokenOptions: CookieOptions = {
  ...defaults,
  path: REFRESH_PATH,
};

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: {
  res: Response;
  accessToken: string;
  refreshToken: string;
}) =>
  res
    .cookie("accessToken", accessToken, {
      ...accessTokenOptions,
      expires: addFifteenMinutes(),
    })
    .cookie("refreshToken", refreshToken, {
      ...refreshTokenOptions,
      expires: addThirtyDays(),
    });

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions);
