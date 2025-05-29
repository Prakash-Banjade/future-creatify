import BlogsList from '@/components/cms/blogs/blogs-list'
import NewBlogButton from '@/components/cms/blogs/new-blog-btn'
import ContainerLayout from '@/components/cms/container-layout'
import { db } from '@/db'
import { blogs } from '@/db/schema/blog'
import { and, desc, ilike, isNull, not, SQL } from 'drizzle-orm'

type BlogsPageProps = {
    searchParams: {
        q?: string;
        category?: string;
        published?: string;
    }
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const { category, published, q } = await searchParams;

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, q));
    if (published) filters.push(not(isNull(blogs.publishedAt)));
    // if (category) filters.push(lte(blogs.price, maxPrice));

    const foundBlogs = await db.select().from(blogs).where(and(...filters)).orderBy(desc(blogs.updatedAt));

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