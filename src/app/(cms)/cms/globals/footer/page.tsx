import FooterForm from '@/components/cms/globals/footer-form'
import { db } from '@/db';
import { footer } from '@/db/schema/globals';

export default async function GlobalFooter() {
    const [existing] = await db.select({ id: footer.id, navLinks: footer.navLinks, footerText: footer.footerText }).from(footer).limit(1);

    if (!existing) return (
        <div>
            Footer not found. Please seed the database first.
        </div>
    )

    return (
        <FooterForm defaultValues={existing} />
    )
}