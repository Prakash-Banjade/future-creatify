import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { blogs } from "@/db/schema/blog";
import { z } from "zod/v4";

export const insertBlogSchema = createInsertSchema(blogs, {
    title: (schema) => schema.min(1, "Title is required"),
    content: (schema) => schema.min(1, "Content is required"),
    summary: (schema) => schema.min(1, "Summary is required"),
    coverImage: (schema) => schema.min(1, "Cover image is required"),
});

export const selectBlogSchema = createSelectSchema(blogs);

export type InsertBlogSchemaType = z.infer<typeof insertBlogSchema>;
