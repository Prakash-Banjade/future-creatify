import { DataTable } from '@/components/data-table/data-table';
import { TBlog } from '@/schemas/blog.schema'
import React from 'react'
import { blogsColumns } from './blogs-column';

type Props = {
    blogs: TBlog[];
}

export default function BlogsList({ blogs }: Props) {
    return (
        <>
            <DataTable columns={blogsColumns} data={blogs} />

            <section>
                <span className='text-sm text-muted-foreground'>{blogs.length} Blog(s)</span>
            </section>
        </>
    )
}