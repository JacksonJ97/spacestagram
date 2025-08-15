import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "utils/jwt";
import { UnauthorizedError } from "utils/errors";
import { accessTokenOptions } from "utils/cookies";

async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookies = { ...req.cookies } as { accessToken: string | undefined };

    if (!cookies.accessToken) {
      throw new UnauthorizedError(
        "Missing access token",
        "ACCESS_TOKEN_MISSING"
      );
    }

    const { payload, error } = verifyAccessToken(cookies.accessToken);

    if (error) {
      res.clearCookie("accessToken", accessTokenOptions);

      const code =
        error === "Expired access token"
          ? "ACCESS_TOKEN_EXPIRED"
          : "ACCESS_TOKEN_INVALID";

      throw new UnauthorizedError(error, code);
    }

    req.userId = payload.userId;
    next();
  } catch (error) {
    next(error);
  }
}

export default authenticateUser;
