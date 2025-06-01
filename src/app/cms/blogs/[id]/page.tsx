import BlogForm from '@/components/cms/blogs/blog-form';
import { db } from '@/db';
import { blogs } from '@/db/schema/blog';
import { eq } from 'drizzle-orm';
import { Info } from 'lucide-react';

type Props = {
    params: {
        id: string;
    }
}

export default async function BlogEditPage(props: { params: Promise<Props["params"]> }) {
    const { id } = await props.params;

    const foundBlogs = await db.query.blogs.findMany({ where: eq(blogs.id, id) });

    if (foundBlogs.length === 0) {
        return (
            <div>Blog not found</div>
        )
    }

    const blog = foundBlogs[0];

    return (
        <>
            {
                blog.publishedAt && (
                    <div className='lg:mx-auto flex items-center gap-2 text-sm font-medium text-cyan-600 bg-cyan-50 border-cyan-300 border rounded-md p-2 w-fit'>
                        <Info size={16} />
                        <p>You can&apos;t edit a published blog. If you wish to edit it, unpublish the blog first.</p>
                    </div>
                )
            }

            <BlogForm defaultValues={blog} />
        </>
    )
}