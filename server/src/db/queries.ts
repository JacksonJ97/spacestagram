import { eq } from "drizzle-orm";
import { users } from "./schema";
import db from ".";

async function getUserById(id: number) {
  return db.select().from(users).where(eq(users.id, id));
}

async function getUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email));
}

type NewUser = typeof users.$inferInsert;

async function createUser(user: NewUser) {
  return db.insert(users).values(user).returning();
}

export { getUserById, getUserByEmail, createUser };
