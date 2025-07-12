import { z } from "zod";

const passwordRegex = (value: string) =>
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /\d/.test(value) &&
  /[^A-Za-z0-9]/.test(value);

export const newUserSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.email().max(254),
  password: z.string().min(8).max(72).refine(passwordRegex),
});

export type NewUser = z.infer<typeof newUserSchema>;
