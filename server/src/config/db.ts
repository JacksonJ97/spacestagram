import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "config/env";
import * as schema from "db/schema";

const pool = new Pool({ connectionString: env.DATABASE_URL, max: 5 });
const db = drizzle({ schema, casing: "snake_case", client: pool });

export default db;
