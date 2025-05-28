import BlogCard from '@/components/site/blogs/blog-card';
import BlogPageHeroWrapper from '@/components/site/hero-wrapper';
import { blogPosts } from '@/data/blogs-data';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
    params: {
        slug: string;
    }
}

export async function generateMetadata(props: { params: Promise<Props["params"]> }): Promise<Metadata> {
    const { slug } = await props.params;

    const blog = blogPosts.find((post) => post.id === slug);
    return {
        title: blog?.title,
        description: blog?.excerpt || 'Read our latest blog post on educational insights and resources.',
    };
}

export default async function SingleBlogPage(props: { params: Promise<Props["params"]> }) {
    const { slug } = await props.params;

    const blog = blogPosts.find((post) => post.id === slug);

    if (!blog) {
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

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-cream">
                <div className="container">
                    <Link href="/blogs" className="inline-flex items-center text-primary font-medium mb-6 hover:underline">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blogs
                    </Link>
                    <BlogPageHeroWrapper>
                        <div className="flex items-center text-sm text-slate-500 mb-4">
                            <div className="flex items-center mr-4">
                                <Calendar size={14} className="mr-1" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center mr-4">
                                <User size={14} className="mr-1" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Tag size={14} className="mr-1" />
                                <span>{blog.category}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                            {blog.title}
                        </h1>
                    </BlogPageHeroWrapper>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-8 md:py-12 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="rounded-xl overflow-hidden mb-10">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg leading-relaxed mb-6">
                                {blog.content || blog.excerpt}
                            </p>

                            {/* Sample content - in a real app, this would come from a CMS */}
                            <h2 className="text-2xl font-bold mt-8 mb-4">Why This Matters in Education</h2>
                            <p className="mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
                                rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna
                                non est bibendum non venenatis nisl tempor.
                            </p>

                            <p className="mb-6">
                                Suspendisse in orci enim, vitae pellentesque nulla. Fusce nec quam a purus porta
                                suscipit eu ac dui. Praesent lacinia, justo eu dictum euismod, velit eros semper
                                nisi, at ultrices est dolor eget nunc.
                            </p>

                            <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                                &quot;How do we, as educators, make a difference every day in shaping the minds
                                and futures of our students? It begins with understanding that each student is
                                on a unique journey of discovery.&quot;
                            </blockquote>

                            <h2 className="text-2xl font-bold mt-8 mb-4">Practical Applications</h2>
                            <p className="mb-6">
                                Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu
                                ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.
                                In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
                            </p>

                            <ul className="list-disc pl-6 mb-6">
                                <li className="mb-2">Implement project-based learning techniques</li>
                                <li className="mb-2">Create inclusive classroom environments</li>
                                <li className="mb-2">Foster critical thinking through questioning</li>
                                <li className="mb-2">Build collaborative learning opportunities</li>
                            </ul>

                            <p>
                                Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate,
                                ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna
                                sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                                per inceptos himenaeos.
                            </p>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-12 p-6 bg-cream rounded-xl">
                            <div className="flex items-center">
                                <img
                                    src="https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/401558454_24193895270226074_7245478317597615581_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4owI84cZm2MQ7kNvwFwTa40&_nc_oc=AdlvSfJo9Z80_JbAlQ1xNDKMaF5z-0YJMvVjL1t5NX8f_3Xl80PVxgsS_LYcK5uxFUc&_nc_zt=23&_nc_ht=scontent.fktm1-1.fna&_nc_gid=k01VXrOLe1At21l9JpyiZQ&oh=00_AfI9SR-XIgcySXTTOP2aCBXING_GQo4Q-8tJ50gJ5Hh07A&oe=682D3B50"
                                    alt={blog.author}
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-lg">{blog.author}</h3>
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
            <section className="py-12 md:py-20 bg-cream">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.slice(3, 6).map((post, index) => (
                            <BlogCard key={post.id} blog={post} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.id,
    }));
}