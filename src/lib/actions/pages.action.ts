"use server";

import { db } from "@/db";
import checkAuth from "../check-auth";
import { pages } from "@/db/schema/page";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSlug } from "../utils";
import { heroSectionDtoDefaultValues } from "@/schemas/hero-section.schema";


export async function createNewPage() {
    await checkAuth('admin');

    const [page] = await db.insert(pages).values({
        name: "Untitled",
        slug: generateSlug("Untitled"),
        metadata: {
            title: "Untitled",
            description: "",
            keywords: [],
        },
        heroSections: [
            heroSectionDtoDefaultValues
        ]
    }).returning({ id: pages.id });

    if (!page) throw new Error("Failed to create page");

    return { id: page.id };
}

export async function deletePage(id: string) {
    await checkAuth('admin');

    await db.delete(pages).where(eq(pages.id, id));

    revalidatePath(`/cms/pages`);
}