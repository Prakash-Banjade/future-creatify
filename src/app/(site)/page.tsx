import { Metadata } from "next";
import RenderHero from "@/components/site/heros/render-hero";
import RenderSections from "@/components/site/blocks/render-sections";
import { fetchPage } from "@/lib/utilities/fetchPage";

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

