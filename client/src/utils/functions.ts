import { twMerge } from "tailwind-merge";
import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
  }
  return "Something went wrong.";
};
