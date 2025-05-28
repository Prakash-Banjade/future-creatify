import NewBlogButton from '@/components/cms/blogs/new-blog-btn'
import ContainerLayout from '@/components/cms/container-layout'

type Props = {}

export default function BlogsPage({ }: Props) {
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