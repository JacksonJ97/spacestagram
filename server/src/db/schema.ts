import { relations } from "drizzle-orm";
import {
  date,
  unique,
  varchar,
  integer,
  boolean,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 254 }).unique().notNull(),
  password: varchar("password", { length: 128 }).notNull(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

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
  (table) => [{ uniqueUserPost: unique().on(table.userId, table.postId) }]
);

export const sessions = pgTable("sessions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isValid: boolean("is_valid").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  likedPosts: many(likedPosts),
  sessions: many(sessions),
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

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
