import { ImageResponse } from "next/og";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TSiteSettingSelect } from "@/db/schema/site-setting";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
    try {
        const res = await serverFetch("/site-settings");
        if (!res.ok) {
            return new Response(null, { status: 404 });
        }

        const siteSettings = (await res.json()) as TSiteSettingSelect;
        const logoUrl = siteSettings.logoLight?.secure_url;

        if (!logoUrl) {
            return new Response(null, { status: 404 });
        }

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                    }}
                >
                    <img
                        src={logoUrl}
                        alt="favicon"
                        width={size.width}
                        height={size.height}
                        style={{ objectFit: "contain" }}
                    />
                </div>
            ),
            size
        );
    } catch (error) {
        console.error("Icon generation failed:", error);
        return new Response(null, { status: 500 });
    }
}
