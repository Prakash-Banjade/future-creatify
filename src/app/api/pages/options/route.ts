import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { and, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const filters: SQL[] = [];

    if (q) filters.push(ilike(pages.name, `%${q}%`));

    const foundPages = await db
        .select({
            label: pages.name,
            value: pages.slug,
        })
        .from(pages)
        .where(and(...filters));

    return NextResponse.json(foundPages);
}