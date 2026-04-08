import {
  createUser,
  getUserById,
  getUserByEmail,
  createSession,
} from "db/queries";
import { ConflictError, NotFoundError } from "utils/errors";
import { signAccessToken, signRefreshToken } from "utils/jwt";

export async function createAccount({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const user = await createUser({ firstName, lastName, email, password });

  if (!user) {
    throw new Error("Failed to create user");
  }

  const session = await createSession(user.id);

  if (!session) {
    throw new Error("Failed to create session");
  }

  const accessToken = signAccessToken({
    userId: user.id,
    sessionId: session.id,
  });
  const refreshToken = signRefreshToken({ sessionId: session.id });

  return { user, accessToken, refreshToken };
}

export async function getCurrentUser(userId: number) {
  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}
