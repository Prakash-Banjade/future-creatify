"use client"

import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';
import SearchInput from "@/components/search/search-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { Search } from 'lucide-react';

const schema = z.object({
    q: z.string().optional(),
    published: z.enum(["all", "true", "false"]).default("all"),
    favourite: z.literal("true"),
}).partial();

export default function BlogsSearchFilters_Public() {
    const { searchParams, setSearchParams } = useCustomSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const { success } = schema.safeParse({
            published: searchParams.get("published")
        });

        if (!success) { // if any of the values are invalid, reset the search params
            return router.push(pathname);
        }
    }, []);

    return (
        <div className="group mb-12 flex gap-1 border border-gray-300 rounded-lg items-center pr-3 focus-within:ring-2 focus-within:ring-primary transition-all">
            <Select
                defaultValue={searchParams.get("category") || ""}
                onValueChange={(value) => setSearchParams("category", value)}
            >
                <SelectTrigger className="py-6 border-0 shadow-none focus-visible:ring-0">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                </SelectContent>
            </Select>

            <SearchInput
                placeholder="Search blogs..."
                className={{
                    input: "min-w-auto flex-1 py-6 border-0 shadow-none focus-visible:ring-0",
                    container: "grow"
                }}
                showIcon={false}
            />

            <div className='shrink-0 sm:block hidden'>
                <Search className='text-muted-foreground group-focus-within:text-foreground' size={20} />
            </div>
        </div>
    )
}