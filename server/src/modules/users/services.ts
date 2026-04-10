import bcrypt from "bcryptjs";
import { ConflictError } from "utils/errors";
import { createUser, getUserById, getUserByEmail } from "db/queries";
import { createUserSession } from "modules/auth/services";

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

  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
  });

  if (!user) {
    throw new Error("Failed to create user");
  }

  const { token, expiresAt } = await createUserSession(user.id);

  return { user, token, expiresAt };
}

export async function getCurrentUser(userId: number) {
  const user = await getUserById(userId);
  return user;
}
