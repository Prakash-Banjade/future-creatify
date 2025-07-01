import ContainerLayout from "@/components/cms/container-layout"
import FormsList from "@/components/cms/forms/forms-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export type FormsPageProps = {
    searchParams: Promise<{
        q?: string;
    }>
}

export default function FormsPage(props: FormsPageProps) {
    return (
        <ContainerLayout
            title='Forms'
            actionTrigger={
                <Button
                    type="button"
                    asChild
                >
                    <Link href={"forms/new"}>
                        <Plus />
                        Create
                    </Link>
                </Button>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <FormsList {...props} />
            </Suspense>
        </ContainerLayout>
    )
}