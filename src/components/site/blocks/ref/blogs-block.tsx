import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TBlogsResponse_Public } from "../../../../../types/blog.types";
import Link from "next/link";
import BlogCard from "../../blogs/blog-card";

export default async function BlogsBlock({
  limit,
  order,
  selected,
}: RefItemBlockDto & { refRelation: ERefRelation.Blogs }) {
  const urlSearchParams = new URLSearchParams({
    limit: limit?.toString(),
    order: order,
  });

  if (selected?.length)
    urlSearchParams.set("slugs", selected.map((s) => s.value)?.join(","));
  const res = await serverFetch("/blogs" + `?${urlSearchParams.toString()}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const blogs: TBlogsResponse_Public = await res.json();

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => {
          return <BlogCard key={b.slug} blog={b} />;
        })}
      </section>
      <div className="flex justify-center">
        <Link className="text-primary  w-fit flex justify-center" href={"/blogs"}>
          View All Blogs
        </Link>
      </div>
    </>
  );
}
