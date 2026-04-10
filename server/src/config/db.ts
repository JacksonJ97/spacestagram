import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "config/env";
import * as schema from "db/schema";

const pool = new Pool({ connectionString: DATABASE_URL, max: 5 });
const db = drizzle({ schema, casing: "snake_case", client: pool });

export default db;
