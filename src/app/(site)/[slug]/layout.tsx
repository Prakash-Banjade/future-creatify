import Navbar from "@/components/site/navbar";
import { fetchPage } from "@/lib/utilities/fetchPage";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
};

export default async function PageLayout({ children, params }: Props) {
  const { slug } = await params;

  const currentPage = await fetchPage(slug);

  const hasHero =
    currentPage.heroSections.length > 0 && !!currentPage.heroSections[0].image;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar hasHero={hasHero} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
