import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY, CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary, Category } from '@/sanity/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert articles on lead generation, B2B marketing strategy, fintech, and building predictable revenue pipelines.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  let posts: PostSummary[] = []
  let categories: Category[] = []
  try {
    const [postsRes, catsRes] = await Promise.all([
      sanityFetch({ query: POSTS_QUERY, params: { limit: 50 } }),
      sanityFetch({ query: CATEGORIES_QUERY }),
    ])
    posts = (postsRes.data || []) as PostSummary[]
    categories = (catsRes.data || []) as Category[]
  } catch {
    // Sanity not configured yet
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
        <p className="mt-4 text-lg text-gray-600">
          Insights on lead generation, B2B marketing strategy, and building revenue engines.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 hover:border-[#FFD000] hover:bg-[#FFD000]/10 transition-colors"
            >
              {cat.title}
              {cat.postCount > 0 && (
                <span className="ml-1.5 text-gray-400">({cat.postCount})</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all"
            >
              {post.mainImage?.asset && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(600).height(338).url()}
                    alt={post.mainImage.alt || post.title || ''}
                    width={600}
                    height={338}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                {post.categories && post.categories.length > 0 && (
                  <span className="text-xs font-medium text-[#E6BB00] uppercase tracking-wide">
                    {post.categories[0].title}
                  </span>
                )}
                <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-3">
                  {post.author && (
                    <span className="text-xs font-medium text-gray-900">
                      {post.author.name}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="text-xs text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center rounded-xl border border-dashed border-gray-300 bg-white py-16">
          <p className="text-gray-600">No posts published yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Content is managed through the{' '}
            <Link href="/studio" className="text-black underline">
              Sanity Studio
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
