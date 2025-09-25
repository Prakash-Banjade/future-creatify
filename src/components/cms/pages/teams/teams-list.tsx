import { TeamsPageProps } from '@/app/(cms)/cms/teams/page';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import SearchInput from '@/components/search/search-input';
import { getTeams } from '@/lib/data-access.ts/teams.data';
import { teamsColumns } from './teams.columns';

export default async function TeamsList(props: TeamsPageProps) {
    const searchParams = await props.searchParams;

    const result = await getTeams(searchParams);

    if (!result) return (
        <section>Unable to fetch teams</section>
    )

    return (
        <section className='space-y-6'>
            <section className='flex'>
                <SearchInput />
            </section>
            <DataTable columns={teamsColumns} data={result.data} />
            <DataTablePagination meta={result.meta} />
        </section>
    )
}