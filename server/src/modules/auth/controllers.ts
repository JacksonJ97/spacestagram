import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { loginSchema } from "modules/auth/schemas";
import { loginUser, logoutUser } from "modules/auth/services";
import { setSessionCookie, clearSessionCookie } from "modules/auth/cookies";

interface UserLoginRequest extends Request {
  body: z.infer<typeof loginSchema>;
}

async function handleUserLogin(
  req: UserLoginRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const { token, expiresAt } = await loginUser({ email, password });

    return setSessionCookie({ res, token, expiresAt })
      .status(OK)
      .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
}

async function handleUserLogout(req: Request, res: Response) {
  const sessionId = req.auth!.sessionId;

  await logoutUser(sessionId);

  return clearSessionCookie(res)
    .status(OK)
    .json({ message: "Logout successful" });
}

export { handleUserLogin, handleUserLogout };
