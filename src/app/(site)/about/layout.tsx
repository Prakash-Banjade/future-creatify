import SiteLayout from '@/components/site/site-layout'
import { Metadata } from 'next'

type Props = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about our mission, values, and team behind Future Creatify.",
}

export default function AboutLayout({ children }: Props) {
    return (
        <SiteLayout>
            {children}
        </SiteLayout>
    )
}