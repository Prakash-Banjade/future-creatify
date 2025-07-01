import { useFetchData } from "@/hooks/useFetchData";
import { TPaginatedOptions } from "../../../../../../types/global.types";

export function useInternalLinks(queryString: string = "") {
    const { data: pages, isLoading: isPagesLoading } = useFetchData<TPaginatedOptions>({
        endpoint: '/pages/options',
        queryKey: ['pages', 'options', queryString],
        queryString,
    });

    const { data: blogs, isLoading: isBlogsLoading } = useFetchData<TPaginatedOptions>({
        endpoint: '/blogs/options',
        queryKey: ['blogs', 'options', queryString],
        queryString,
    });

    const isLoading = isPagesLoading || isBlogsLoading;

    return {
        data: [
            {
                label: 'pages',
                options: pages,
            },
            {
                label: 'blogs',
                options: blogs,
            },
        ],
        isLoading
    }
}