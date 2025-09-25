import { db } from "@/db";
import { teamTable } from "@/db/schema/team";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, inArray, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const body = await request.json();

    let ids = [];

    if (Array.isArray(body.ids)) ids = body.ids;

    const q = searchParams.get("q");
    const { page, pageSize } = getPaginationQueryParams(searchParams);

    const filters: SQL[] = [];
    if (q) filters.push(ilike(teamTable.name, `%${q}%`));

    if (ids.length > 0) filters.push(inArray(teamTable.id, ids));

    const query = db
        .select({
            id: teamTable.id,
            name: teamTable.name,
            role: teamTable.role,
            description: teamTable.description,
            updatedAt: teamTable.updatedAt,
            image: teamTable.image,
        })
        .from(teamTable)
        .where(and(...filters));

    const foundTeams = await paginatedResponse({
        orderByColumn: desc(teamTable.createdAt),
        qb: query.$dynamic(),
        page,
        pageSize
    })

    return NextResponse.json(foundTeams);
}