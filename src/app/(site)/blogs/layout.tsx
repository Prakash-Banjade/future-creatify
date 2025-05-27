import SiteLayout from '@/components/site/site-layout'
import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default function BlogsLayout({ children }: Props) {
    return (
        <SiteLayout>
            {children}
        </SiteLayout>
    )
}