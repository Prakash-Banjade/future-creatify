import ContainerLayout from "@/components/cms/container-layout"
import NewPageButton from "@/components/cms/pages/new-page-btn"
import PagesList from "@/components/cms/pages/pages-list"
import { Suspense } from "react"

export default function PagesPage() {

    return (
        <ContainerLayout
            title='Pages'
            description="Manage your site pages here."
            actionTrigger={
                <NewPageButton />
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <PagesList />
            </Suspense>
        </ContainerLayout>
    )
}