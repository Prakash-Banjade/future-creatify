"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import axios from "axios"
import { TPaginatedOptions } from "../../types/global.types"


export function useInfiniteOptions(endpoint: string, queryString = "") {
    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, refetch } = useInfiniteQuery({
        queryKey: [endpoint, queryString, "options"],
        queryFn: async ({ pageParam }) => {
            const response = await axios.get<TPaginatedOptions>(process.env.NEXT_PUBLIC_API_URL + '/' + endpoint + `?page=${pageParam}&` + queryString);
            return response.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined
        },
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    // Flatten all pages into a single array of options
    const options = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? []
    }, [data])

    // Get total count from the first page
    const totalCount = data?.pages[0]?.meta.itemCount ?? 0

    return {
        options,
        totalCount,
        error: error as Error | null,
        fetchNextPage,
        hasNextPage: !!hasNextPage,
        isLoading: status === "pending",
        isFetching,
        isFetchingNextPage,
        refetch,
    }
}
