import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { notFound } from "next/navigation";
import { TPage } from "../../../../types/page.types";
import { Metadata } from "next";
import RenderHero from "@/components/site/heros/render-hero";
import RenderSections from "@/components/site/blocks/render-sections";
import { SITE_TITLE } from "@/CONSTANTS";

export async function generateStaticParams() {
    const allPages = await db.select({ slug: pages.slug }).from(pages);
    return allPages
        .filter(p => p.slug !== "home")
        .map((p) => ({ slug: p.slug }));
}

export const generateMetadata = async ({ params: paramsPromise }: Props): Promise<Metadata> => {
    const { slug = "home" } = await paramsPromise;
    const { metadata: { title, description, keywords, ogImage } } = await fetchPage(slug);

    return {
        title,
        description,
        keywords: Array.isArray(keywords) ? keywords : [],
        openGraph: {
            type: "website",
            title: title
                ? title + ` | ${SITE_TITLE}`
                : SITE_TITLE,
            description,
            images: ogImage?.secure_url
                ? [
                    {
                        url: ogImage.secure_url,
                    },
                ] : undefined,
            url: slug === "home" ? "/" : `/${slug}`,
        },
    }
}

type Props = {
    params: Promise<{
        slug?: string;
    }>
}

export default async function Page({ params: paramsPromise }: Props) {
    const { slug = "home" } = await paramsPromise;
    const page = await fetchPage(slug);

    return (
        <div>
            <RenderHero hero={page.heroSections[0]} />
            <RenderSections sections={page.sections} />
        </div>
    );
}

async function fetchPage(slug: string) {
    const res = await serverFetch(`/pages/${slug}`, {
        next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
    });

    if (!res.ok) notFound();

    const page: TPage = await res.json();

    if (!page) notFound();

    return page;
}