export interface PaginatedResponse<T> {
    data: T[];
    meta: TMeta;
}

export type TMeta = {
    page: number;
    pageSize: number;
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