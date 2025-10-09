import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import Link from "next/link";
import EventCard from "../../events/event-card";
import { TEventsResponse_Public } from "../../../../../types/event.types";

export default async function EventsBlock({
  limit,
  order,
  selected,
}: RefItemBlockDto & { refRelation: ERefRelation.Events }) {
  const urlSearchParams = new URLSearchParams({
    limit: limit?.toString(),
    order: order,
  });

  if (selected?.length)
    urlSearchParams.set("slugs", selected.map((s) => s.value)?.join(","));

  const res = await serverFetch("/events" + `?${urlSearchParams.toString()}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const events: TEventsResponse_Public = await res.json();

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((b) => {
          return <EventCard key={b.slug} event={b} />;
        })}
      </section>
      <div className="flex justify-center">
        <Link className="text-primary w-fit flex justify-center" href={"/events"}>
          View All Events
        </Link>
      </div>
    </>
  );
}
