import { Metadata } from "next";
import RenderHero from "@/components/site/heros/render-hero";
import RenderSections from "@/components/site/blocks/render-sections";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { SITE_TITLE } from "@/CONSTANTS";

const slug = "home";

export const generateMetadata = async (): Promise<Metadata> => {
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
      url: "/",
    },
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

