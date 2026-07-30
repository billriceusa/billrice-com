import { BILL_RICE_ID } from '@/lib/identity'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billrice.com'

export function articleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  authorName,
}: {
  title: string
  description: string
  url: string
  imageUrl?: string
  publishedAt: string
  authorName: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      url: baseUrl,
      jobTitle: 'B2B Marketing Strategy Expert',
      sameAs: ['https://linkedin.com/in/billrice'],
    },
    publisher: {
      '@type': 'Person',
      name: 'Bill Rice',
      url: baseUrl,
    },
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

/**
 * Essay JSON-LD.
 *
 * Unlike `articleJsonLd` above, this does NOT inline a Person — it references
 * the canonical `@id` established in src/lib/identity.ts, so an essay attaches
 * to the one Bill Rice node the rest of the estate already points at rather
 * than minting a look-alike. See ~/Code/_shared-docs/bill-rice-identity.md.
 *
 * `datePublished` is emitted because schema.org consumers expect it and the
 * date is real — it is simply never rendered on the page.
 */
export function essayJsonLd({
  title,
  standfirst,
  url,
  imageUrl,
  publishedAt,
}: {
  title: string
  standfirst: string
  url: string
  imageUrl?: string
  publishedAt?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#essay`,
    headline: title,
    description: standfirst,
    url,
    ...(imageUrl && { image: imageUrl }),
    ...(publishedAt && { datePublished: publishedAt }),
    author: { '@id': BILL_RICE_ID },
    publisher: { '@id': BILL_RICE_ID },
    isPartOf: { '@id': `${baseUrl}/#website` },
    mainEntityOfPage: url,
  }
}
