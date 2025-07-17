import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { OK } from "constants/http";
import { BadRequestError } from "utils/errors";
import { setAuthCookies } from "utils/cookies";
import { getUserByEmail, createSession } from "db/queries";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "constants/env";

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
      throw new BadRequestError("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestError("Invalid email or password");
    }

    const session = await createSession(user.id);

    const accessToken = jwt.sign(
      { userId: user.id, sessionId: session.id },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { sessionId: session.id },
      JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}

function handleUserLogout(req: Request, res: Response, next: NextFunction) {
  res.json({ message: "Login route" });
}

export { handleUserLogin, handleUserLogout };
