import { z } from "zod";

const passwordRequirements = [
  /.{8,}/, // At least 8 characters
  /[0-9]/, // At least 1 number
  /[a-z]/, // At least 1 lowercase letter
  /[A-Z]/, // At least 1 uppercase letter
  /[^A-Za-z0-9]/, // At least 1 special character
];

export const createAccountSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.email().max(254),
  password: z
    .string()
    .max(72)
    .refine((value) =>
      passwordRequirements.every((regex) => regex.test(value))
    ),
});
