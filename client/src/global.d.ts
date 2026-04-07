import "@tanstack/react-query";
import { ServerError } from "config/api";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ServerError;
  }
}
