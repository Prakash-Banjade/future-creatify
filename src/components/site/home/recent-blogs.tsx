import React from 'react'
import BlogCard from '../blogs/blog-card';
import BlogCardContent from '../blogs/blog-card-content';
import { API_URL } from '@/CONSTANTS';
import { TBlogsResponse_Public } from '@/schemas/blog.schema';

export default async function RecentBlogs() {
    const res = await fetch(`${API_URL}/blogs?limit=3`, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
    });

    if (!res.ok) return null;

    const blogs: TBlogsResponse_Public = await res.json();

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