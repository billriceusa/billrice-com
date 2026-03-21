import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    title,
    description,
    heroTitle,
    heroTagline,
    heroSubtext,
    aboutBio,
    headshot {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    ogImage {
      asset->{ _id, url }
    },
    socialLinks,
    copyrightName
  }
`)

export const COMPANIES_QUERY = defineQuery(/* groq */ `
  *[_type == "company"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    url
  }
`)

export const PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    url
  }
`)

export const TOOLS_QUERY = defineQuery(/* groq */ `
  *[_type == "tool"] | order(order asc) {
    _id,
    name,
    description,
    url,
    category,
    price
  }
`)

// ── Posts ──────────────────────────────────────────────
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{ name, "slug": slug.current, image },
    categories[]->{ _id, title, "slug": slug.current }
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{ name, "slug": slug.current, image, bio },
    categories[]->{ _id, title, "slug": slug.current },
    seo
  }
`)

export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]{ "slug": slug.current }
`)

// ── Categories ────────────────────────────────────────
export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`)

export const POSTS_BY_CATEGORY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && $categorySlug in categories[]->slug.current]
  | order(publishedAt desc) [0...50] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{ name, "slug": slug.current, image },
    categories[]->{ _id, title, "slug": slug.current }
  }
`)

// ── Projects & Companies (detail) ─────────────────────
export const PROJECT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    url,
    logo {
      asset->{ _id, url }
    },
    body
  }
`)

export const COMPANY_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "company" && defined(slug.current)]{ "slug": slug.current }
`)

export const COMPANY_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "company" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    url,
    logo {
      asset->{ _id, url }
    },
    body
  }
`)

// ── Book ──────────────────────────────────────────────
export const BOOK_QUERY = defineQuery(/* groq */ `
  *[_type == "book"][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    author->{ name, "slug": slug.current, image, bio },
    publishedDate,
    freeReadUrl,
    purchaseLinks,
    chapters
  }
`)

// ── Now Page ──────────────────────────────────────────
export const NOW_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "nowPage"][0] {
    lastUpdated,
    priorities[] {
      title,
      description
    },
    speakingTopics,
    consultingAvailability
  }
`)
