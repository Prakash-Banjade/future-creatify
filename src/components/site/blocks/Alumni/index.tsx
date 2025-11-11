import React from "react";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { GraduationCap, ExternalLink, Star, Users } from "lucide-react";

const RenderAlumni = async () => {
  const alumniResponse = await serverFetch(
    "/credibility-and-support?col=alumni"
  );

  const { alumni } = alumniResponse.ok
    ? ((await alumniResponse.json()) as {
        alumni: TCredibilityAndSupport["alumni"];
      })
    : { alumni: [] };

  if (alumni.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="mx-auto h-16 w-16 text-gray-400 mb-6" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Alumni Stories Yet
        </h3>
        <p className="text-gray-500">
          Check back soon for inspiring alumni success stories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {alumni.map((person, idx) => (
        <div
          key={idx}
          className="group relative bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
        >
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

          {/* Alumni Badge */}
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-primary/10 text-primary p-2.5 rounded-full border border-primary/20">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative p-8 pb-6">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative mb-6">
                {person.image ? (
                  <div className="relative">
                    <CloudinaryImage
                      width={400}
                      height={400}
                      src={person.image.secure_url}
                      alt={person.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Success Ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                )}

                {/* Success Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-lg">
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {person.name}
              </h3>
            </div>
          </div>

          {/* Story Section */}
          <div className="px-8 pb-6">
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 bg-primary text-white p-2 rounded-full">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                <RichTextPreview html={person.story.html} />
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default RenderAlumni;
