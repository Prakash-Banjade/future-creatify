"use client";

import { useMemo, useState } from "react";
import { TGalleryResponse } from "../../../types/gallery.types";
import GalleryMasonry from "./gallery-masonry";
import GalleryLightbox from "./gallery-lightbox";
import GalleryFilters from "./gallery-filter";

export default function GalleryContainer({ galleries }: { galleries: TGalleryResponse }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

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
          <GalleryMasonry images={filteredImages} onImageClick={(index) => setSelectedImageIndex(index)} />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </>
  );
}