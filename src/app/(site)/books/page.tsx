import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { BOOKS_QUERY } from '@/sanity/lib/queries'
import type { BookDetail as Book } from '@/sanity/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Books',
  description:
    "Books by Bill Rice — The Lead Buyer's Playbook, and what follows it. Thirty years of buying, generating, and converting consumer-direct leads.",
  alternates: { canonical: '/books' },
}

export default async function BooksPage() {
  let books: Book[] = []
  try {
    const { data } = await sanityFetch({ query: BOOKS_QUERY })
    books = (data || []) as Book[]
  } catch {
    // Sanity unreachable — the empty state below carries the page.
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Books</h1>
        <p className="mt-4 text-lg text-gray-600">
          Thirty years of buying, generating, and converting the consumer-direct
          lead, written down.
        </p>
      </header>

      {books.length > 0 ? (
        <ol className="mt-14 divide-y divide-gray-200 border-t border-gray-200">
          {books.map((book) => (
            <li key={book._id}>
              <Link href={`/books/${book.slug}`} className="group block py-8 transition-colors">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#B8960A] transition-colors sm:text-2xl">
                  {book.title}
                </h2>
                {book.subtitle && (
                  <p className="mt-3 text-base leading-relaxed text-gray-600">{book.subtitle}</p>
                )}
                <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                  {book.publishedDate
                    ? new Date(book.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })
                    : 'Forthcoming'}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        // Not a "no books" state — there are two. It is the state where this
        // page could not read them, so it points at the one URL that renders
        // without Sanity rather than telling a reader there is nothing here.
        <p className="mt-14 text-gray-600">
          The book list is briefly unavailable.{' '}
          <Link href="/book" className="underline hover:text-gray-900 transition-colors">
            The Lead Buyer&apos;s Playbook
          </Link>{' '}
          is here in the meantime.
        </p>
      )}
    </div>
  )
}
