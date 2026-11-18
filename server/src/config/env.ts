import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const schema = z.object({
  PORT: z.string(),
  APP_ORIGIN: z.url(),
  DATABASE_URL: z.url(),
});

export const env = schema.parse({
  PORT: process.env.PORT,
  APP_ORIGIN: process.env.APP_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL,
});
