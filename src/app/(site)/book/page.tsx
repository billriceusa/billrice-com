import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { BOOK_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { BookDetail, type BookFallback } from '@/components/book-detail'
import { AMAZON_LBP_URL, LEAD_BUYERS_PLAYBOOK_SLUG } from '@/lib/books'
import type { BookDetail as Book } from '@/sanity/lib/types'

export const metadata: Metadata = {
  title: "The Lead Buyer's Playbook",
  description:
    'The enterprise guide to buying and converting leads profitably. By Bill Rice.',
  alternates: { canonical: '/book' },
}

/**
 * Everything on this page that is specific to the Playbook. It stays here
 * rather than in the shared component because this page is the Playbook's page
 * — it is in the nav, in the sitemap and in llms.txt under that name — and it
 * has to render correctly whether or not Sanity answers.
 */
const PLAYBOOK_FALLBACK: BookFallback = {
  title: "The Lead Buyer's Playbook",
  subtitle: 'The Enterprise Guide to Buying and Converting Leads Profitably',
  description:
    'Stop treating lead generation as a procurement problem. Learn the systematic approach that transforms lead buying from a cost center into a competitive advantage. Drawing on 30+ years of experience in lead generation and mortgage lending, this book covers strategic foundations, risk management, operational excellence, and financial intelligence for enterprise lead acquisition.',
  publishedDate: '2025-11',
  dateLabel: 'November 2025',
  freeReadUrl: 'https://leadbuyersplaybook.com',
  purchase: { url: AMAZON_LBP_URL, label: 'Buy on Amazon' },
}

export default async function BookPage() {
  // Fetched by slug, not by position. This page's title, canonical tag and Book
  // JSON-LD all name the Playbook, so it must keep resolving to the Playbook
  // once the other two books have documents of their own.
  let book: Book | null = null
  try {
    const { data } = await sanityFetch({
      query: BOOK_BY_SLUG_QUERY,
      params: { slug: LEAD_BUYERS_PLAYBOOK_SLUG },
    })
    book = data as Book | null
  } catch {
    // Sanity unreachable — the fallbacks below carry the page.
  }

  return (
    <>
      <BookDetail book={book} canonicalPath="/book" fallback={PLAYBOOK_FALLBACK} />

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Second book */}
          <div className="bg-gray-50 border border-gray-200 border-l-4 border-l-black rounded-lg p-7">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Also from Bill Rice · Free chapters available now
            </p>
            <h2 className="text-2xl font-bold text-gray-900">Sales Team of One</h2>
            <p className="mt-1 text-gray-500">
              How to Stay Irreplaceable When AI Comes for the Sales Team
            </p>
            <p className="mt-4 text-gray-600">
              The Playbook is about buying the lead. This one is about who is left to work it — and how to stay the
              person who can, while the org around the seller collapses into software.
            </p>
            <a
              href="https://salesteamofone.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="Read the opening of Sales Team of One free (opens in new tab)"
            >
              Read the Opening — salesteamofone.com
            </a>
          </div>

          {/* The library's only inbound link until the nav moves to it. An
              orphaned /books would be a page no reader and no crawler reaches
              from anywhere on the site. */}
          <p className="mt-8 text-center text-sm text-gray-500">
            <Link href="/books" className="underline hover:text-gray-900 transition-colors">
              All books by Bill Rice
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
