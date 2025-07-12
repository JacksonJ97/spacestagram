import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

dotenv.config();

const db = drizzle({
  schema,
  casing: "snake_case",
  connection:
    process.env.DATABASE_URL || "postgres://user:password@host:5432/database",
});

export default db;
