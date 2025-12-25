"use client";

import { useMemo, useState } from "react";
import { TGallery } from "../../../types/gallery.types";
import GalleryMasonry from "./gallery-masonry";
import GalleryFilters from "./gallery-filter";
import ImageLightbox from "./image-lightbox";
import { TMediaSelect } from "@/db/schema/media";

type Props = {
  /** 
   * @description Array of galleries with media and blur data URL
   * @dev blurDataUrl property is added in each media object otherwise the type is exactly the same as TGalleryResponse
   */
  galleries: (Omit<TGallery, "media"> & {
    media: (TMediaSelect & { blurDataUrl: string | undefined })[]
  })[]
}

export default function GalleryContainer({ galleries }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = useMemo(() => {
    return galleries.map((item) => ({
      name: item.category.name,
      categoryId: item.categoryId
    }))
  }, []);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (!selectedCategory) {
      return galleries.flatMap((item) =>
        item.media.map((img) => ({ ...img, categoryId: item.categoryId, categoryName: item.category.name })),
      )
    }

    const selectedData = galleries.find((item) => item.categoryId === selectedCategory)
    return (
      selectedData?.media.map((img) => ({
        ...img,
        categoryId: selectedData.categoryId,
        categoryName: selectedData.category.name,
      })) || []
    )
  }, [selectedCategory])

  return (
    <>
      {/* Category Filters */}
      <GalleryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredImages.length > 0 ? (
          <GalleryMasonry images={filteredImages} onImageClick={(index) => {
            setSelectedImageIndex(index)
            setLightboxOpen(true)
          }} />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No images found in this category</p>
          </div>
        )}
      </div>

      <ImageLightbox
        media={filteredImages}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}