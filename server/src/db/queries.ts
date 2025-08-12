import bcrypt from "bcryptjs";
import { eq, and, desc } from "drizzle-orm";
import { addThirtyDays } from "utils/functions";
import db from "db/client";
import { users, sessions, posts, likedPosts } from "db/schema";

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
    columns: {
      password: false,
      createdAt: false,
      updatedAt: false,
    },
    with: {
      likedPosts: {
        columns: {},
        with: {
          post: {
            columns: {
              date: true,
            },
          },
        },
      },
    },
  });

  const dates = user
    ? user.likedPosts.map((likedPost) => likedPost.post.date)
    : [];
  const formattedUser = user ? { ...user, likedPosts: dates } : undefined;

  return formattedUser;
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

async function getLikedPostsByUserId(userId: number) {
  const liked = await db
    .select()
    .from(likedPosts)
    .innerJoin(posts, eq(posts.id, likedPosts.postId))
    .where(eq(likedPosts.userId, userId))
    .orderBy(desc(likedPosts.likedAt));

  const formatted = liked.map(({ posts }) => posts);

  return formatted;
}

async function getOrCreatePost({
  date,
  title,
  url,
}: typeof posts.$inferInsert) {
  const [post] = await db
    .insert(posts)
    .values({ date, title, url })
    .onConflictDoNothing()
    .returning();

  return post;
}

async function createLikedPost({
  userId,
  postId,
}: typeof likedPosts.$inferInsert) {
  const [likedPost] = await db
    .insert(likedPosts)
    .values({ userId, postId })
    .returning();

  return likedPost;
}

async function getPostByDate(date: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.date, date),
  });

  return post;
}

async function deleteLikedPost({
  userId,
  postId,
}: {
  userId: number;
  postId: number;
}) {
  const result = await db
    .delete(likedPosts)
    .where(and(eq(likedPosts.userId, userId), eq(likedPosts.postId, postId)))
    .returning();

  return result;
}

export {
  createUser,
  getUserById,
  getUserByEmail,
  createSession,
  getSessionById,
  updateSessionById,
  getLikedPostsByUserId,
  getOrCreatePost,
  createLikedPost,
  getPostByDate,
  deleteLikedPost,
};
