import { API_URL } from '@/CONSTANTS';
import { TBlogsResponse_Public } from '@/schemas/blog.schema';
import BlogCard from './blog-card';
import BlogCardContent from './blog-card-content';

type Props = {
    slug: string;
}

export default async function RelatedBlogs({ slug }: Props) {
    const res = await fetch(`${API_URL}/blogs/related?slug=${slug}`, {
        cache: 'force-cache',
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
                    {blogs.map((post, index) => (
                        <BlogCard key={post.id} index={index}>
                            <BlogCardContent blog={post} />
                        </BlogCard>
                    ))}
                </div>
            </div>
        </section>
    )
}