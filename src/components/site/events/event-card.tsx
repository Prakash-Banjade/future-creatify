import React from "react";
import { TEventsResponse_Public } from "../../../../types/event.types";
import { Calendar, Clock, ExternalLink, MapPin, User } from "lucide-react";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { Button } from "@/components/ui/button";

type Props = {
  event: TEventsResponse_Public[0];
};

export default function EventCard({ event }: Props) {
  return (
    <div className="card p-0 overflow-hidden hover-scale">
      <div className="flex flex-col md:flex-row h-fit">
        <div className="md:w-1/3 lg:w-1/4">
          {event.coverImage && (
            <CloudinaryImage
              crop="auto"
              src={event.coverImage?.secure_url}
              alt={event.title}
              width={300}
              height={250}
              className="w-full h-full   object-cover"
            />
          )}
        </div>

        <div className="p-6 md:w-2/3 lg:w-3/4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-sm px-3 py-1 rounded-full`}>
              {event.categoryName}
            </span>

            {!event.venue && (
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                Virtual
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold mb-2">{event.title}</h3>

          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{new Date(event.eventDate).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>
                {new Date(event.eventDate).toLocaleTimeString().split(" ")[0]}
              </span>
            </div>

            {!!event.venue && (
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{event.venue}</span>
              </div>
            )}

            {typeof event.capacity === "number" && event.capacity > 0 && (
              <div className="flex items-center">
                <User size={16} className="mr-1" />

                <span>{event.capacity} seats available</span>
              </div>
            )}
          </div>

          <p className="text-slate-600 mb-6 line-clamp-2">{event.summary}</p>

          <Button asChild variant="outline" size={"lg"} className="flex w-fit py-6 px-40 bg-transparent  border-2 border-primary text-primary ">
            <a
              href={"/events/" + event.slug}
            >
              More Details <ExternalLink size={16}  />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
