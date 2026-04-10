import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "config/env";

export default defineConfig({
  out: "drizzle",
  casing: "snake_case",
  schema: "src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: DATABASE_URL },
});
