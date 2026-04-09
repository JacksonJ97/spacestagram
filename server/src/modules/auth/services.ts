import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  createSession,
  updateSessionById,
  getSessionById,
  deleteSession,
} from "db/queries";
import { UnauthorizedError } from "utils/errors";
import {
  generateRandomString,
  hashSecret,
  timingSafeCompare,
} from "utils/crypto";
import { ACTIVITY_WRITE_INTERVAL_MS, IDLE_TIMEOUT_MS } from "constants/session";

// Possible move this
export async function createUserSession(userId: number) {
  const id = generateRandomString();
  const secret = generateRandomString();
  const secretHash = hashSecret(secret);

  const session = await createSession({ id, userId, secretHash });

  if (!session) {
    throw new Error("Failed to create session");
  }

  // Clean this up later
  const expiresAt = new Date(
    session.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days
  );

  return { token: `${id}.${secret}`, session, expiresAt };
}

export async function validateSession(token: string) {
  const parts = token.split(".");

  if (parts.length !== 2) return null;

  const [id, secret] = parts;
  const now = new Date();

  if (!id || !secret) return null;

  const session = await getSessionById(id);

  if (!session) return null;

  // Absolute expiry
  if (now.getTime() >= session.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000) {
    await deleteSession(session.id);
    return null;
  }

  // Idle timeout
  if (now.getTime() - session.lastVerifiedAt.getTime() >= IDLE_TIMEOUT_MS) {
    await deleteSession(session.id);
    return null;
  }

  // Verify secret
  const incomingHash = hashSecret(secret);
  if (!timingSafeCompare(incomingHash, session.secretHash)) {
    return null;
  }

  // Activity write-back after successful verification only
  if (
    now.getTime() - session.lastVerifiedAt.getTime() >=
    ACTIVITY_WRITE_INTERVAL_MS
  ) {
    await updateSessionById(session.id, { lastVerifiedAt: now });

    session.lastVerifiedAt = now; // What does this do?
  }

  return session;
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const { token, expiresAt } = await createUserSession(user.id);

  return { token, expiresAt };
}

export async function logoutUser(sessionId: string) {
  await deleteSession(sessionId);
}
