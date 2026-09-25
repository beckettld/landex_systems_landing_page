import type { MetadataRoute } from 'next'
import { PAGES } from '@/lib/pages'

const ORIGIN = 'https://www.landexsystems.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${ORIGIN}/`, lastModified: new Date('2026-09-21'), changeFrequency: 'weekly', priority: 1 },
    { url: `${ORIGIN}/pricing`, lastModified: new Date('2026-09-25'), changeFrequency: 'monthly', priority: 0.8 },
    ...PAGES.map((p) => ({
      url: `${ORIGIN}${p.href}`,
      lastModified: new Date(p.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
