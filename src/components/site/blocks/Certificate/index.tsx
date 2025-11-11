import React from "react";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import Link from "next/link";
import { ExternalLink, Award, CheckCircle } from "lucide-react";

const RenderCertification = async () => {
  const cerificationResponse = await serverFetch(
    "/credibility-and-support?col=certifications"
  );

  const { certifications } = cerificationResponse.ok
    ? ((await cerificationResponse.json()) as {
        certifications: TCredibilityAndSupport["certifications"];
      })
    : { certifications: [] };

  if (certifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">
          No certifications available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {certifications.map((cert, idx) => (
        <div
          key={idx}
          className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
         

          {/* Image Container */}
          <div className="relative p-6 pb-4">
            <div className="flex justify-center items-center h-32 mb-4">
              {cert.image ? (
                <CloudinaryImage
                  width={400}
                  height={300}
                  src={cert.image.secure_url}
                  alt={cert.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-4 line-clamp-2 group-hover:text-primary transition-colors">
              {cert.name}
            </h3>

            {/* Link Button */}
            {cert.link && (
              <Link
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-xl hover:from-blue-700 hover:to-primary transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Certificate</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default RenderCertification;
