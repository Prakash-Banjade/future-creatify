import { DataTable } from '@/components/data-table/data-table';
import { db } from '@/db'
import { pages } from '@/db/schema/page'
import { desc } from 'drizzle-orm';
import { pagesColumns } from './pages.columns';
import { TPagesResponse } from '../../../../types/page.types';

export default async function PagesList() {
    const foundPages = await getPages();

    return (
        <>
            <DataTable columns={pagesColumns} data={foundPages} />

            <section>
                <span className='text-sm text-muted-foreground'>{foundPages.length} Page(s)</span>
            </section>
        </>
    )
}

async function getPages(): Promise<TPagesResponse> {
    try {
        const foundPages = await db
            .select({
                id: pages.id,
                name: pages.name,
                slug: pages.slug,
                createdAt: pages.createdAt,
            })
            .from(pages)
            .orderBy(desc(pages.createdAt));

        return foundPages;
    } catch (e) {
        console.error(e);
        return [];
    }
}