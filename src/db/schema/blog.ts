import { YooptaContentValue } from "@yoopta/editor";
import { sql } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").default("Untitled").notNull(),
    content: jsonb("content").default({}).$type<YooptaContentValue>().notNull(),
    summary: text("summary").default("").notNull(),
    slug: text("slug").unique(),
    coverImage: text("coverImage"),
    publishedAt: timestamp("publishedAt", { mode: "date" }),
    keywords: text("keywords").array().default(sql`ARRAY[]::text[]`).notNull(),
});