import EventFilters from "@/components/site/events/event-filters";
import EventsContainer from "@/components/site/events/events-container";
import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryType } from "@/db/schema/category";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { TPaginatedOptions } from "../../../../types/global.types";
import { EVENT_SLUG } from "./layout";

type EventsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(EVENT_SLUG);

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
  const page = await fetchPage(EVENT_SLUG);
  const categories = await fetchCategories(CategoryType.EVENT);

  return (
    <>
      <RenderHero hero={page.heroSections[0]} />

      <section className="container py-12">
        <Suspense fallback={<Skeleton className="h-12" />}>
          <EventFilters categories={categories} />
        </Suspense>

        <div className="space-y-8">
          <Suspense
            fallback={Array.from({ length: 3 }, (_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          >
            <EventsContainer searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function EventCardSkeleton() {
  return <div className="h-48 bg-muted animate-pulse rounded-md" />;
}

export async function fetchCategories(type: CategoryType) {
  const res = await serverFetch(`/categories/options?type=${type}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) {
    return null;
  }

  const categories: TPaginatedOptions = await res.json();

  return categories;
}
