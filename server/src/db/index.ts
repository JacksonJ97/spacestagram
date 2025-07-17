import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "db/schema";
import { DATABASE_URL } from "constants/env";

const db = drizzle({
  schema,
  casing: "snake_case",
  connection: DATABASE_URL,
});

export default db;
