import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import db from "db/index";
import { users, sessions } from "db/schema";
import { addThirtyDays } from "utils/functions";

async function createUser(input: typeof users.$inferInsert) {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const [user] = await db
    .insert(users)
    .values({
      ...input,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    })
    .returning();

  return user;
}

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

async function getSessionById(id: number) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, id),
  });

  return session;
}

async function updateSessionById(
  id: number,
  updates: Partial<typeof sessions.$inferInsert>
) {
  await db.update(sessions).set(updates).where(eq(sessions.id, id));
}

export {
  createUser,
  getUserById,
  getUserByEmail,
  createSession,
  getSessionById,
  updateSessionById,
};
