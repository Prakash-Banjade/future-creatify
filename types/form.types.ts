import { TMeta } from "./global.types";

export type TFormsResponse = {
    data: {
        id: string;
        title: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    meta: TMeta;
}