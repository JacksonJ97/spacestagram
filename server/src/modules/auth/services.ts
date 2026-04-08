import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  createSession,
  getSessionById,
  updateSessionById,
} from "db/queries";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "utils/jwt";
import { UnauthorizedError } from "utils/errors";

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

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedError("Invalid email or password");
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

  return { accessToken, refreshToken };
}

export async function logoutUser({ accessToken }: { accessToken: string }) {
  const { payload } = verifyAccessToken(accessToken);

  if (payload) {
    await updateSessionById(payload.sessionId, { isValid: false });
  }
}

export async function refreshTokens({
  refreshToken,
}: {
  refreshToken: string;
}) {
  if (!refreshToken) {
    throw new UnauthorizedError("Missing refresh token");
  }

  const { payload, error } = verifyRefreshToken(refreshToken);

  if (error) {
    throw new UnauthorizedError(error);
  }

  const session = await getSessionById(payload.sessionId);

  if (!session || !session.isValid) {
    throw new UnauthorizedError("Invalid session");
  }

  if (new Date() > session.expiresAt) {
    throw new UnauthorizedError("Session expired");
  }

  const accessToken = signAccessToken({
    userId: session.userId,
    sessionId: session.id,
  });

  return { accessToken };
}
