import { Calendar, User } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { format } from 'date-fns'
import { TBlogsResponse_Public } from '@/schemas/blog.schema'
import CloudinaryImage from '@/components/ui/cloudinary-image'

type Props = {
    blog: TBlogsResponse_Public[0]
    imgHeight?: number, // this is used to control the height of the image based on the blog card layout
}

export default async function BlogCardContent({ blog, imgHeight = 500 }: Props) {
    return (
        <article className="@container">
            <div className='card'>
                <div className="flex flex-col @2xl:flex-row">
                    <div className='@2xl:rounded-l-xl @2xl:rounded-tr-none rounded-t-xl overflow-hidden'>
                        {
                            blog.coverImage ? (
                                <CloudinaryImage
                                    width={600}
                                    height={imgHeight}
                                    src={blog.coverImage}
                                    sizes="400px"
                                    alt="Blog Cover Image"
                                    crop='auto'
                                    className='w-full h-full'
                                />
                            ) : (
                                <></>
                            )
                        }
                    </div>

                    <div className="p-6">
                        <Badge variant={"secondary"} className="text-primary mb-1">
                            General
                        </Badge>

                        <Link href={`/blogs/${blog.slug}`} className='hover:underline decoration-primary decoration-2'>
                            <h3 className="text-xl font-bold mb-3 w-fit">{blog.title}</h3>
                        </Link>

                        <div className="flex items-center text-sm text-slate-500 mb-3">
                            <div className="flex items-center mr-4">
                                <Calendar size={14} className="mr-1" />
                                {
                                    blog.publishedAt && (
                                        <span>{format(blog.publishedAt, "EEE MMM dd, yyy")}</span>
                                    )
                                }
                            </div>
                            <div className="flex items-center">
                                <User size={14} className="mr-1" />
                                <span>Anju Chhetri</span>
                            </div>
                        </div>

                        <p className="text-slate-600 mb-4 line-clamp-3 max-w-5xl">{blog.summary}</p>

                        <LinkButton href={`/blogs/${blog.slug}`} className='text-base'>
                            Read More
                        </LinkButton>
                    </div>
                </div>
            </div>
        </article>
    )
}