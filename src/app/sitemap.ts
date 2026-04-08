import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://billrice.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${BASE_URL}/bill-rice-headshot.jpg`],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${BASE_URL}/bill-rice-headshot.jpg`],
    },
    {
      url: `${BASE_URL}/book`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/now`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Blog posts from Sanity
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts: { slug: string; publishedAt: string }[] = await client.fetch(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
       | order(publishedAt desc) [0...200] {
         "slug": slug.current,
         publishedAt
       }`
    )
    blogPages = (posts || []).map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity unavailable — static pages only
  }

  // Blog categories from Sanity
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories: { slug: string }[] = await client.fetch(
      `*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`
    )
    categoryPages = (categories || []).map((cat) => ({
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  } catch {
    // Sanity unavailable
  }

  // Company pages from Sanity
  let companyPages: MetadataRoute.Sitemap = []
  try {
    const companies: { slug: string }[] = await client.fetch(
      `*[_type == "company" && defined(slug.current)]{ "slug": slug.current }`
    )
    companyPages = (companies || []).map((c) => ({
      url: `${BASE_URL}/companies/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity unavailable
  }

  // Project pages from Sanity
  let projectPages: MetadataRoute.Sitemap = []
  try {
    const projects: { slug: string }[] = await client.fetch(
      `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`
    )
    projectPages = (projects || []).map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity unavailable
  }

  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...companyPages,
    ...projectPages,
  ]
}
