import {
  date,
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
  date: date().primaryKey(),
  title: varchar({ length: 150 }).notNull(),
  url: varchar({ length: 512 }).notNull(),
});

export const likedPosts = pgTable("liked_posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // userId,
  // postDate,
  likedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
