import React from 'react'
import { Star } from 'lucide-react';
import { TestimonialCardProps } from './testimonial-card';
import Image from 'next/image';

type Props = {
    testimonial: TestimonialCardProps["testimonial"];
}

export default function TestimonialContent({ testimonial }: Props) {
    return (
        <div className='card p-6'>
            {/* Rating Stars */}
            <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? "text-orange-500 fill-orange-400" : "text-gray-300"}
                    />
                ))}
            </div>

            {/* Quote */}
            <p className="italic text-slate-600 mb-6  line-clamp-4">{testimonial.quote}</p>

            {/* Person Info */}
            <div className="flex items-center">
                <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
            </div>
        </div>
    )
}