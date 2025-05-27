import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default async function SignInLayout({ children }: Props) {
    const session = await getSession();

    if (session) redirect('/cms');

    return (
        <div>{children}</div>
    )
}