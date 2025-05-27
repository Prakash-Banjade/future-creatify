export interface TBlog {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    image: string;
    date: string;
    author: string;
    category: string;
    tags?: string[];
}