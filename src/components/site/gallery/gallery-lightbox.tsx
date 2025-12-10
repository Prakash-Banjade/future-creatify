"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { CldImage } from "next-cloudinary"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryImage {
    id: string
    public_id: string
    width: number
    height: number
    name: string
    categoryId: string
    categoryName: string
}

interface GalleryLightboxProps {
    images: GalleryImage[]
    initialIndex: number
    onClose: () => void
    onNavigate: (index: number) => void
}

export default function GalleryLightbox({ images, initialIndex, onClose, onNavigate }: GalleryLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [zoom, setZoom] = useState(1)
    const [panX, setPanX] = useState(0)
    const [panY, setPanY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const currentImage = images[currentIndex]

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "+" || e.key === "=") handleZoomIn()
            if (e.key === "-") handleZoomOut()
            if (e.key === "0") resetZoom()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [currentIndex])

    // freeze the window from scrolling
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % images.length
        setCurrentIndex(nextIndex)
        onNavigate(nextIndex)
        resetZoom()
    }, [currentIndex, images.length, onNavigate])

    const handlePrevious = useCallback(() => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length
        setCurrentIndex(prevIndex)
        onNavigate(prevIndex)
        resetZoom()
    }, [currentIndex, images.length, onNavigate])

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3))
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1))
    const resetZoom = () => {
        setZoom(1)
        setPanX(0)
        setPanY(0)
    }

    // Handle mouse drag for panning
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart({ x: e.clientX, y: e.clientY })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return

        // If zoomed in, allow panning
        if (zoom > 1) {
            const newX = panX + (e.clientX - dragStart.x)
            const newY = panY + (e.clientY - dragStart.y)
            setPanX(newX)
            setPanY(newY)
            setDragStart({ x: e.clientX, y: e.clientY })
        }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return
        setIsDragging(false)

        if (zoom === 1) {
            const diffX = e.clientX - dragStart.x
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    handlePrevious()
                } else {
                    handleNext()
                }
            }
        }
    }

    // Handle touch swiping for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (zoom > 1) return
        const touchX = e.touches[0].clientX
        const diffX = touchX - dragStart.x

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                handlePrevious()
            } else {
                handleNext()
            }
            setDragStart({ x: touchX, y: dragStart.y })
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                onClick={onClose}
            >
                {/* Close Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    className="absolute top-4 right-4 z-20 text-white hover:bg-white/20"
                >
                    <X className="w-6 h-6" />
                </Button>

                {/* Image Container */}
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden select-none"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        key={currentIndex}
                        style={{
                            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                            transformOrigin: "center",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative flex items-center justify-center"
                    >
                        <CldImage
                            src={currentImage.public_id}
                            alt={currentImage.name}
                            width={currentImage.width}
                            height={currentImage.height}
                            quality="auto"
                            format="auto"
                            className="pointer-events-none select-none max-h-[90vh] max-w-[90vw] object-contain"
                            preload
                        />
                    </motion.div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handlePrevious()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Zoom Controls */}
                <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleZoomOut()
                        }}
                        disabled={zoom <= 1}
                        className="text-white hover:bg-white/20"
                    >
                        <ZoomOut className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center justify-center min-w-12 text-white text-sm font-medium">
                        {Math.round(zoom * 100)}%
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleZoomIn()
                        }}
                        disabled={zoom >= 3}
                        className="text-white hover:bg-white/20"
                    >
                        <ZoomIn className="w-4 h-4" />
                    </Button>

                    <div className="w-px bg-white/20" />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation()
                            resetZoom()
                        }}
                        disabled={zoom === 1 && panX === 0 && panY === 0}
                        className="text-white hover:bg-white/20"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 z-20 text-white/70 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Image Info */}
                <div className="absolute bottom-6 right-6 z-20 text-white/70 text-sm text-right">
                    <p className="font-medium">{currentImage.name}</p>
                    <p className="text-xs">{currentImage.categoryName}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
