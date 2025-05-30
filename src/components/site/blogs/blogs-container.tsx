import { BlogsPageProps } from "@/app/cms/blogs/page"
import BlogCard from "./blog-card";
import BlogCardContent from "./blog-card-content";
import { getBlogs_Public } from "@/lib/data-access.ts/blogs.data";

export default async function BlogsContainer(props: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const searchParams = await props.searchParams;

    const blogs = await getBlogs_Public(searchParams);

    return (
        <>
            {
                blogs.map((blog, index) => (
                    <BlogCard key={blog.id} index={index}>
                        <BlogCardContent blog={blog} />
                    </BlogCard>
                ))
            }

            {
                (!!searchParams.q || !!searchParams.category) && blogs.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
                        <p className="text-muted-foreground mb-6">
                            We couldn't find any blog posts matching your search criteria.
                        </p>
                    </div>
                )
            }
        </>
    )
}