import { useState, useEffect, useCallback, useRef } from 'react';
import { AdvancedImage, lazyload } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { TMedia } from '@/types/media.types';
import { cloudinary } from '@/lib/cloudinary';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ImageLightboxProps {
    media: TMedia[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImageLightbox({ media, initialIndex, isOpen, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);
    const selectedImageButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [initialIndex]);

    useEffect(() => {
        if (selectedImageButtonRef.current) {
            // scroll only the inline axis (horizontal) so it moves left/right
            selectedImageButtonRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",   // no vertical scroll change
                inline: "nearest",  // move horizontally just enough to see it
            });
        }
    }, [currentIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePrevious = useCallback(() => {
        if (scale > 1) return; // Prevent nav when zoomed
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1));
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [media.length, scale]);

    const handleNext = useCallback(() => {
        if (scale > 1) return; // Prevent nav when zoomed
        setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0));
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [media.length, scale]);

    const handleZoomIn = () => {
        setScale((prev) => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = () => {
        setScale((prev) => {
            const newScale = Math.max(prev - 0.5, 1);
            if (newScale === 1) {
                setPosition({ x: 0, y: 0 });
            }
            return newScale;
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        e.preventDefault();
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // If zoomed in, allow free panning
        if (scale > 1) {
            setPosition({ x: newX, y: newY });
        } else {
            // If not zoomed, restrict vertical movement but track horizontal for swipe visual feedback
            // We only move X to show the user they are dragging
            setPosition({ x: newX, y: 0 });
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setIsDragging(false);

        // If not zoomed, check for swipe
        if (scale === 1) {
            const dragEnd = e.clientX - dragStart.x; // Re-calculate absolute drag distance from start
            // Careful: dragStart.x was (clientX - position.x), so (clientX - dragStart.x) gives us the NEW position.
            // But we reset position to 0 on start if scale=1. 
            // Let's rely on 'position.x' which is being updated in MouseMove.

            // Actually, wait. In handleMouseDown, we set dragStart = clientX - position.x. 
            // If scale=1, position is usually 0. So dragStart = clientX.
            // In handleMouseMove, position.x = clientX - dragStart. 
            // So position.x represents the delta.

            const threshold = 100; // px to trigger swipe
            if (Math.abs(position.x) > threshold) {
                if (position.x > 0) {
                    handlePrevious();
                } else {
                    handleNext();
                }
            } else {
                // Snap back
                setPosition({ x: 0, y: 0 });
            }
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStart({
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y
            });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && e.touches.length === 1) {
            const newX = e.touches[0].clientX - dragStart.x;
            const newY = e.touches[0].clientY - dragStart.y;

            if (scale > 1) {
                setPosition({ x: newX, y: newY });
            } else {
                setPosition({ x: newX, y: 0 });
            }
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (scale === 1) {
            const threshold = 50;
            if (Math.abs(position.x) > threshold) {
                if (position.x > 0) {
                    handlePrevious();
                } else {
                    handleNext();
                }
            } else {
                setPosition({ x: 0, y: 0 });
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === '+' || e.key === '=') handleZoomIn();
            if (e.key === '-' || e.key === '_') handleZoomOut();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, handlePrevious, handleNext]);

    if (!isOpen) return null;

    const currentMedia = media[currentIndex];

    // Safety check if media is empty or index is invalid
    if (!currentMedia) return null;

    const cldImage = cloudinary
        .image(currentMedia.public_id)
        .resize(fill().width(2000));

    return (
        <div className="fixed inset-0 z-50 bg-black">
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 pointer-events-none">
                <div className="flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
                    <div className="text-white">
                        <p className="text-sm opacity-75">
                            {currentIndex + 1} / {media.length}
                        </p>
                        {currentMedia.caption && (
                            <p className="text-sm mt-1">{currentMedia.caption}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleZoomOut}
                            disabled={scale <= 1}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Zoom out"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleZoomIn}
                            disabled={scale >= 4}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Zoom in"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>

                        <span className="text-white text-sm px-2">
                            {Math.round(scale * 100)}%
                        </span>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Close lightbox"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    ref={imageRef}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        cursor: isDragging ? 'grabbing' : (scale > 1 ? 'grab' : 'grab'),
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                        touchAction: 'none'
                    }}
                    className="max-w-full max-h-full select-none"
                >
                    <AdvancedImage
                        cldImg={cldImage}
                        plugins={[lazyload()]}
                        alt={currentMedia.alt || currentMedia.name}
                        className="max-w-screen max-h-screen object-contain pointer-events-none"
                        draggable={false}
                    />
                </div>
            </div>

            {media.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm z-20"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm z-20"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10 pointer-events-none">
                <ScrollArea className="overflow-x-auto max-w-7xl mx-auto">
                    <div className="flex gap-2 scrollbar-hide pointer-events-auto">
                        {media.map((item, index) => {
                            const thumbImage = cloudinary
                                .image(item.public_id)
                                .resize(fill().width(120).height(80));
                            const isSelected = index === currentIndex;

                            return (
                                <button
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(index);
                                        setScale(1);
                                        setPosition({ x: 0, y: 0 });
                                    }}
                                    className={`flex-shrink-0 rounded overflow-hidden transition-all ${index === currentIndex
                                        ? 'opacity-100 ring-2 ring-white'
                                        : 'opacity-50 hover:opacity-75'
                                        }`}
                                    ref={isSelected ? selectedImageButtonRef : null}
                                >
                                    <AdvancedImage
                                        cldImg={thumbImage}
                                        alt={item.alt || item.name}
                                        className="w-20 h-14 object-cover pointer-events-none"
                                    />
                                </button>
                            );
                        })}
                        <ScrollBar orientation="horizontal" className='md:h-1 h-0' />
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
