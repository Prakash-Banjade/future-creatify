import HeaderForm from '@/components/cms/globals/header-form'
import { db } from '@/db'
import { header } from '@/db/schema/globals'

export default async function GlobalHeader() {
    const [existing] = await db.select({ id: header.id, navLinks: header.navLinks }).from(header).limit(1);

    if (!existing) return (
        <div>
            Header not found. Please seed the database first.
        </div>
    )

    return (
        <HeaderForm
            defaultValues={existing}
        />
    )
}