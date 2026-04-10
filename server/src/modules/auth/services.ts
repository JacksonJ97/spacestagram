import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  createSession,
  getSessionById,
  updateSessionById,
  deleteSession,
} from "db/queries";
import {
  hashSecret,
  timingSafeCompare,
  generateRandomString,
} from "utils/crypto";
import { UnauthorizedError } from "utils/errors";
import {
  IDLE_TIMEOUT_MS,
  ABSOLUTE_EXPIRY_MS,
  ACTIVITY_INTERVAL_MS,
} from "modules/auth/constants";

export async function createUserSession(userId: number) {
  const id = generateRandomString();
  const secret = generateRandomString();
  const secretHash = hashSecret(secret);

  const session = await createSession({ id, userId, secretHash });

  if (!session) {
    throw new Error("Failed to create session");
  }

  const expiresAt = new Date(session.createdAt.getTime() + ABSOLUTE_EXPIRY_MS);

  return { token: `${id}.${secret}`, session, expiresAt };
}

export async function validateSession(token: string) {
  const separatorIndex = token.indexOf(".");
  if (separatorIndex <= 0 || separatorIndex === token.length - 1) return null;

  const id = token.slice(0, separatorIndex);
  const secret = token.slice(separatorIndex + 1);

  const session = await getSessionById(id);

  if (!session) return null;

  const nowInMs = Date.now();
  const createdAtInMs = session.createdAt.getTime();
  const lastVerifiedAtInMs = session.lastVerifiedAt.getTime();

  if (nowInMs >= createdAtInMs + ABSOLUTE_EXPIRY_MS) {
    await deleteSession(session.id);
    return null;
  }

  if (nowInMs - lastVerifiedAtInMs >= IDLE_TIMEOUT_MS) {
    await deleteSession(session.id);
    return null;
  }

  const secretHash = hashSecret(secret);
  if (!timingSafeCompare(secretHash, session.secretHash)) {
    return null;
  }

  if (nowInMs - lastVerifiedAtInMs >= ACTIVITY_INTERVAL_MS) {
    const now = new Date(nowInMs);
    await updateSessionById(session.id, { lastVerifiedAt: now });
    session.lastVerifiedAt = now;
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
