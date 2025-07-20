import { Response, CookieOptions } from "express";
import { NODE_ENV } from "constants/env";
import { addThirtyDays, addFifteenMinutes } from "utils/functions";

const REFRESH_PATH = "/api/auth/refresh";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV === "production",
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
