import { z } from "zod";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { UnauthorizedError } from "utils/errors";
import { setAuthCookies, clearAuthCookies } from "utils/cookies";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
} from "utils/jwt";
import { getUserByEmail, createSession, deleteSessionById } from "db/queries";

export const userLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type UserLogin = z.infer<typeof userLoginSchema>;

interface UserLoginRequest extends Request {
  body: UserLogin;
}

async function handleUserLogin(
  req: UserLoginRequest,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
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
    await deleteSessionById(payload.sessionId);
  }

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
}

export { handleUserLogin, handleUserLogout };
