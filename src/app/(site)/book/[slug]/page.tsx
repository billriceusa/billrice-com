import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BOOKS, getBook } from '@/lib/books'
import { BookDetail } from '@/components/book-detail'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Every book is known at build time — the registry is code, not a dataset — so
 * the full set is prerendered and an unknown slug is a 404 rather than a
 * dynamic miss.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return BOOKS.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) return {}

  return {
    title: book.title,
    description: book.subtitle,
    alternates: { canonical: `/book/${slug}` },
    openGraph: {
      title: `${book.title} — ${book.subtitle}`,
      description: book.blurb,
      images: [{ url: book.cover.src }],
    },
  }
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params
  const book = getBook(slug)

  if (!book) notFound()

  const baseUrl = 'https://billrice.com'

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Books', url: `${baseUrl}/book` },
          { name: book.title, url: `${baseUrl}/book/${book.slug}` },
        ])}
      />

      <div className="container mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <nav className="mx-auto max-w-4xl text-sm text-gray-500">
          <Link href="/book" className="hover:text-black transition-colors">
            Books
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{book.title}</span>
        </nav>
      </div>

      <BookDetail book={book} />

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto border-t border-gray-200 pt-8">
          <Link href="/book" className="text-gray-700 underline hover:text-black transition-colors">
            ← All books by Bill Rice
          </Link>
        </div>
      </div>
    </>
  )
}
