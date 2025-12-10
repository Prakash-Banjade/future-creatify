"use client"

import { CldImage } from "next-cloudinary"
import { motion } from "framer-motion"

interface GalleryImage {
    id: string
    public_id: string
    width: number
    height: number
    name: string
    categoryId: string
    categoryName: string
}

interface GalleryMasonryProps {
    images: GalleryImage[]
    onImageClick: (index: number) => void
}

export default function GalleryMasonry({ images, onImageClick }: GalleryMasonryProps) {
    // Create masonry columns dynamically
    const getAspectRatio = (width: number, height: number) => {
        return width / height
    }

    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 space-y-2">
            {images.map((image, index) => {
                const aspectRatio = getAspectRatio(image.width, image.height)

                return (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => onImageClick(index)}
                        className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg bg-muted"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                onImageClick(index)
                            }
                        }}
                    >
                        {/* Loading Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted-foreground/5 to-muted animate-pulse z-0" />

                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <CldImage
                                src={image.public_id}
                                alt={image.name}
                                width={image.width}
                                height={image.height}
                                quality="auto"
                                format="auto"
                                loading="lazy"
                                preload={false}
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e5e5' width='100' height='100'/%3E%3C/svg%3E"
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    aspectRatio: `${aspectRatio}`,
                                    objectFit: "cover",
                                }}
                            />

                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
