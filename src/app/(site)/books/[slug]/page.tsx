import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { BOOK_BY_SLUG_QUERY, BOOK_SLUGS_QUERY } from '@/sanity/lib/queries'
import { BookDetail } from '@/components/book-detail'
import { LEAD_BUYERS_PLAYBOOK_SLUG } from '@/lib/books'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'
import type { BookDetail as Book } from '@/sanity/lib/types'

// Allow dynamic rendering for books not in the static build
export const dynamicParams = true
export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: BOOK_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Array<{ slug: string }>) || [])
      // The Playbook keeps its own URL at /book, so it is not built here too.
      .filter((book) => book.slug !== LEAD_BUYERS_PLAYBOOK_SLUG)
      .map((book) => ({ slug: book.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: BOOK_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  const book = data as Book | null
  if (!book) return {}

  return {
    title: book.title || 'Book',
    description: book.subtitle || undefined,
    alternates: { canonical: `/books/${slug}` },
  }
}

export default async function BookBySlugPage({ params }: Props) {
  const { slug } = await params

  // The Playbook's slug never reaches this component — next.config.ts 308s it
  // to /book at the routing layer, where a real HTTP status is possible.
  const { data } = await sanityFetch({
    query: BOOK_BY_SLUG_QUERY,
    params: { slug },
  })
  const book = data as Book | null

  if (!book) notFound()

  const baseUrl = 'https://billrice.com'

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Books', url: `${baseUrl}/books` },
          { name: book.title || '', url: `${baseUrl}/books/${slug}` },
        ])}
      />

      <div className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <nav className="mx-auto max-w-4xl text-sm text-gray-500">
          <Link href="/books" className="hover:text-black transition-colors">
            Books
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{book.title}</span>
        </nav>
      </div>

      <BookDetail book={book} canonicalPath={`/books/${slug}`} />
    </>
  )
}
