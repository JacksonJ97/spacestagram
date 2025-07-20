import jwt, {
  SignOptions,
  VerifyOptions,
  JsonWebTokenError,
} from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "constants/env";

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

    return payload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.error("JWT Error: ", error.message);
    } else {
      console.error("Error verifying access token: ", error);
    }
  }
};
