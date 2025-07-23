import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TBlogsResponse_Public } from "../../../../../types/blog.types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CloudinaryImage from "@/components/ui/cloudinary-image";


export default async function BlogsBlock({
    limit,
    order,
    selected,
}: RefItemBlockDto & { refRelation: ERefRelation.Blogs }) {
    const res = await serverFetch('/blogs?limit=' + limit);

    if (!res.ok) return null;

    const blogs: TBlogsResponse_Public = await res.json();

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                blogs.map(b => {
                    return (
                        <Card
                            key={b.slug}
                            className="overflow-hidden pt-0"
                        >
                            {
                                b.coverImage && (
                                    <CloudinaryImage
                                        src={b.coverImage}
                                        alt={b.title}
                                        width={500}
                                        height={400}
                                        className="w-full max-h-72 object-cover"
                                    />
                                )
                            }
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    <Link href={`/blogs/${b.slug}`} className="hover:underline">
                                        {b.title}
                                    </Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-5">{b.summary}</p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={'outline'}
                                    asChild
                                >
                                    <Link
                                        href={`/blogs/${b.slug}`}
                                    >
                                        Read More
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </section>
    )
}