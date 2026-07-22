import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // The admin CMS and its API are not public content — nothing
                // under either path should ever be crawled or indexed.
                disallow: ['/admin', '/api'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
