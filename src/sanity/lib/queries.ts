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
// Note: categories[defined(@->)]->{...} filters reference-array elements
// whose target documents have been deleted in Sanity, so the
// dereferenced array never contains null entries. Without this filter,
// downstream .map() consumers crash with "Cannot read properties of null".
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
    categories[defined(@->)]->{ _id, title, "slug": slug.current }
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
    categories[defined(@->)]->{ _id, title, "slug": slug.current },
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
    categories[defined(@->)]->{ _id, title, "slug": slug.current }
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

// ── Books ─────────────────────────────────────────────
//
// There used to be one query here, `*[_type == "book"][0]`, and it was a live
// hazard rather than a simplification. GROQ does not promise an order for an
// unordered filter, so `[0]` meant "whichever book the dataset hands back
// first". With a single book document that read as correct. The moment a second
// one landed, /book could have started rendering the wrong book underneath
// metadata, a canonical tag and a Book JSON-LD node that all still said The
// Lead Buyer's Playbook — and nothing would have failed loudly.
//
// So books are addressed two ways now, both deterministic: by slug for one
// book, and in an explicit order for the library. No caller gets a book by
// position.

/** Shared projection, so the library and a detail page cannot drift apart. */
const bookFields = /* groq */ `
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
`

/**
 * The library, in reading order: published books newest first, then the
 * forthcoming ones, then alphabetically. Sorting on `publishedDate` alone would
 * have left the forthcoming titles — which have no date — in an arbitrary spot,
 * so `defined(publishedDate)` carries them to the end as a group. The `title`
 * tiebreak is what makes the whole ordering total rather than merely mostly
 * stable.
 */
export const BOOKS_QUERY = defineQuery(/* groq */ `
  *[_type == "book" && defined(slug.current)]
    | order(defined(publishedDate) desc, publishedDate desc, title asc) {
    ${bookFields}
  }
`)

/** One book, addressed by slug. */
export const BOOK_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "book" && slug.current == $slug][0] {
    ${bookFields}
  }
`)

/** Slugs only, for generateStaticParams and the sitemap. */
export const BOOK_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "book" && defined(slug.current)]
    | order(defined(publishedDate) desc, publishedDate desc, title asc) {
    "slug": slug.current,
    publishedDate
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

// ── About Page ────────────────────────────────────────
export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutPage"][0] {
    headline,
    heroTagline,
    shortVersion,
    differentiators[] { title, description },
    timelineEvents[] { year, title, subtitle, description },
    expertiseAreas[] { area, detail },
    education[] { degree, institution, year },
    currentVentures[] { name, role, url, description },
    speakingWriting
  }
`)
