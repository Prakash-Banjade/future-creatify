import { notFound } from "next/navigation";
import { serverFetch } from "../data-access.ts/server-fetch";
import { TPage } from "../../../types/page.types";

export async function fetchPage(slug: string) {
    const res = await serverFetch(`/pages/${slug}`, {
        next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
    });
    
    if (!res.ok) notFound();

    const page: TPage = await res.json();

    if (!page) notFound();

    return page;
}