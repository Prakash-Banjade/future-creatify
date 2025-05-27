import React from 'react'
import { BlogCardProps } from './blog-card'
import { Calendar, User } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Props = {
    blog: BlogCardProps["blog"]
}

export default function BlogCardContent({ blog }: Props) {
    return (
        <article className="@container">
            <div className='card'>
                <div className="flex flex-col @2xl:flex-row">
                    <div className='rounded-t-xl overflow-hidden'>
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            width={600}
                            height={400}
                            className="w-full max-h-[300px] object-cover"
                        />
                    </div>

                    <div className="p-6">
                        <Badge variant={"secondary"} className="text-primary mb-1">
                            {blog.category}
                        </Badge>

                        <Link href={`/blogs/${blog.id}`} className='hover:underline decoration-primary decoration-2'>
                            <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                        </Link>

                        <div className="flex items-center text-sm text-slate-500 mb-3">
                            <div className="flex items-center mr-4">
                                <Calendar size={14} className="mr-1" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center">
                                <User size={14} className="mr-1" />
                                <span>{blog.author}</span>
                            </div>
                        </div>

                        <p className="text-slate-600 mb-4">{blog.excerpt}</p>

                        <LinkButton href={`/blogs/${blog.id}`} className='text-base'>
                            Read More
                        </LinkButton>
                    </div>
                </div>
            </div>
        </article>
    )
}