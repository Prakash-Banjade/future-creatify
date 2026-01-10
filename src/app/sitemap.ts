import type { MetadataRoute } from 'next'
import { HOME_SLUG } from './slugs';
import { APP_URL } from '@/CONSTANTS';
import { db } from '@/db';
import { pages } from '@/db/schema/page';
import { blogs } from '@/db/schema/blog';
import { isNull, not } from 'drizzle-orm';
import { events } from '@/db/schema/event';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pagesData = await db.select({
        slug: pages.slug,
        updatedAt: pages.updatedAt
    }).from(pages);

    const blogsData = await db.select({
        slug: blogs.slug,
        publishedAt: blogs.publishedAt,
        updatedAt: blogs.updatedAt,
    }).from(blogs).where(not(isNull(blogs.publishedAt))) // ensure blogs are published

    const eventsData = await db.select({
        slug: events.slug,
        updatedAt: events.updatedAt
    }).from(events)

    const pagesSitemap: MetadataRoute.Sitemap = pagesData.map(p => {
        return ({
            url: `${APP_URL}/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'yearly',
            priority: p.slug === HOME_SLUG ? 1 : 0.8
        })
    });

    const blogsSitemap: MetadataRoute.Sitemap = blogsData.map(b => ({
        url: `${APP_URL}/blogs/${b.slug}`,
        lastModified: b.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    const eventsSitemap: MetadataRoute.Sitemap = eventsData.map(e => ({
        url: `${APP_URL}/events/${e.slug}`,
        lastModified: e.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    return [
        {
            url: APP_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1
        },
        ...pagesSitemap,
        ...blogsSitemap,
        ...eventsSitemap,
    ]
}