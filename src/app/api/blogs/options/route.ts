import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, ilike, isNull, not, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));

    const foundBlogs = await db
        .select({
            label: blogs.title,
            value: blogs.slug,
        })
        .from(blogs)
        .where(and(...filters, not(isNull(blogs.publishedAt)))); // ensure blogs are published

    return NextResponse.json(foundBlogs);
}