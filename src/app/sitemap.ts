import 'dotenv/config';

import { serverFetch } from '@/lib/data-access.ts/server-fetch'
import type { MetadataRoute } from 'next'
import { TPage } from '../../types/page.types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const nextUrl = process.env.NEXT_PUBLIC_URL!;

    const homePageSitemap: MetadataRoute.Sitemap = [
        {
            url: nextUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ]

    const res = await serverFetch(`/pages`);

    if (!res.ok) return homePageSitemap;

    const pages: TPage[] = await res.json();

    const sitemaps: MetadataRoute.Sitemap = pages.map((page) => ({
        url: nextUrl + "/" + page.slug,
        lastModified: page.updatedAt,
        changeFrequency: 'monthly',
        priority: .8,
    }))

    return [
        ...homePageSitemap,
        ...sitemaps,
    ]
}