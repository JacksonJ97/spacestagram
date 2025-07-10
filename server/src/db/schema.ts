import { relations } from "drizzle-orm";
import {
  date,
  unique,
  varchar,
  integer,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 254 }).unique().notNull(),
  password: varchar({ length: 128 }).notNull(),
  firstName: varchar({ length: 50 }).notNull(),
  lastName: varchar({ length: 50 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().unique().notNull(),
  title: varchar({ length: 150 }).notNull(),
  url: varchar({ length: 512 }).notNull(),
});

export const likedPosts = pgTable(
  "liked_posts",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    postId: integer()
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    likedAt: timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [{ uniqueUserPost: unique().on(table.userId, table.postId) }]
);

export const usersRelations = relations(users, ({ many }) => ({
  likedPosts: many(likedPosts),
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
