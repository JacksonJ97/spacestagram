import ky, { type HTTPError } from "ky";
import { API_BASE_URL } from "utils/constants";

export type ServerError = HTTPError<{
  code: string;
  message: string;
  errors?: {
    formErrors: string[];
    fieldErrors: Record<string, string[]>;
  };
}>;

const api = ky.create({
  prefix: API_BASE_URL,
  credentials: "include",
  headers: { Accept: "application/json" },
});

export default api;
