import type { MetadataRoute } from 'next'

const BASE_URL = 'https://billrice.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${BASE_URL}/bill-rice-headshot.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/now`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact/thank-you`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}


