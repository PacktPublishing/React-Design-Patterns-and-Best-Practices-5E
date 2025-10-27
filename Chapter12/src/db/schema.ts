import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  customType,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// Define custom tsvector type
const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    bio: text("bio"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("users_email_idx").on(table.email),
    index("users_active_idx").on(table.isActive),
    index("users_created_at_idx").on(table.createdAt),
  ]
);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    published: boolean("published").notNull().default(false),
    authorId: integer("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    searchVector: tsvector("search_vector").generatedAlwaysAs(
      sql`to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))`
    ),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("posts_author_idx").on(table.authorId),
    index("posts_published_idx").on(table.published),
    index("posts_created_at_idx").on(table.createdAt),
    index("posts_author_published_idx").on(table.authorId, table.published),
    index("posts_search_idx").using("gin", table.searchVector),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
