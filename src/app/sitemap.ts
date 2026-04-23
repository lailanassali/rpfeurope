import { MetadataRoute } from 'next'
import { supabaseAdmin } from "@/lib/supabase";

const BASE_URL = 'https://www.rpfeurope.com'
const LAST_MODIFIED = new Date('2026-04-21')

async function getLocationSlugs(): Promise<string[]> {
    const { data, error } = await supabaseAdmin
        .from('locations')
        .select('name')

    if (error || !data) return []

    return data.map((location) =>
        location.name.toLowerCase().replace(/\s+/g, '-')
    )
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locationSlugs = await getLocationSlugs();

    const locationUrls = locationSlugs.map((slug) => ({
        url: `${BASE_URL}/join-service/${slug}`,
        lastModified: LAST_MODIFIED,
        priority: 0.64,
    }))
    return [
        {
            url: `${BASE_URL}/`,
            lastModified: LAST_MODIFIED,
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ministries/fellowship`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ministries/children`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ministries/children/register`,
            lastModified: LAST_MODIFIED,
            priority: 0.64,
        },
        {
            url: `${BASE_URL}/ministries/youth`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ministries/university`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/events`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/join-service`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        ...locationUrls,
        {
            url: `${BASE_URL}/connect`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/resources`,
            lastModified: LAST_MODIFIED,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: LAST_MODIFIED,
            priority: 0.64,
        },
    ]
}