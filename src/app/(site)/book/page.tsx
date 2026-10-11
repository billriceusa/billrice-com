import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BOOKS, buyLabel, statusLabel } from '@/lib/books'
import { BILL_RICE_SAME_AS } from '@/lib/identity'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Books by Bill Rice — The Lead Buyer\'s Playbook and Sales Team of One. Thirty years of buying, generating, and converting the consumer-direct lead, written down.',
  alternates: { canonical: '/book' },
}

/** Bill's Amazon Author Central page, already canonical in the identity set. */
const AMAZON_AUTHOR_URL = BILL_RICE_SAME_AS.find((url) => url.includes('amazon.com/stores/author'))

/**
 * The library.
 *
 * /book is the singular URL this has always lived at — it is in the nav, the
 * sitemap and llms.txt — so it keeps the URL and becomes the shelf rather than
 * one book's page. Individual books hang off it at /book/<slug>.
 *
 * It is deliberately not a reading surface. The full text of both books lives
 * off-domain (leadbuyersplaybook.com, salesteamofone.com); this page exists to
 * introduce the author and sell the books, and each book's page teases a few
 * chapters rather than reproducing them.
 */
export default function BookLibraryPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Author profile */}
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <Image
              src="/bill-rice-headshot.jpg"
              alt="Bill Rice"
              width={160}
              height={160}
              className="rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover shrink-0 mx-auto sm:mx-0"
              priority
            />
            <div>
              <p className="text-sm font-semibold text-[#E6BB00] uppercase tracking-wide">
                Books by
              </p>
              <h1 className="mt-1 text-4xl font-bold text-gray-900">Bill Rice</h1>
              <p className="mt-4 text-lg text-gray-600">
                I&apos;ve stood on all four sides of the consumer-direct lead — I built the software
                that managed it, generated it as an agency, bought it as a lender with my own P&amp;L,
                and now write about what that taught me. Both books come out of work I actually did,
                not research I did about other people&apos;s.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {AMAZON_AUTHOR_URL && (
                  <a
                    href={AMAZON_AUTHOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-black transition-colors"
                  >
                    Amazon Author Central
                  </a>
                )}
                <Link
                  href="/about"
                  className="text-gray-700 underline hover:text-black transition-colors"
                >
                  Full background
                </Link>
                <Link
                  href="/essays"
                  className="text-gray-700 underline hover:text-black transition-colors"
                >
                  Essays
                </Link>
              </div>
            </div>
          </div>

          {/* The shelf */}
          <div className="mt-16 space-y-10">
            {BOOKS.map((book) => (
              <article
                key={book.slug}
                className="flex flex-col sm:flex-row gap-6 sm:gap-8 border-t border-gray-200 pt-10"
              >
                <Link href={`/book/${book.slug}`} className="shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={book.cover.src}
                    alt={book.cover.alt}
                    width={book.cover.width}
                    height={book.cover.height}
                    className="w-36 h-auto rounded-lg shadow-md border border-gray-200 transition-transform hover:scale-[1.02]"
                  />
                </Link>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {statusLabel(book)}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    <Link
                      href={`/book/${book.slug}`}
                      className="hover:text-[#B8960A] transition-colors"
                    >
                      {book.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-gray-500">{book.subtitle}</p>
                  <p className="mt-4 text-gray-600">{book.blurb}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {book.amazonUrl && (
                      <a
                        href={book.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-2.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
                      >
                        {buyLabel(book)}
                      </a>
                    )}
                    <Link
                      href={`/book/${book.slug}`}
                      className="text-gray-700 underline hover:text-black transition-colors"
                    >
                      What&apos;s inside
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
