import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "./schema";
import db from ".";

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

export { getUserByEmail, createUser };
