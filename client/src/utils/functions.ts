import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import type { ServerError } from "src/global";

export const cx = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getErrorMessage = (error: ServerError) => {
  if (error.response) {
    return error.response.data.message;
  }
  return "Something went wrong";
};
