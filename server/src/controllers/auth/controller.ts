import { z } from "zod";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { UnauthorizedError } from "utils/errors";
import { addFifteenMinutes } from "utils/functions";
import {
  setAuthCookies,
  clearAuthCookies,
  accessTokenOptions,
} from "utils/cookies";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "utils/jwt";
import {
  getUserByEmail,
  createSession,
  getSessionById,
  updateSessionById,
} from "db/queries";
import { userLoginSchema } from "controllers/auth/schema";

interface UserLoginRequest extends Request {
  body: z.infer<typeof userLoginSchema>;
}

async function handleUserLogin(
  req: UserLoginRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const session = await createSession(user.id);

    const accessToken = signAccessToken({
      userId: user.id,
      sessionId: session.id,
    });
    const refreshToken = signRefreshToken({ sessionId: session.id });

    return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}

async function handleUserLogout(req: Request, res: Response) {
  const cookies = { ...req.cookies } as { accessToken: string | undefined };
  const { payload } = verifyAccessToken(cookies.accessToken || "");

  if (payload) {
    await updateSessionById(payload.sessionId, { isValid: false });
  }

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
}

async function handleTokenRefresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = { ...req.cookies } as { refreshToken: string | undefined };

    if (!cookies.refreshToken) {
      throw new UnauthorizedError("Missing refresh token");
    }

    const { payload, error } = verifyRefreshToken(cookies.refreshToken);

    if (error) {
      throw new UnauthorizedError(error);
    }

    const session = await getSessionById(payload.sessionId);

    if (!session || !session.isValid) {
      throw new UnauthorizedError("Invalid session");
    }

    if (new Date() > session.expiresAt) {
      throw new UnauthorizedError("Session expired");
    }

    const accessToken = signAccessToken({
      userId: session.userId,
      sessionId: session.id,
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
