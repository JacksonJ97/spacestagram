type Key = "API_BASE_URL" | "NASA_API_KEY";

const getEnv = (key: Key, defaultValue?: string) => {
  const value =
    (import.meta.env[`VITE_${key}`] as string | undefined) ?? defaultValue;

  if (value === undefined) {
    const message = `Missing environment variable: VITE_${key}`;
    if (import.meta.env.MODE === "development") {
      throw new Error(message);
    } else {
      console.warn(message);
      return "";
    }
  }

  return value;
};

export const API_BASE_URL = getEnv("API_BASE_URL");
export const NASA_API_KEY = getEnv("NASA_API_KEY");
