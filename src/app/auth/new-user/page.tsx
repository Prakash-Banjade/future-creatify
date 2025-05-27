import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation';
import React from 'react'
import { UpdateProfileForm } from './components/update-profile.form';

type Props = {}

export default async function NewUserPage({ }: Props) {
    const session = await getSession();

    if (!session) {
        redirect('/api/auth/signin');
    }

    if (session.user.profileCompleted === true) {
        redirect('/profile');
    }

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">New User</h1>
            <p>Welcome to the new user page.</p>

            <p>Please complete your profile to continue.</p>

            <div className='h-10' />

            <UpdateProfileForm />
        </section>
    )
}