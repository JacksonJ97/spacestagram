import { Request, Response, NextFunction } from "express";
import { validateSession } from "modules/auth/services";
import { clearSessionCookie } from "modules/auth/cookies";
import { SESSION_COOKIE_NAME } from "modules/auth/constants";

async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies[SESSION_COOKIE_NAME] as string | undefined;

    if (!token) {
      return next();
    }

    const session = await validateSession(token);

    if (!session) {
      clearSessionCookie(res);
      return next();
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

export default optionalAuth;
