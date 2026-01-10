import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const nextUrl = process.env.API_URL!;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/cms/',
        },
        sitemap: nextUrl + '/sitemap.xml',
    }
}