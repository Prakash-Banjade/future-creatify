import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}

export default function BlogEditLayout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    )
}