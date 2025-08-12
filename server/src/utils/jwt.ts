import jwt, {
  SignOptions,
  VerifyOptions,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env";

type AccessTokenPayload = {
  userId: number;
  sessionId: number;
};

type RefreshTokenPayload = {
  sessionId: number;
};

export const signAccessToken = (
  payload: AccessTokenPayload,
  options?: SignOptions
) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m", ...options });
};

export const signRefreshToken = (
  payload: RefreshTokenPayload,
  options?: SignOptions
) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
    ...options,
  });
};

export const verifyAccessToken = (token: string, options?: VerifyOptions) => {
  try {
    const payload = jwt.verify(
      token,
      JWT_ACCESS_SECRET,
      options
    ) as AccessTokenPayload;

    return { payload };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error("Access token expired at: ", error.expiredAt);
      return { error: "Access token expired" };
    }

    if (error instanceof JsonWebTokenError) {
      console.error("JWT Error: ", error.message);
      return { error: "Invalid access token" };
    }

    console.error("Unknown JWT verification error: ", error);
    return { error: "Invalid access token" };
  }
};

export const verifyRefreshToken = (token: string, options?: VerifyOptions) => {
  try {
    const payload = jwt.verify(
      token,
      JWT_REFRESH_SECRET,
      options
    ) as RefreshTokenPayload;

    return { payload };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error("Refresh token expired at: ", error.expiredAt);
      return { error: "Refresh token expired" };
    }

    if (error instanceof JsonWebTokenError) {
      console.error("JWT Error: ", error.message);
      return { error: "Invalid refresh token" };
    }

    console.error("Unknown JWT verification error: ", error);
    return { error: "Invalid refresh token" };
  }
};
