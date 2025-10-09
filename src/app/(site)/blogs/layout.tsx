import Navbar from "@/components/site/navbar";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";

export const BLOG_SLUG = "blogs";

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(BLOG_SLUG);

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords,
  };
};

type Props = {
  children: React.ReactNode;
};

export default async function BlogLayout({ children }: Props) {
  const blogPage = await fetchPage(BLOG_SLUG);

  const hasHero =
    blogPage.heroSections.length > 0 && !!blogPage.heroSections[0].image;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar hasHero={hasHero} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
