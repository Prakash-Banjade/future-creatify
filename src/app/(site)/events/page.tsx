import EventsContainer from "@/components/site/events/events-container";
import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";

const slug = "events";

type EventsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(slug);

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords,
  };
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: EventsPageProps["searchParams"];
}) {
  const page = await fetchPage(slug);

  return (
    <>
      <RenderHero hero={page.heroSections[0]} />

      {/* Events Section */}
      <section className="container py-12">
        {/* Search and Filter */}
        <Suspense fallback={<Skeleton className="h-12" />}>
          {/* <EventsSearchFilters_Public /> */}
        </Suspense>

        {/* Blog Posts Stack */}
        <div className="space-y-8">
          <Suspense
            fallback={Array.from({ length: 3 }, (_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          >
            <EventsContainer searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function BlogCardSkeleton() {
  return <div className="h-48 bg-muted animate-pulse rounded-md" />;
}
