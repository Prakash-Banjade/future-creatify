import BlogForm from '@/components/cms/blogs/blog-form'
import ContainerLayout from '@/components/cms/container-layout'
import React from 'react'

type Props = {}

export default function NewBlogPage({ }: Props) {
    return (
        <ContainerLayout
            title='New Blog'
            description="Create a new blog post here."
        >
            <BlogForm />
        </ContainerLayout>
    )
}