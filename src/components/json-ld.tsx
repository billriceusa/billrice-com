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
