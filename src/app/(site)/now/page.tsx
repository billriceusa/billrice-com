import Link from 'next/link'
import { Metadata } from 'next'
import Script from 'next/script'
import { breadcrumbHomeToNow } from '@/lib/structured-data'
import { sanityFetch } from '@/sanity/lib/live'
import { NOW_PAGE_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'

export const metadata: Metadata = {
  title: "What I'm Working On Now",
  description: "Current projects and strategic priorities for Bill Rice - B2B Marketing Strategy Expert. Updated regularly with latest initiatives in AI-powered marketing, fintech consulting, and business strategy.",
  keywords: ["Bill Rice current projects", "AI marketing", "fintech consulting", "B2B strategy", "marketing automation", "business consulting"],
  openGraph: {
    title: "What I'm Working On Now | Bill Rice",
    description: "Current projects and strategic priorities for Bill Rice - B2B Marketing Strategy Expert. Updated regularly with latest initiatives.",
    type: 'website',
    url: 'https://billrice.com/now',
  },
  twitter: {
    title: "What I'm Working On Now | Bill Rice",
    description: "Current projects and strategic priorities for Bill Rice - B2B Marketing Strategy Expert.",
  },
  alternates: {
    canonical: 'https://billrice.com/now',
  },
}

type NowPage = {
  lastUpdated: string | null
  priorities: Array<{
    title: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: any
    _key?: string
  }> | null
  speakingTopics: string[] | null
  consultingAvailability: string | null
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export default async function NowPage() {
  let now: NowPage | null = null
  try {
    const { data } = await sanityFetch({ query: NOW_PAGE_QUERY })
    now = data as NowPage | null
  } catch {
    // fallback below
  }

  const priorities = now?.priorities ?? []
  const speakingTopics = now?.speakingTopics ?? []
  const consultingAvailability = now?.consultingAvailability ?? null
  const lastUpdated = now?.lastUpdated ?? null

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs JSON-LD */}
      <Script id="breadcrumbs-now" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbHomeToNow) }} />

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#FFD000] text-black p-2 z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <nav className="mb-4" aria-label="Breadcrumb">
              <Link
                href="/"
                className="text-black hover:text-black font-medium inline-flex items-center underline"
                aria-label="Return to homepage"
              >
                <span aria-hidden="true">←</span>
                <span className="ml-1">Back to BillRice.com</span>
              </Link>
            </nav>
            <h1 className="text-4xl font-bold text-gray-900">
              What I&apos;m Working On Now
            </h1>
            {lastUpdated && (
              <p className="mt-4 text-lg text-gray-600">
                <time dateTime={lastUpdated}>Last updated: {formatDate(lastUpdated)}</time>
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Current Priorities */}
            {priorities.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Strategic Priorities</h2>
                <div className="space-y-6">
                  {priorities.map((p, i) => (
                    <div key={p._key ?? i}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3>
                      {p.description && (
                        <div className="prose prose-gray max-w-none text-gray-600">
                          <PortableText value={p.description} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speaking & Consulting */}
            {(speakingTopics.length > 0 || consultingAvailability) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Speaking & Consulting</h2>
                <div className="space-y-4">
                  {speakingTopics.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Available Topics</h3>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        {speakingTopics.map((topic) => (
                          <li key={topic}>• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {consultingAvailability && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Consulting Availability</h3>
                      <p className="text-gray-600 whitespace-pre-line">{consultingAvailability}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-l-[#FFD000] text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                Interested in working together or have questions about any of these projects?
              </p>
              <a
                href="mailto:bill@billrice.com"
                className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
              >
                Contact Bill Rice
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
