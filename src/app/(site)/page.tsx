import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import RenderHero from "@/components/site/heros/render-hero";
import { TPage } from "../../../types/page.types";
import RenderSections from "@/components/site/blocks/render-sections";

const slug = "home";

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(slug);

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords
  }
}

export default async function Page() {
  const page = await fetchPage(slug);

  return (
    <div>
      <RenderHero hero={page.heroSections[0]} />
      <RenderSections sections={page.sections} />
    </div>
  );
}

async function fetchPage(slug: string) {
  const res = await serverFetch(`/pages/${slug}`);

  if (!res.ok) notFound();

  const page: TPage = await res.json();

  if (!page) notFound();

  return page;
}