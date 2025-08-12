import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "db/schema";
import { DATABASE_URL } from "constants/env";

const sql = neon(DATABASE_URL);
const db = drizzle({ schema, casing: "snake_case", client: sql });

export default db;
