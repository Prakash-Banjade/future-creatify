import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function VerifyRequestPage({ }: Props) {
    const session = await getSession();

    if (session) redirect('/cms');

    return (
        <section>
            <h1 className='text-2xl'>Check your email</h1>
            <p>A sign in link has been sent to your email address.</p>
        </section>
    )
}