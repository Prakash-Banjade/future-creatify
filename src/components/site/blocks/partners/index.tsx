import React from "react";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import Link from "next/link";
import { Building2 } from "lucide-react";

const RenderPartners = async () => {
  const partnersResponse = await serverFetch(
    "/credibility-and-support?col=partners"
  );

  const { partners } = partnersResponse.ok
    ? ((await partnersResponse.json()) as {
        partners: TCredibilityAndSupport["partners"];
      })
    : { partners: [] };

  if (partners.length === 0) {
    return (
      <div className="text-center py-16">
        <Building2 className="mx-auto h-16 w-16 text-gray-400 mb-6" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Partners Yet
        </h3>
        <p className="text-gray-500">
          We're building amazing partnerships. Check back soon!
        </p>
      </div>
    );
  }

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative overflow-hidden py-4">
      {/* White shadow gradients at both ends */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Sliding container */}
      <div className="flex gap-8 card-slide card-slide-left">
        {duplicatedPartners.map((partner, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex flex-col items-center min-w-[180px] group "
          >
            {/* Clickable Image Container */}
            {partner.link ? (
              <Link
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-4 cursor-pointer"
              >
                <div className="relative p-8 bg-white rounded-full border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="flex justify-center items-center h-20 w-20">
                    {partner.image ? (
                      <CloudinaryImage
                        width={300}
                        height={300}
                        src={partner.image?.secure_url}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="mb-4">
                <div className="relative p-4 bg-white rounded-2xl border border-gray-100 shadow-lg">
                  <div className="flex justify-center items-center h-20 w-20">
                    {partner.image ? (
                      <CloudinaryImage
                        width={300}
                        height={300}
                        src={partner.image?.secure_url}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        aria-describedby={partner.name + "id"}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Partner Name */}
            <span
              id={partner.name + "id"}
              className="sr-only text-sm font-semibold text-center text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2"
            >
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderPartners;
