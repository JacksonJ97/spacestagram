import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", "8000");
export const NODE_ENV = getEnv("NODE_ENV");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const DATABASE_URL = getEnv("DATABASE_URL");
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
