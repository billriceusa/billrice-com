// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any

export type PostSummary = {
  _id: string
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
  mainImage: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: unknown } } | null
    alt: string | null
  } | null
  author: { name: string | null; slug: string | null; image: SanityImage } | null
  categories: Array<{ _id: string; title: string | null; slug: string | null }> | null
}

export type PostDetail = PostSummary & {
  body: SanityImage
  seo: { metaTitle: string | null; metaDescription: string | null } | null
  author: {
    name: string | null
    slug: string | null
    image: SanityImage
    bio: string | null
  } | null
}

export type Category = {
  _id: string
  title: string | null
  slug: string | null
  description: string | null
  postCount: number
}

export type BookDetail = {
  _id: string
  title: string | null
  subtitle: string | null
  slug: string | null
  description: SanityImage
  coverImage: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: unknown } } | null
    alt: string | null
  } | null
  author: { name: string | null; slug: string | null; image: SanityImage; bio: string | null } | null
  publishedDate: string | null
  freeReadUrl: string | null
  purchaseLinks: Array<{ platform: string; url: string; label: string; _key: string }> | null
  chapters: Array<{ number: number; title: string; description: string; _key: string }> | null
}
