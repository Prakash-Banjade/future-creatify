import { BlogsPageProps } from '@/app/cms/blogs/page';
import BlogsContainer from '@/components/site/blogs/blogs-container';
import BlogsSearchFilters_Public from '@/components/site/blogs/blogs-search-filters';
import HeroWrapper from '@/components/site/hero-wrapper';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Blogs",
    description: "Explore our collection of articles, guides, and resources designed to inspire and empower educators on their teaching journey.",
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-cream">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <HeroWrapper>

                            <span className="text-primary font-semibold">Our Blog</span>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3 mb-6 text-shadow-lg">
                                Educational Insights & Resources
                            </h1>
                            <p className="text-lg text-slate-600">
                                Explore our collection of articles, guides, and resources designed to
                                inspire and empower educators on their teaching journey.
                            </p>
                        </HeroWrapper>
                    </div>
                </div>
            </section>

            {/* Blogs Section */}
            <section className="section bg-white">
                <div className="container">
                    {/* Search and Filter */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <BlogsSearchFilters_Public />
                    </Suspense>

                    {/* Blog Posts Stack */}
                    <div className="space-y-8">
                        <Suspense fallback={<div>Loading...</div>}>
                            <BlogsContainer searchParams={searchParams} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    )
}