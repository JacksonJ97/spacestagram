import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import db from "db/index";
import { users, sessions } from "db/schema";
import { addThirtyDays } from "utils/functions";

async function getUserById(id: number) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  return user;
}

async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  });

  return user;
}

type NewUser = typeof users.$inferInsert;

async function createUser(newUser: NewUser) {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUNDS);

  const [user] = await db
    .insert(users)
    .values({
      ...newUser,
      email: newUser.email.toLowerCase(),
      password: hashedPassword,
    })
    .returning();

  return user;
}

async function createSession(userId: number) {
  const [session] = await db
    .insert(sessions)
    .values({
      userId,
      expiresAt: addThirtyDays(),
    })
    .returning();

  return session;
}

async function deleteSessionById(sessionId: number) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export {
  getUserById,
  getUserByEmail,
  createUser,
  createSession,
  deleteSessionById,
};
