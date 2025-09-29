import { db } from "@/db";
import { teamTable } from "@/db/schema/team";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, inArray, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const q = searchParams.get("q");
  const { page, pageSize } = getPaginationQueryParams(searchParams);
  const ids = searchParams.get("ids")?.split(",") || [];
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
      socialLinks: teamTable.socialLinks,
    })
    .from(teamTable)
    .where(and(...filters));

  const foundTeams = await paginatedResponse({
    orderByColumn: desc(teamTable.createdAt),
    qb: query.$dynamic(),
    page,
    pageSize,
  });

  return NextResponse.json(foundTeams);
}
