import { defineConfig } from "drizzle-kit";
import { env } from "config/env";

export default defineConfig({
  out: "drizzle",
  casing: "snake_case",
  schema: "src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
});
