import { FormsPageProps } from "@/app/(cms)/cms/forms/page";
import { db } from "@/db";
import { forms } from "@/db/schema/form";
import { and, desc, ilike, SQL } from "drizzle-orm";
import checkAuth from "../check-auth";
import { getPaginationQueryParams, paginatedResponse } from "../db-utils";

export async function getForms(searchParamsProps: FormsPageProps["searchParams"]) {
    try {
        await checkAuth('admin');

        const searchParams = await searchParamsProps;
        const { page, pageSize } = getPaginationQueryParams(new URLSearchParams(searchParams));

        const filters: SQL[] = [];
        const { q } = searchParams;
        if (q) filters.push(ilike(forms.title, `%${q}%`));

        const query = db
            .select({
                id: forms.id,
                title: forms.title,
                slug: forms.slug,
                createdAt: forms.createdAt,
                updatedAt: forms.updatedAt
            })
            .from(forms)
            .where(and(...filters))
            .orderBy(desc(forms.updatedAt));

        return paginatedResponse({
            orderByColumn: desc(forms.updatedAt),
            qb: query.$dynamic(),
            page,
            pageSize
        });
    } catch (e) {
        console.error(e);
        return null;
    }
}