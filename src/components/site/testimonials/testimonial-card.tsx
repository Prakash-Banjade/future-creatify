"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Testimonial } from '../../../../types/testimonials.type';
import TestimonialContent from './testimonial-content';

export interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <TestimonialContent testimonial={testimonial} />
        </motion.div>
    );
};