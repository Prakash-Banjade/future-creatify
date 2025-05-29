import { BlogsPageProps } from "@/app/cms/blogs/page"
import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, desc, ilike, isNull, not, SQL } from "drizzle-orm";
import BlogCard from "./blog-card";

export default async function BlogsContainer({ searchParams }: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const { q } = await searchParams;

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));

    const foundBlogs = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            summary: blogs.summary,
            publishedAt: blogs.publishedAt,
            updatedAt: blogs.updatedAt,
            keywords: blogs.keywords,
            coverImage: blogs.coverImage
        })
        .from(blogs)
        .where(and(...filters, not(isNull(blogs.publishedAt)))) // ensure blogs are published
        .orderBy(desc(blogs.publishedAt));

    return (
        <>
            {
                foundBlogs.map((blog, index) => (
                    <BlogCard key={blog.id} blog={blog} index={index} />
                ))
            }
        </>
    )
}