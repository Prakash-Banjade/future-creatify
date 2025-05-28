import BlogForm from '@/components/cms/blogs/blog-form';
import { db } from '@/db';
import { blogs } from '@/db/schema/blog';
import { eq } from 'drizzle-orm';
import React from 'react'

type Props = {
    params: {
        id: string;
    }
}

export default async function BlogEditPage(props: Promise<Props>) {
    const { params } = await props;

    const foundBlogs = await db.query.blogs.findMany({ where: eq(blogs.id, params.id) });

    if (foundBlogs.length === 0) {
        return (
            <div>Blog not found</div>
        )
    }

    const blog = foundBlogs[0];

    return (
        <BlogForm blogId={blog.id} defaultValues={blog} />
    )
}