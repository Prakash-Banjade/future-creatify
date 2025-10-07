import { EventsPageProps } from "@/app/(cms)/cms/events/page";
import { TEventsResponse_Public } from "../../../../types/event.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import EventCard from "./event-card";
import EventFilters from "./event-filters";
import { CategoryType } from "@/db/schema/category";
import {
  PaginatedResponse,
  SelectOption,
  TPaginatedOptions,
} from "../../../../types/global.types";

export default async function EventsContainer(props: {
  searchParams: Promise<EventsPageProps["searchParams"]>;
}) {
  const searchParams = await props.searchParams;
  const events = await fetchEvents(searchParams);

  if (events === null) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Fetch Failed</h3>
        <p className="text-muted-foreground mb-6">Something is wrong.</p>
      </div>
    );
  }

  const categories = await fetchCategories();

  return (
    <>
      <EventFilters categories={categories} />

      {Object.keys(events).length > 0 && (
        <div className="space-y-16">
          {Object.entries(events).map(([month, monthEvents], monthIndex) => (
            <div key={month}>
              <h2 className="text-2xl font-bold mb-8 border-b pb-4">{month}</h2>

              <div className="space-y-8">
                {monthEvents.map((event, eventIndex) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {(!!searchParams.q || !!searchParams.category) &&
        Object.keys(events).length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find any event events matching your search
              criteria.
            </p>
          </div>
        )}
    </>
  );
}

async function fetchEvents(searchParams: EventsPageProps["searchParams"]) {
  const queryString = new URLSearchParams(searchParams).toString();

  const res = await serverFetch(`/events?${queryString}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) {
    return null;
  }

  const events: TEventsResponse_Public = await res.json();

  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.eventDate);
    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!groups[month]) {
      groups[month] = [];
    }

    groups[month].push(event);
    return groups;
  }, {} as Record<string, typeof events>);

  return groupedEvents;
}

async function fetchCategories() {
  const res = await serverFetch(
    `/categories/options?type=${CategoryType.EVENT}`,
    {
      next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
    }
  );

  if (!res.ok) {
    return null;
  }

  const categories: TPaginatedOptions = await res.json();

  return categories;
}
