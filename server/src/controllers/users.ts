import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { CREATED } from "constants/http";
import { ConflictError } from "utils/errors";
import { setAuthCookies } from "utils/cookies";
import { signAccessToken, signRefreshToken } from "utils/jwt";
import { createUser, getUserByEmail, createSession } from "db/queries";

const passwordRequirements = [
  /.{8,}/, // At least 8 characters
  /[0-9]/, // At least 1 number
  /[a-z]/, // At least 1 lowercase letter
  /[A-Z]/, // At least 1 uppercase letter
  /[^A-Za-z0-9]/, // At least 1 special character
];

export const createAccountSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.email().max(254),
  password: z
    .string()
    .max(72)
    .refine((value) =>
      passwordRequirements.every((regex) => regex.test(value))
    ),
});

type NewUser = z.infer<typeof createAccountSchema>;

interface CreateAccountRequest extends Request {
  body: NewUser;
}

async function handleCreateAccount(
  req: CreateAccountRequest,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password } = req.body;

  try {
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
      });
  } catch (error) {
    next(error);
  }
}

export { handleCreateAccount };
