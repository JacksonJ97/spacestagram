import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "db/schema";
import { DATABASE_URL } from "constants/env";

const pool = new Pool({ connectionString: DATABASE_URL, max: 5 });
const db = drizzle({ schema, casing: "snake_case", client: pool });

export default db;
