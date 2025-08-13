import "@tanstack/react-query";
import { AxiosError } from "axios";

type ServerError = AxiosError<{
  code: string;
  message: string;
  errors?: {
    formErrors: string[];
    fieldErrors: Record<string, string[]>;
  };
}>;

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ServerError;
  }
}
