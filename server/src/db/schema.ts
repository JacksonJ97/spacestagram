import { sql, relations } from "drizzle-orm";
import {
  date,
  unique,
  varchar,
  integer,
  timestamp,
  pgTable,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 254 }).notNull(),
    passwordHash: varchar({ length: 255 }).notNull(),
    firstName: varchar({ length: 50 }).notNull(),
    lastName: varchar({ length: 50 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [uniqueIndex("users_email_unique").on(sql`lower(${table.email})`)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: varchar({ length: 255 }).primaryKey(),
    secretHash: varchar({ length: 255 }).notNull(),
    userId: integer()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    lastVerifiedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)],
);

export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  date: date("date").unique().notNull(),
  title: varchar("title", { length: 150 }).notNull(),
  url: varchar("url", { length: 512 }).notNull(),
});

export const likedPosts = pgTable(
  "liked_posts",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    postId: integer("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    likedAt: timestamp("liked_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({ uniqueUserPost: unique().on(table.userId, table.postId) }),
);

export const usersRelations = relations(users, ({ many }) => ({
  likedPosts: many(likedPosts),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  likedPosts: many(likedPosts),
}));

export const likedPostsRelations = relations(likedPosts, ({ one }) => ({
  user: one(users, {
    fields: [likedPosts.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likedPosts.postId],
    references: [posts.id],
  }),
}));
