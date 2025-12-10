"use client";

import { useMemo, useState } from "react";
import { TGalleryResponse } from "../../../types/gallery.types";
import GalleryMasonry from "./gallery-masonry";
import GalleryFilters from "./gallery-filter";
import ImageLightbox from "./image-lightbox";

export default function GalleryContainer({ galleries }: { galleries: TGalleryResponse }) {
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