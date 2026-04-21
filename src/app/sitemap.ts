import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.rpfeurope.com'
const LAST_MODIFIED = new Date('2026-04-21')

export default function sitemap(): MetadataRoute.Sitemap {
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