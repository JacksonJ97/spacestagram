import { AxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const cx = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getErrorMessage = (
  error: AxiosError<{ code: string; message: string }>,
) => {
  if (error.response) {
    return error.response.data.message;
  }
  return "Something went wrong";
};
