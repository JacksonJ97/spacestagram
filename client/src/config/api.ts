import ky, { type HTTPError } from "ky";
import { env } from "utils/env";

export type ServerError = HTTPError<{
  code: string;
  message: string;
  errors?: {
    formErrors: string[];
    fieldErrors: Record<string, string[]>;
  };
}>;

const api = ky.create({
  prefix: env.API_BASE_URL,
  credentials: "include",
  headers: { Accept: "application/json" },
});

export default api;
