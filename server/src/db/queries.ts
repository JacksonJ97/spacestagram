import { eq, and, desc } from "drizzle-orm";
import db from "config/db";
import { users, sessions, posts, likedPosts } from "db/schema";

// USER QUERIES //

async function createUser(input: typeof users.$inferInsert) {
  const [user] = await db.insert(users).values(input).returning();
  return user;
}

async function getUserById(id: number) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      passwordHash: false,
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

// SESSION QUERIES //

async function createSession(input: typeof sessions.$inferInsert) {
  const [session] = await db.insert(sessions).values(input).returning();
  return session;
}

async function getSessionById(id: string) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, id),
  });

  return session;
}

async function updateSessionById(
  id: string,
  updates: Partial<typeof sessions.$inferInsert>,
) {
  await db.update(sessions).set(updates).where(eq(sessions.id, id));
}

async function deleteSession(id: string) {
  await db.delete(sessions).where(eq(sessions.id, id));
}

// POST QUERIES //

async function getOrCreatePost({
  date,
  title,
  url,
}: typeof posts.$inferInsert) {
  const [inserted] = await db
    .insert(posts)
    .values({ date, title, url })
    .onConflictDoNothing()
    .returning();

  if (inserted) return inserted;

  return db.query.posts.findFirst({
    where: eq(posts.date, date),
  });
}

async function getPostByDate(date: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.date, date),
  });

  return post;
}

// LIKED POST QUERIES //

async function getLikedPostsByUserId(userId: number) {
  const liked = await db
    .select()
    .from(likedPosts)
    .innerJoin(posts, eq(posts.id, likedPosts.postId))
    .where(eq(likedPosts.userId, userId))
    .orderBy(desc(likedPosts.likedAt));

  const data = liked.map(({ posts }) => posts);

  return data;
}

async function createOrTouchLikedPost({
  userId,
  postId,
}: typeof likedPosts.$inferInsert) {
  const [likedPost] = await db
    .insert(likedPosts)
    .values({ userId, postId })
    .onConflictDoUpdate({
      target: [likedPosts.userId, likedPosts.postId],
      set: { likedAt: new Date() },
    })
    .returning();

  return likedPost;
}

async function deleteLikedPost({
  userId,
  postId,
}: {
  userId: number;
  postId: number;
}) {
  const deleted = await db
    .delete(likedPosts)
    .where(and(eq(likedPosts.userId, userId), eq(likedPosts.postId, postId)))
    .returning({ id: likedPosts.id });

  return deleted.length > 0;
}

export {
  // User queries //
  createUser,
  getUserById,
  getUserByEmail,
  // Session queries //
  createSession,
  getSessionById,
  updateSessionById,
  deleteSession,
  // Post queries //
  getOrCreatePost,
  getPostByDate,
  // Liked post queries //
  getLikedPostsByUserId,
  createOrTouchLikedPost,
  deleteLikedPost,
};
