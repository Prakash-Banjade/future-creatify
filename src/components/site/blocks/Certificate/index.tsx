import React from "react";
import { CertificationBlock } from "../../../../../types/blocks.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";



const RenderCertification = async () => {
    const cerificationResponse = await serverFetch(
        "/credibility-and-support?col=cerification"
    );

    const certifications = cerificationResponse.ok
        ? ((await cerificationResponse.json()) as TCredibilityAndSupport["certifications"])
        : [];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
                <a
                    key={idx}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                >
                    {cert.image && <CloudinaryImage
                        width={500}
                        height={500}
                        src={cert.image.secure_url}
                        alt={cert.name}
                        className="w-24 h-24 object-contain mb-3"
                    />}
                    <h3 className="text-lg font-semibold text-center">{cert.name}</h3>
                </a>
            ))}
        </div>
    );
};

export default RenderCertification;
