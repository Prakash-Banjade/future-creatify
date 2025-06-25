"use server";

import { db } from "@/db";
import checkAuth from "../check-auth";
import { heroSections, pages } from "@/db/schema/page";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSlug } from "../utils";
import { EHeroLayoutTypes } from "../../../types/page.types";
import { EAlignment } from "../../../types/global.types";


export async function createNewPage() {
    await checkAuth('admin');

    let pageId: string | undefined;

    await db.transaction(async (tx) => {

        const [page] = await tx.insert(pages).values({
            name: "Untitled",
            slug: generateSlug("Untitled"),
            metadata: {
                title: "Untitled",
                description: "",
                keywords: [],
            }
        }).returning({ id: pages.id });

        if (!page) throw new Error("Failed to create page");

        // insert hero-section
        await tx.insert(heroSections).values({
            pageId: page.id,
            headline: "",
            subheadline: "",
            image: null,
            layout: {
                type: EHeroLayoutTypes.Jumbotron,
                alignment: EAlignment.Center
            },
            cta: [],
        });

        pageId = page.id;
    })

    return { id: pageId };
}

export async function deletePage(id: string) {
    await checkAuth('admin');

    await db.delete(pages).where(eq(pages.id, id));

    revalidatePath(`/cms/pages`);
}