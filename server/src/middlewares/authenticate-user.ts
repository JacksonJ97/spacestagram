import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { UnauthorizedError } from "../utils/errors";

async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = { ...req.cookies } as { accessToken: string | undefined };

    if (!cookies.accessToken) {
      throw new UnauthorizedError(
        "Access token is missing",
        "ACCESS_TOKEN_MISSING"
      );
    }

    const { payload, error } = verifyAccessToken(cookies.accessToken);

    if (!payload) {
      throw new UnauthorizedError(error);
    }

    req.userId = payload.userId;
    next();
  } catch (error) {
    next(error);
  }
}

export default authenticateUser;
