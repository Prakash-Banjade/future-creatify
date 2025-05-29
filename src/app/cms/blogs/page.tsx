import BlogsList from '@/components/cms/blogs/blogs-list'
import NewBlogButton from '@/components/cms/blogs/new-blog-btn'
import ContainerLayout from '@/components/cms/container-layout'
import { db } from '@/db'
import { blogs } from '@/db/schema/blog'
import { and, desc, eq, ilike, isNull, not, SQL } from 'drizzle-orm'

export type BlogsPageProps = {
    searchParams: {
        q?: string;
        category?: string;
        published?: string;
        favourite?: string;
    }
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const { published, q, favourite } = await searchParams;

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));
    if (published === "true") filters.push(not(isNull(blogs.publishedAt)));
    if (published === "false") filters.push(isNull(blogs.publishedAt));
    if (favourite === "true") filters.push(eq(blogs.isFavourite, true));

    const foundBlogs = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            publishedAt: blogs.publishedAt,
            updatedAt: blogs.updatedAt,
            isFavourite: blogs.isFavourite,
        })
        .from(blogs)
        .where(and(...filters))
        .orderBy(desc(blogs.updatedAt));

    return (
        <ContainerLayout
            title='Blogs'
            description="Manage your blogs here."
            actionTrigger={
                <NewBlogButton />
            }
        >
            <BlogsList blogs={foundBlogs ?? []} />
        </ContainerLayout>
    )
}