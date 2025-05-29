import { BlogsPageProps } from '@/app/cms/blogs/page';
import BlogCard from '@/components/site/blogs/blog-card';
import BlogsContainer from '@/components/site/blogs/blogs-container';
import HeroWrapper from '@/components/site/hero-wrapper';
import { blogPosts } from '@/data/blogs-data';
import { Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blogs",
    description: "Explore our collection of articles, guides, and resources designed to inspire and empower educators on their teaching journey.",
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const categories = ['All', ...new Set(blogPosts.map(blog => blog.category))];

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-cream">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <HeroWrapper>

                            <span className="text-primary font-semibold">Our Blog</span>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3 mb-6">
                                Educational Insights & Resources
                            </h1>
                            <p className="text-lg text-slate-600">
                                Explore our collection of articles, guides, and resources designed to
                                inspire and empower educators on their teaching journey.
                            </p>
                        </HeroWrapper>
                    </div>
                </div>
            </section >

            {/* Blogs Section */}
            <section className="section bg-white">
                <div className="container">
                    {/* Search and Filter */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-grow">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>

                            <div className="md:w-72">
                                <select
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category, index) => (
                                        category !== 'All' && (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        )
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Blog Posts Stack */}
                    <div className="space-y-8">
                        <BlogsContainer searchParams={searchParams} />
                    </div>

                    {/* <div className="text-center py-12">
                        <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
                        <p className="text-slate-600 mb-6">
                            We couldn't find any blog posts matching your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('');
                            }}
                            className="btn btn-primary"
                        >
                            Reset Filters
                        </button>
                    </div> */}
                </div>
            </section>
        </>
    )
}