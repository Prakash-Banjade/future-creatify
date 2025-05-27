"use client";

import { motion } from 'framer-motion';
import BlogCardContent from './blog-card-content';
import { TBlog } from '../../../../types/blogs.type';

export interface BlogCardProps {
    blog: TBlog;
    index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <BlogCardContent blog={blog} />
        </motion.div>
    );
};