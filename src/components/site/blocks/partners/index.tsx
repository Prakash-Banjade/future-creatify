import React from "react";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";






const RenderPartners = async () => {

    const partnersResponse = await serverFetch(
        "/credibility-and-support?col=partners"
    );

    const { partners } = partnersResponse.ok
        ? ((await partnersResponse.json()) as { partners: TCredibilityAndSupport["partners"] })
        : { partners: [] };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
                <a
                    key={idx}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                >
                    {partner.image && <CloudinaryImage
                        width={500}
                        height={500}
                        src={partner.image?.secure_url}
                        alt={partner.name}
                        className="w-24 h-24 object-cover rounded-full mb-3"
                    />}
                    <h3 className="text-lg font-semibold">{partner.name}</h3>
                    <p className="text-sm text-gray-500">Age: {partner.age}</p>
                </a>
            ))}
        </div>
    );
};

export default RenderPartners;
