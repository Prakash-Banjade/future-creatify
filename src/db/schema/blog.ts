import { pgTable, text } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    summary: text("summary").notNull(),
    coverImage: text("coverImage").notNull(),
});