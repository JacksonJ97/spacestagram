import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();

const db = drizzle({
  connection:
    process.env.DATABASE_URL || "postgres://user:password@host:8080/database",
  casing: "snake_case",
});

export default db;
