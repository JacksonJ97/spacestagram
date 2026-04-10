import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { OK, CREATED } from "constants/http";
import { clearSessionCookie, setSessionCookie } from "modules/auth/cookies";
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

    const { user, token, expiresAt } = await createAccount({
      firstName,
      lastName,
      email,
      password,
    });

    return setSessionCookie({ res, token, expiresAt }).status(CREATED).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(OK).json(null);
    }

    const user = await getCurrentUser(userId);

    return res.status(OK).json(user ?? null);
  } catch (error) {
    next(error);
  }
}

export { handleCreateAccount, handleGetCurrentUser };
