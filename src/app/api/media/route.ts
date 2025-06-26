import { db } from "@/db";
import { media } from "@/db/schema/media";
import checkAuth from "@/lib/check-auth";
import { v2 as cloudinary } from "cloudinary";
import { and, desc, eq, ilike, SQL } from "drizzle-orm";
import { NextRequest } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
    try {
        await checkAuth('admin');

        const searchParams = request.nextUrl.searchParams;
        const resource_type = searchParams.get('resource_type');
        const q = searchParams.get("q");
        const limitParam = searchParams.get("limit");

        const filters: SQL[] = [];

        if (q) filters.push(ilike(media.name, `%${q}%`));
        if (resource_type) filters.push(eq(media.resource_type, resource_type));

        const limit = limitParam ? Number(limitParam) > 50 ? 50 : Number(limitParam) : 10;

        const foundMedia = await db
            .select({
                id: media.id,
                name: media.name,
                width: media.width,
                height: media.height,
                alt: media.alt,
                caption: media.caption,
                secure_url: media.secure_url,
                updatedAt: media.updatedAt,
            })
            .from(media)
            .where(and(...filters))
            .orderBy(desc(media.updatedAt))
            .limit(limit);

        return Response.json(foundMedia);
    } catch (e) {
        if (e instanceof Error) {
            return Response.json({ error: e.message }, { status: 500 });
        }

        return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
