import getSession from '@/lib/getSession';
import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
    children?: React.ReactNode;
}

export default async function SignInLayout({ children }: Props) {
    const session = await getSession();

    if (session) redirect('/cms');

    return (
        <section className='min-h-screen flex flex-col items-center justify-center'>
            <Suspense fallback={
                <div className="flex items-center justify-center h-screen gap-2 text-base">
                    <LoaderCircle className="size-5 animate-spin" />
                    Please wait...
                </div>
            }>
                {children}
            </Suspense>
        </section>
    )
}