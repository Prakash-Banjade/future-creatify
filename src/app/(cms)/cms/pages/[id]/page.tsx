import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { eq } from "drizzle-orm";
import { TPage } from "../../../../../../types/page.types";
import PageForm from "@/components/cms/pages/page-form";

type Props = {
    params: {
        id: string
    }
}

export default async function PageEditPage({ params }: { params: Promise<Props["params"]> }) {
    const { id } = await params;

    const foundPage: TPage | undefined = await db.query.pages.findFirst({
        where: eq(pages.id, id),
    });

    if (!foundPage) {
        return (
            <div>Page not found</div>
        )
    }

    return (
        <PageForm page={foundPage} />
    )
}