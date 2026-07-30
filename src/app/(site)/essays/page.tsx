import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import type { PostSummary } from '@/sanity/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Essays',
  description:
    'First-person accounts from 30+ years building, buying, and selling consumer-direct leads — DeepGreen Bank, EquityOnline at Quicken Loans, Kaleidico, SpringEQ.',
  alternates: { canonical: '/essays' },
}

export default async function EssaysPage() {
  let posts: PostSummary[] = []
  try {
    const { data } = await sanityFetch({ query: POSTS_QUERY, params: { limit: 50 } })
    posts = (data || []) as PostSummary[]
  } catch {
    // Sanity not configured yet
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Essays</h1>
        <p className="mt-4 text-lg text-gray-600">
          First-person accounts from 30+ years building, buying, and selling the
          consumer-direct lead. Published when there&apos;s something only I can say.
        </p>
      </header>

      {posts.length > 0 ? (
        <ol className="mt-14 divide-y divide-gray-200 border-t border-gray-200">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/essays/${post.slug}`}
                className="group block py-8 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#B8960A] transition-colors sm:text-2xl">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {post.excerpt}
                  </p>
                )}
                {post.publishedAt && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-16 rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <p className="text-gray-600">No essays published yet.</p>
        </div>
      )}
    </div>
  )
}
