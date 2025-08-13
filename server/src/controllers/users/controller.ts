import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK, CREATED } from "constants/http";
import { setAuthCookies } from "utils/cookies";
import {
  ConflictError,
  BadRequestError,
  UnauthorizedError,
} from "utils/errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
} from "utils/jwt";
import {
  createUser,
  getUserById,
  getUserByEmail,
  createSession,
} from "db/queries";
import { createAccountSchema } from "controllers/users/schema";

interface CreateAccountRequest extends Request {
  body: z.infer<typeof createAccountSchema>;
}

async function handleCreateAccount(
  req: CreateAccountRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const user = await createUser({ firstName, lastName, email, password });
    const session = await createSession(user.id);

    const accessToken = signAccessToken({
      userId: user.id,
      sessionId: session.id,
    });
    const refreshToken = signRefreshToken({ sessionId: session.id });

    return setAuthCookies({ res, accessToken, refreshToken })
      .status(CREATED)
      .json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        likedPosts: [],
      });
  } catch (error) {
    next(error);
  }
}

async function handleGetCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = { ...req.cookies } as { accessToken: string | undefined };

    if (!cookies.accessToken) {
      return res.status(OK).json(null);
    }

    const { payload, error } = verifyAccessToken(cookies.accessToken);

    if (!payload) {
      throw new UnauthorizedError(error);
    }

    const user = await getUserById(payload.userId);

    if (!user) {
      throw new BadRequestError("Request could not be processed");
    }

    return res.status(OK).json(user);
  } catch (error) {
    next(error);
  }
}

export { handleCreateAccount, handleGetCurrentUser };
