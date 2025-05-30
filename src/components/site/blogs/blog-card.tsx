"use client";

import { motion } from 'framer-motion';

export interface BlogCardProps {
    index: number;
    children: React.ReactNode
}

export default function BlogCard({ index, children }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {children}
        </motion.div>
    );
};