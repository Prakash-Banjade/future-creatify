import ContainerLayout from '@/components/cms/container-layout'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function BlogsPage({ }: Props) {
    return (
        <ContainerLayout
            title='Blogs'
            description="Manage your blogs here."
            actionTrigger={
                <Button asChild>
                    <Link href="/cms/blogs/new">
                        <Plus />
                        New Blog
                    </Link>
                </Button>
            }
        >

        </ContainerLayout>
    )
}