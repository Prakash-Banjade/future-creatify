import { BlogsPageProps } from "@/app/(cms)/cms/blogs/page";
import BlogCard from "./blog-card";
import { TBlogsResponse_Public } from "../../../../types/blog.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";

export default async function BlogsContainer(props: {
  searchParams: Promise<BlogsPageProps["searchParams"]>;
}) {
  const searchParams = await props.searchParams;

  const queryString = new URLSearchParams(searchParams).toString();

  const res = await serverFetch(`/blogs?${queryString}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
    cache: "force-cache",
  });

  if (!res.ok) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Fetch Failed</h3>
        <p className="text-muted-foreground mb-6">Something is wrong.</p>
      </div>
    );
  }

  const blogs: TBlogsResponse_Public = await res.json();

  return (
    <>
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}

      {(!!searchParams.q || !!searchParams.category) && blogs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find any blog posts matching your search criteria.
          </p>
        </div>
      )}
    </>
  );
}
