import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, desc, ilike, isNull, not, SQL } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const q = searchParams.get("q");
    const limit = searchParams.get("limit");

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));

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
        .where(and(...filters, not(isNull(blogs.publishedAt)))) // ensure blogs are published
        .orderBy(desc(blogs.publishedAt))
        .limit(Number(limit) || 100); // TODO: this should not be hardcoded

    return NextResponse.json(foundBlogs);
}