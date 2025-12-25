import RenderHero from "@/components/site/heros/render-hero";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { GALLERY_SLUG } from "@/app/slugs";
import GalleryContainer from "@/components/site/gallery/gallery-container";
import { TGalleryResponse } from "../../../types/gallery.types";
import { getBlurDataUrl } from "@/lib/getBlurDataUrl";

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(GALLERY_SLUG);

  return {
    title: page.metadata?.title || "Our Gallery",
    description: page.metadata?.description || "Explore our gallery of images and moments",
    keywords: page.metadata?.keywords,
  };
};

export default async function GalleryPage() {
  const page = await fetchPage(GALLERY_SLUG);

  const res = await serverFetch("/gallery", {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) }
  });

  if (!res.ok) return <div>Failed to fetch gallery</div>;

  const galleries = await res.json() as TGalleryResponse;

  const galleriesWithBlurDataUrl = await Promise.all(galleries.map(async (gallery) => ({
    ...gallery,
    media: await Promise.all(gallery.media.map(async (media) => ({
      ...media,
      blurDataUrl: await getBlurDataUrl(media.public_id),
    }))),
  })));

  return (
    <>
      <RenderHero heroSections={page.heroSections} />

      <section className="container py-12">
        <GalleryContainer galleries={galleriesWithBlurDataUrl} />
      </section>
    </>
  );
}