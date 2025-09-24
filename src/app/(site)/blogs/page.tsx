import { BlogsPageProps } from '@/app/(cms)/cms/blogs/page';
import { BlogCardSkeleton } from '@/components/site/blogs/blog-card';
import BlogsContainer from '@/components/site/blogs/blogs-container';
import BlogsSearchFilters_Public from '@/components/site/blogs/blogs-search-filters';
import RenderHero from '@/components/site/heros/render-hero';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPage } from '@/lib/utilities/fetchPage';
import { Metadata } from 'next';
import { Suspense } from 'react';

const slug = "blogs";

export const generateMetadata = async (): Promise<Metadata> => {
    const page = await fetchPage(slug);

    return {
        title: page.metadata?.title,
        description: page.metadata?.description,
        keywords: page.metadata?.keywords
    }
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const page = await fetchPage(slug);

    return (
        <>
            <RenderHero hero={page.heroSections[0]} />

            {/* Blogs Section */}
            <section>
                <div className="container py-24">
                    {/* Search and Filter */}
                    <Suspense fallback={<Skeleton className="h-12" />}>
                        <BlogsSearchFilters_Public />
                    </Suspense>

                    {/* Blog Posts Stack */}
                    <div className="space-y-8">
                        <Suspense fallback={Array.from({ length: 3 }, (_, index) => <BlogCardSkeleton key={index} />)}>
                            <BlogsContainer searchParams={searchParams} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    )
}