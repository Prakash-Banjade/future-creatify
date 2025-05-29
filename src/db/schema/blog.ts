import { YooptaContentValue } from "@yoopta/editor";
import { sql } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const blogs = pgTable(
    "blogs",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        title: text("title").default("Untitled").notNull(),
        content: jsonb("content").default({}).$type<YooptaContentValue>().notNull(),
        summary: text("summary").default("").notNull(),
        slug: text("slug").unique(),
        coverImage: text("coverImage"),
        updatedAt: timestamp({ mode: 'date', precision: 3 }).$onUpdate(() => new Date()).notNull().default(new Date()),
        publishedAt: timestamp("publishedAt", { mode: "date" }),
        keywords: text("keywords").array().default(sql`ARRAY[]::text[]`).notNull(),
    },
    (table) => [
        t.uniqueIndex("slug_idx").on(table.slug),
        t.index("title_idx").on(table.title),
    ]
);

// export const comments = pgTable("comments", {
//   id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
//   text: t.varchar({ length: 256 }),
//   postId: t.integer("post_id").references(() => posts.id),
//   ownerId: t.integer("owner_id").references(() => users.id),
// });