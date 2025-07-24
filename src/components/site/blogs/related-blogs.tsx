import { API_URL } from '@/CONSTANTS';
import BlogCard from './blog-card';
import { TBlogsResponse_Public } from '../../../../types/blog.types';

type Props = {
    slug: string;
}

export default async function RelatedBlogs({ slug }: Props) {
    const res = await fetch(`${API_URL}/blogs/related?slug=${slug}`, {
        next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
    });

    if (!res.ok) return null;

    const blogs: TBlogsResponse_Public = await res.json();

    if (!blogs.length) return null;

    return (
        <section className="py-12 md:py-20 bg-cream">
            <div className="container">
                <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((post) => (
                        <BlogCard key={post.slug} blog={post} />
                    ))}
                </div>
            </div>
        </section>
    )
}