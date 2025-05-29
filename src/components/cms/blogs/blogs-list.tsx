import { DataTable } from '@/components/data-table/data-table';
import { TBlogsResponse } from '@/schemas/blog.schema'
import React from 'react'
import { blogsColumns } from './blogs-column';
import BlogsSearchFilters from './blogs-search-filters';

type Props = {
    blogs: TBlogsResponse;
}

export default function BlogsList({ blogs }: Props) {
    return (
        <>
            <BlogsSearchFilters />

            <DataTable columns={blogsColumns} data={blogs} />

            <section>
                <span className='text-sm text-muted-foreground'>{blogs.length} Blog(s)</span>
            </section>
        </>
    )
}