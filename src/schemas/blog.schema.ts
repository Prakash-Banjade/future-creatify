import { YooptaContentValue } from "@yoopta/editor";
import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    summary: z.string(),
    content: z.object({}),
    coverImage: z.string().nullish(),
    keywords: z.array(z.string()),
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