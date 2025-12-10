"use client"

import { Button } from "@/components/ui/button"

interface Category {
    name: string
    categoryId: string
}

interface GalleryFiltersProps {
    categories: Category[]
    selectedCategory: string | null
    onSelectCategory: (categoryId: string | null) => void
}

export default function GalleryFilters({ categories, selectedCategory, onSelectCategory }: GalleryFiltersProps) {
    return (
        <div className="container mx-auto flex flex-wrap gap-2 justify-center items-center">
            <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => onSelectCategory(null)}
                className="rounded-full"
            >
                All
            </Button>

            {categories.map((category) => (
                <Button
                    key={category.categoryId}
                    variant={selectedCategory === category.categoryId ? "default" : "outline"}
                    onClick={() => onSelectCategory(category.categoryId)}
                    className="rounded-full"
                >
                    {category.name}
                </Button>
            ))}
        </div>
    )
}
