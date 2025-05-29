import { YooptaContentValue } from "@yoopta/editor";
import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).trim(),
    summary: z.string().trim(),
    content: z.any(),
    coverImage: z.string().nullish(),
    keywords: z.array(z.string().trim()),
});

export type blogSchemaType = z.infer<typeof blogSchema>;

export const blogFormDefaultValues: blogSchemaType = {
    title: "Untitled",
    summary: "",
    content: {},
    coverImage: undefined,
    keywords: [],
}

export type TBlog = {
    id: string;
    title: string;
    content: YooptaContentValue;
    summary: string;
    slug: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    keywords: string[];
}