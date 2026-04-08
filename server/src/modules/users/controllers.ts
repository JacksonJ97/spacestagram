import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK, CREATED } from "constants/http";
import { setAuthCookies } from "utils/cookies";
import { createAccountSchema } from "modules/users/schemas";
import { createAccount, getCurrentUser } from "modules/users/services";

interface CreateAccountRequest extends Request {
  body: z.infer<typeof createAccountSchema>;
}

async function handleCreateAccount(
  req: CreateAccountRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { user, accessToken, refreshToken } = await createAccount({
      firstName,
      lastName,
      email,
      password,
    });

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
  next: NextFunction,
) {
  try {
    const userId = req.userId as number;
    const user = await getCurrentUser(userId);

    return res.status(OK).json(user);
  } catch (error) {
    next(error);
  }
}

export { handleCreateAccount, handleGetCurrentUser };
