import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, desc, eq, isNull, not, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const slug = searchParams.get("slug");

    if (!slug) return NextResponse.json([]);

    const [existingBlog] = await db.select({ keywords: blogs.keywords }).from(blogs).where(eq(blogs.slug, slug)).limit(1);

    if (!existingBlog) return NextResponse.json([]);

    const keywordsQuery = existingBlog.keywords.map(k => sql`${k} = ANY(${blogs.keywords})`);

    const foundBlogs = await db
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
        .where(and(not(isNull(blogs.publishedAt)), not(eq(blogs.slug, slug)), or(...keywordsQuery)))
        .orderBy(desc(blogs.publishedAt))
        .limit(3);

    return NextResponse.json(foundBlogs);
}