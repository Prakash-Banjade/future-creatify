import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TBlogsResponse_Public } from "../../../../../types/blog.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import BlogCard from "../../blogs/blog-card";

export default async function BlogsBlock({
  limit,
  order,
  selected,
}: RefItemBlockDto & { refRelation: ERefRelation.Blogs }) {
  const res = await serverFetch("/blogs?limit=" + limit);

  if (!res.ok) return null;

  const blogs: TBlogsResponse_Public = await res.json();

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => {
          return <BlogCard key={b.slug} blog={b} />;
        })}
      </section>
      <div>
        <Link className="text-primary flex justify-center" href={"/blogs"}>View All Blogs</Link>
      </div>
    </>
  );
}
