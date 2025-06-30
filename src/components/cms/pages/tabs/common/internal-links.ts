import { useFetchData } from "@/hooks/useFetchData";
import { SelectOption } from "../../../../../../types/global.types";

export function useInternalLinks(queryString: string = "") {
    const { data: pages, isLoading: isPagesLoading } = useFetchData<SelectOption[]>({
        endpoint: '/pages/options',
        queryKey: ['pages', 'options', queryString],
        queryString,
    });

    const { data: blogs, isLoading: isBlogsLoading } = useFetchData<SelectOption[]>({
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