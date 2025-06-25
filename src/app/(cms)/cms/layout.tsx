import SidebarLayout from '@/components/cms/sidebar/sidebar-layout';
import getSession from '@/lib/getSession';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "CMS"
};

type Props = {
    children?: React.ReactNode;
}

export default async function CMSLayout({ children }: Props) {
    const session = await getSession();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/cms');
    }

    // allow only admin users
    if (session.user.role !== 'admin') {
        redirect('/profile');
    }

    return (
        <SidebarLayout>
            <div>{children}</div>
        </SidebarLayout>
    )
}