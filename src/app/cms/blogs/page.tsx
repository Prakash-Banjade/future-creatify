import NewBlogButton from '@/components/cms/blogs/new-blog-btn'
import ContainerLayout from '@/components/cms/container-layout'

export default function BlogsPage() {
    return (
        <ContainerLayout
            title='Blogs'
            description="Manage your blogs here."
            actionTrigger={
                <NewBlogButton />
            }
        >

        </ContainerLayout>
    )
}