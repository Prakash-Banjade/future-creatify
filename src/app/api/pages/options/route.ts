import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { NextResponse } from "next/server";

export async function GET() {
    const foundPages = await db
        .select({
            label: pages.name,
            value: pages.slug,
        })
        .from(pages)

    return NextResponse.json(foundPages);
}