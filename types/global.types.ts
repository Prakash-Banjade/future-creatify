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

export enum EAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum EAlignmentExcludeCenter {
    Left = 'left',
    Right = 'right'
}