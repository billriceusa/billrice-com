import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { ESSAYS_QUERY } from '@/sanity/lib/queries'
import type { EssaySummary } from '@/sanity/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Essays',
  description:
    'A small set of durable essays on lead generation, fintech, and where the business of selling is going — the pieces Bill Rice wanted to argue rather than report.',
  alternates: { canonical: '/essays' },
}

export default async function EssaysPage() {
  let essays: EssaySummary[] = []
  try {
    const res = await sanityFetch({ query: ESSAYS_QUERY })
    essays = (res.data || []) as EssaySummary[]
  } catch {
    // Sanity unavailable — render the empty state rather than failing the route
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Essays
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          A small number of pieces meant to hold up over time — arguments about
          where lead generation, fintech, and selling itself are going. Not a
          feed. If you want the running commentary, that&apos;s the{' '}
          <Link href="/blog" className="text-black underline underline-offset-4">
            blog
          </Link>
          .
        </p>
      </header>

      {essays.length > 0 ? (
        <ul className="mt-14 divide-y divide-gray-200 border-t border-gray-200">
          {essays.map((essay) => (
            <li key={essay._id}>
              <Link
                href={`/essays/${essay.slug}`}
                className="group block py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-4"
              >
                <h2 className="text-2xl font-semibold leading-snug text-gray-900 group-hover:text-black">
                  <span className="bg-gradient-to-r from-[#FFD000] to-[#FFD000] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                    {essay.title}
                  </span>
                </h2>
                {essay.standfirst && (
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {essay.standfirst}
                  </p>
                )}
                <span className="mt-4 inline-block text-sm font-medium text-[#B8960A]">
                  Read the essay &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-14 rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <p className="text-gray-600">No essays published yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Essays are managed in the{' '}
            <Link href="/studio" className="text-black underline">
              Sanity Studio
            </Link>{' '}
            under &ldquo;Essay&rdquo;.
          </p>
        </div>
      )}
    </div>
  )
}
