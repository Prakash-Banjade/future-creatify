import { YooptaContentValue } from "@yoopta/editor";
import { z } from "zod";

export const blogSummarySchema = z.string({ required_error: "Summary is required" })
    .min(200, "Summary must be at least 200 characters")
    .max(1000, "Summary must be at most 1000 characters")
    .trim();

export const blogKeywordsSchema = z.array(z.string().max(50, "Keyword must be at most 50 characters").trim()).max(5, "You can add up to 5 keywords only");

export const blogSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).trim(),
    summary: z.string().trim(), // before publishing, no need to validate length
    content: z.any(),
    coverImage: z.string().nullish(),
    keywords: blogKeywordsSchema,
    isFavourite: z.boolean(),
    publishedAt: z.date().nullish(),
    length: z.number().min(0),
});

export type blogSchemaType = z.infer<typeof blogSchema>;

export const blogFormDefaultValues: blogSchemaType = {
    title: "Untitled",
    summary: "",
    content: {},
    coverImage: undefined,
    keywords: [],
    isFavourite: false,
    publishedAt: null,
    length: 0,
}

export type TBlog = {
    id: string;
    title: string;
    content: YooptaContentValue;
    summary: string;
    slug: string;
    coverImage: string | null;
    publishedAt: Date | null;
    keywords: string[];
    updatedAt: Date;
    isFavourite: boolean;
    length: number;
}

export type TBlogsResponse = Pick<TBlog, "id" | "title" | "slug" | "updatedAt" | "publishedAt" | "isFavourite">[];

export type TBlogsResponse_Public = Pick<TBlog, "id" | "title" | "slug" | "summary" | "publishedAt" | "keywords" | "coverImage" | "length">[]