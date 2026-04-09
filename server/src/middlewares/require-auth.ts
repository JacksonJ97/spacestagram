import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "utils/errors";
import { clearSessionCookie } from "utils/cookies";
import { SESSION_COOKIE_NAME } from "constants/session";
import { validateSession } from "modules/auth/services";

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const cookies = { ...req.cookies } as {
      [SESSION_COOKIE_NAME]: string | undefined;
    };
    const token = cookies[SESSION_COOKIE_NAME];

    if (!token) {
      throw new UnauthorizedError();
    }

    const session = await validateSession(token);

    if (!session) {
      clearSessionCookie(res);
      throw new UnauthorizedError();
    }

    req.auth = {
      userId: session.userId,
      sessionId: session.id,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export default requireAuth;
