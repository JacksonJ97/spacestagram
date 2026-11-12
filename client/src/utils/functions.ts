import { type ServerError } from "config/api";

export { cn } from "cn";

export const getErrorMessage = (error: ServerError) => {
  if (error.data && typeof error.data === "object") {
    return error.data.message;
  }
  return "Something went wrong";
};
