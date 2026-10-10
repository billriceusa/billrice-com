import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { LEAD_BUYERS_PLAYBOOK_SLUG } from '@/lib/books'

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
      url: `${BASE_URL}/books`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/essays`,
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

  // Essays from Sanity
  let essayPages: MetadataRoute.Sitemap = []
  try {
    const posts: { slug: string; publishedAt: string }[] = await client.fetch(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
       | order(publishedAt desc) [0...200] {
         "slug": slug.current,
         publishedAt
       }`
    )
    essayPages = (posts || []).map((post) => ({
      url: `${BASE_URL}/essays/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity unavailable — static pages only
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

  // Book pages from Sanity. The Playbook is skipped: it is already listed above
  // at /book, and /books/<its slug> redirects there, so including it would put
  // a redirect in the sitemap.
  let bookPages: MetadataRoute.Sitemap = []
  try {
    const books: { slug: string }[] = await client.fetch(
      `*[_type == "book" && defined(slug.current) && slug.current != $playbookSlug]{ "slug": slug.current }`,
      { playbookSlug: LEAD_BUYERS_PLAYBOOK_SLUG }
    )
    bookPages = (books || []).map((b) => ({
      url: `${BASE_URL}/books/${b.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity unavailable
  }

  return [
    ...staticPages,
    ...essayPages,
    ...companyPages,
    ...projectPages,
    ...bookPages,
  ]
}
