import { BlogCardSkeleton } from '@/components/site/blogs/blog-card';
import RelatedBlogs from '@/components/site/blogs/related-blogs';
import { Button } from '@/components/ui/button';
import CloudinaryImage from '@/components/ui/cloudinary-image';
import YooptaEditorReadonly from '@/components/yoopta-editor/readonly';
import { API_URL } from '@/CONSTANTS';
import { getReadingTimeInMinutes } from '@/lib/utils';
import { TBlog } from '@/schemas/blog.schema';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, FileSpreadsheet, Tag, User } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

type Props = {
    params: {
        slug: string;
    }
}

export async function generateMetadata(props: { params: Promise<Props["params"]> }): Promise<Metadata> {
    const { slug } = await props.params;

    const res = await fetch(`${API_URL}/blogs/${slug}`);

    if (!res.ok) {
        return {
            title: 'Blog Post Not Found',
            description: 'Read our latest blog post on educational insights and resources.',
        };
    }

    const blog: TBlog = await res.json();

    if (!blog) {
        return {
            title: 'Blog Post Not Found',
            description: 'Read our latest blog post on educational insights and resources.',
        };
    }

    return {
        title: blog?.title,
        description: blog?.summary || 'Read our latest blog post on educational insights and resources.',
        keywords: blog?.keywords || [],
    };
}

export default async function SingleBlogPage(props: { params: Promise<Props["params"]> }) {
    const { slug } = await props.params;

    const res = await fetch(`${API_URL}/blogs/${slug}`, {
        cache: 'force-cache',
        next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
    });

    if (!res.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
                    <Link href="/blogs" className="btn btn-primary">
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    const blog: TBlog = await res.json();

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
                    <p>This can also happen if the author has updated the blog. You can checkout later.</p>
                    <Button type="button" asChild variant={'link'}>
                        <Link href="/blogs">
                            Back to Blogs
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-cream">
                <div className="container">
                    <Link href="/blogs" className="inline-flex items-center text-primary font-medium mb-6 hover:underline">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blogs
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {
                                blog.publishedAt && (
                                    <span>{format(new Date(blog.publishedAt), 'EEE MMM dd, yyyy')}</span>
                                )
                            }
                        </div>
                        <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>Anju Chhetri</span>
                        </div>
                        <div className="flex items-center">
                            <Tag size={14} className="mr-1" />
                            <span>General</span>
                        </div>

                        <div className="flex items-center">
                            <FileSpreadsheet size={14} className="mr-1" />
                            <span>{getReadingTimeInMinutes(blog.length)} Minutes Read</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-shadow-lg">
                        {blog.title}
                    </h1>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-8 md:py-12 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-10">
                            {
                                blog.coverImage && (
                                    <CloudinaryImage
                                        width={900}
                                        height={400}
                                        src={blog.coverImage}
                                        sizes="900px"
                                        alt="Blog Cover Image"
                                        className='rounded-lg'
                                    />
                                )
                            }
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg leading-relaxed mb-6">
                                {blog.summary}
                            </p>

                            <YooptaEditorReadonly value={blog.content} />
                        </div>

                        {/* Author Bio */}
                        <div className="mt-12 p-6 bg-cream rounded-xl">
                            <div className="flex items-center">
                                <img
                                    src="https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/401558454_24193895270226074_7245478317597615581_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4owI84cZm2MQ7kNvwFwTa40&_nc_oc=AdlvSfJo9Z80_JbAlQ1xNDKMaF5z-0YJMvVjL1t5NX8f_3Xl80PVxgsS_LYcK5uxFUc&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=k01VXrOLe1At21l9JpyiZQ&oh=00_AfI9SR-XIgcySXTTOP2aCBXING_GQo4Q-8tJ50gJ5Hh07A&oe=682D3B50"
                                    alt="Anju Chhetri"
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-lg">Anju Chhetri</h3>
                                    <p className="text-slate-600">
                                        Passionate educator with over 10 years of experience in curriculum design
                                        and innovative teaching methodologies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <Suspense fallback={Array.from({ length: 3 }, (_, index) => <BlogCardSkeleton key={index} />)}>
                <RelatedBlogs slug={slug} />
            </Suspense>
        </>
    )
}

// export const generateStaticParams = async () => {
//     const res = await fetch(`${API_URL}/blogs`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (!res.ok) {
//         return []
//     }

//     const blogs: TBlogsResponse_Public = await res.json();

//     return blogs.map((blog) => ({ slug: blog.slug }));
// }