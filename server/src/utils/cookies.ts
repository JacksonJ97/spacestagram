import { Response, CookieOptions } from "express";
import { addThirtyDays, addFifteenMinutes } from "utils/functions";

const REFRESH_PATH = "/api/auth/refresh";

export const defaults: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
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
      ...defaults,
      expires: addFifteenMinutes(),
    })
    .cookie("refreshToken", refreshToken, {
      ...defaults,
      expires: addThirtyDays(),
      path: REFRESH_PATH,
    });

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
