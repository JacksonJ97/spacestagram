import { eq } from "drizzle-orm";
import { users } from "./schema";
import db from ".";

async function getUserById(id: number) {
  return db.select().from(users).where(eq(users.id, id));
}

async function getUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase();
  return db.select().from(users).where(eq(users.email, normalizedEmail));
}

type NewUser = typeof users.$inferInsert;

async function createUser(user: NewUser) {
  return db
    .insert(users)
    .values({ ...user, email: user.email.toLowerCase() })
    .returning();
}

export { getUserById, getUserByEmail, createUser };
