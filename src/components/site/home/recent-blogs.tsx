import { getBlogs_Public } from '@/lib/data-access.ts/blogs.data'
import React from 'react'
import BlogCard from '../blogs/blog-card';
import BlogCardContent from '../blogs/blog-card-content';

export default async function RecentBlogs() {
    const blogs = await getBlogs_Public({ limit: '3' });

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-fade-in">
            {
                blogs.map((blog, index) => (
                    <BlogCard key={blog.id} index={index}>
                        <BlogCardContent blog={blog} imgHeight={400} />
                    </BlogCard>
                ))
            }
        </div>
    )
}