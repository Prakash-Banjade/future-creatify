import React from "react";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import Link from "next/link";


const RenderAlumni = async () => {
  const alumniResponse = await serverFetch(
    "/credibility-and-support?col=alumni"
  );

  const alumni = alumniResponse.ok
    ? ((await alumniResponse.json()) as TCredibilityAndSupport["alumni"])
    : [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {alumni.map((person, idx) => (
        <Link
          key={idx}

          href={person?.link || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-5 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          {person.image && <CloudinaryImage
            width={500}
            height={500}
            src={person.image.secure_url}
            alt={person.name}
            className="w-24 h-24 object-cover rounded-full mb-3"
          />}
          <h3 className="text-lg font-semibold text-center">{person.name}</h3>

          <RichTextPreview html={person.story.html} />


        </Link>
      ))}
    </div>
  );
};

export default RenderAlumni;
