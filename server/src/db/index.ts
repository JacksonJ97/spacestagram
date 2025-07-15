import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { DATABASE_URL } from "../utils/constants";

const db = drizzle({
  schema,
  casing: "snake_case",
  connection: DATABASE_URL,
});

export default db;
