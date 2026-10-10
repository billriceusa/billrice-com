import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { BOOK_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'
import { JsonLd } from '@/components/json-ld'
import {
  AMAZON_LBP_URL,
  AMAZON_STOO_URL,
  BROKE_AT_A_MILLION,
  LEAD_BUYERS_PLAYBOOK,
  SALES_TEAM_OF_ONE,
  SERIES_NAME,
  SERIES_PLANNED_VOLUMES,
} from '@/lib/books'

export const metadata: Metadata = {
  title: "The Lead Buyer's Playbook",
  description:
    'The enterprise guide to buying and converting leads profitably. By Bill Rice.',
  alternates: { canonical: '/book' },
}

type Book = {
  _id: string
  title: string | null
  subtitle: string | null
  slug: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any
  author: { name: string | null; bio: string | null } | null
  publishedDate: string | null
  freeReadUrl: string | null
  purchaseLinks: Array<{ platform: string; url: string; label: string; _key: string }> | null
  chapters: Array<{ number: number; title: string; description: string; _key: string }> | null
}

export default async function BookPage() {
  let book: Book | null = null
  try {
    const { data } = await sanityFetch({ query: BOOK_QUERY })
    book = data as Book | null
  } catch {
    // fallback
  }

  const baseUrl = 'https://billrice.com'

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: book?.title || "The Lead Buyer's Playbook",
          alternateName: book?.subtitle || LEAD_BUYERS_PLAYBOOK.subtitle,
          author: { '@type': 'Person', name: 'Bill Rice', url: baseUrl },
          url: `${baseUrl}/book`,
          datePublished: book?.publishedDate || '2025-11',
          bookEdition: 'First Edition',
          bookFormat: 'https://schema.org/EBook',
          description: book?.subtitle || 'The enterprise guide to buying and converting leads profitably.',
          genre: 'Business',
          inLanguage: 'en',
        }}
      />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#E6BB00] uppercase tracking-wide mb-2">Book</p>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {book?.title || "The Lead Buyer's Playbook"}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {book?.subtitle || LEAD_BUYERS_PLAYBOOK.subtitle}
            </p>
            <p className="mt-2 text-gray-400">
              By {book?.author?.name || 'Bill Rice'} &middot; {book?.publishedDate ? new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'November 2025'}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={book?.freeReadUrl || 'https://leadbuyersplaybook.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2 text-center"
            >
              Read Free Online
            </a>
            {book?.purchaseLinks?.map((link) => (
              <a
                key={link._key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
              >
                {link.label || `Buy on ${link.platform}`}
              </a>
            )) || (
              <a
                href={AMAZON_LBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
              >
                Buy on Amazon
              </a>
            )}
          </div>

          {/* Description */}
          {book?.description ? (
            <div className="prose prose-lg max-w-3xl mx-auto mb-16">
              <PortableText value={book.description} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-lg text-gray-600">
                Stop treating lead generation as a procurement problem. Learn the systematic approach that transforms lead buying from a cost center into a competitive advantage. Drawing on 30+ years of experience in lead generation and mortgage lending, this book covers strategic foundations, risk management, operational excellence, and financial intelligence for enterprise lead acquisition.
              </p>
            </div>
          )}

          {/* Chapters */}
          {(book?.chapters && book.chapters.length > 0) && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Chapters</h2>
              <div className="space-y-4">
                {book.chapters.map((chapter) => (
                  <div
                    key={chapter._key}
                    className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-semibold text-[#E6BB00] whitespace-nowrap">
                        Ch. {chapter.number}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                        {chapter.description && (
                          <p className="mt-1 text-sm text-gray-600">{chapter.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Second book */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-gray-50 border border-gray-200 border-l-4 border-l-black rounded-lg p-7">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Also from Bill Rice ·{' '}
                {SALES_TEAM_OF_ONE.status === 'preorder' ? 'Pre-order now' : 'Available now'}
                {SALES_TEAM_OF_ONE.releaseDate
                  ? ` · ships ${new Date(`${SALES_TEAM_OF_ONE.releaseDate}T00:00:00Z`).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}`
                  : ''}
              </p>
              <h2 className="text-2xl font-bold text-gray-900">{SALES_TEAM_OF_ONE.title}</h2>
              <p className="mt-1 text-gray-500">{SALES_TEAM_OF_ONE.subtitle}</p>
              <p className="mt-4 text-gray-600">
                The Playbook is about buying the lead. This one is about who is left to work it — and how to stay the
                person who can, while the org around the seller collapses into software. It is the flagship of{' '}
                {SERIES_NAME}, a planned {SERIES_PLANNED_VOLUMES} short books for the person who is the whole company.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={AMAZON_STOO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                  aria-label="Pre-order Sales Team of One on Amazon (opens in new tab)"
                >
                  Pre-order on Amazon
                </a>
                <a
                  href={SALES_TEAM_OF_ONE.freeReadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black hover:bg-black hover:text-white text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                  aria-label="Read the opening of Sales Team of One free (opens in new tab)"
                >
                  Read the Opening Free
                </a>
              </div>

              {/* Book two. No subtitle and no date on purpose — see books.ts. */}
              <div className="mt-7 border-t border-gray-200 pt-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Next · {SERIES_NAME}, book two · In development
                </p>
                <p className="text-lg font-bold text-gray-900">{BROKE_AT_A_MILLION.title}</p>
                <p className="mt-2 text-gray-600">{BROKE_AT_A_MILLION.blurb}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
