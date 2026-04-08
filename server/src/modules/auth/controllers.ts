import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { addFifteenMinutes } from "utils/functions";
import {
  setAuthCookies,
  clearAuthCookies,
  accessTokenOptions,
} from "utils/cookies";
import { userLoginSchema } from "modules/auth/schemas";
import { loginUser, logoutUser, refreshTokens } from "modules/auth/services";

interface UserLoginRequest extends Request {
  body: z.infer<typeof userLoginSchema>;
}

async function handleUserLogin(
  req: UserLoginRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUser({ email, password });

    return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}

async function handleUserLogout(req: Request, res: Response) {
  const cookies = { ...req.cookies } as { accessToken: string | undefined };

  await logoutUser({ accessToken: cookies.accessToken || "" });

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
}

async function handleTokenRefresh(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cookies = { ...req.cookies } as { refreshToken: string | undefined };

    const { accessToken } = await refreshTokens({
      refreshToken: cookies.refreshToken || "",
    });

    return res
      .cookie("accessToken", accessToken, {
        ...accessTokenOptions,
        expires: addFifteenMinutes(),
      })
      .status(OK)
      .json({ message: "Access token refreshed" });
  } catch (error) {
    clearAuthCookies(res);
    next(error);
  }
}

export { handleUserLogin, handleUserLogout, handleTokenRefresh };
