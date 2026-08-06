import { billRiceRef } from '@/lib/identity'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billrice.com'

/**
 * Article node for an essay.
 *
 * `author` and `publisher` REFERENCE the canonical Person by @id — they never
 * inline one. An inlined Person here mints a fresh, anonymous, @id-less node on
 * every essay page, each carrying its own partial sameAs list, which is exactly
 * the entity-splitting this estate spent PR #11 consolidating. Matching sameAs
 * lists do not merge entities; a shared @id does. See src/lib/identity.ts.
 *
 * This pins the schema author to Bill on every essay regardless of the Sanity
 * `author` field. That is correct for this domain — /essays is by definition the
 * pieces only Bill can write. If a guest essay ever ships here, this needs a
 * real author lookup, not a widened inline node.
 */
export function articleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
}: {
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedAt: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    datePublished: publishedAt,
    author: billRiceRef,
    publisher: billRiceRef,
  }
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
