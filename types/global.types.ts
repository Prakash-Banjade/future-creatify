export interface PaginatedResponse<T> {
    data: T & {
        id: string,
        [key: string]: any
    }[];
    meta: TMeta;
}

export type TMeta = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
};