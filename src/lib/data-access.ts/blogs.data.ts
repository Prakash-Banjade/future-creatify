import { BlogsPageProps } from "@/app/(cms)/cms/blogs/page";
import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, desc, eq, ilike, isNull, not, SQL } from "drizzle-orm";
import { cache } from "react";

export const getBlogs_Public = cache(async (searchParams: BlogsPageProps["searchParams"]) => {
    const { q, limit } = searchParams;

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));

    return db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            summary: blogs.summary,
            publishedAt: blogs.publishedAt,
            keywords: blogs.keywords,
            coverImage: blogs.coverImage,
            length: blogs.length
        })
        .from(blogs)
        .where(and(...filters, not(isNull(blogs.publishedAt)))) // ensure blogs are published
        .orderBy(desc(blogs.publishedAt))
        .limit(Number(limit) || 100); // TODO: this should not be hardcoded
});


export const getBlogBySlug_Public = cache(async (slug: string) => {
    const [blog] = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            summary: blogs.summary,
            content: blogs.content,
            publishedAt: blogs.publishedAt,
            keywords: blogs.keywords,
            coverImage: blogs.coverImage,
            length: blogs.length
        })
        .from(blogs)
        .where(and(eq(blogs.slug, slug), not(isNull(blogs.publishedAt))))
        .limit(1);

    return blog ?? null;
});