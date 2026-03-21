import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_BY_CATEGORY_SLUG_QUERY, CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary, Category } from '@/sanity/lib/types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: CATEGORIES_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Category[]) || []).map((cat) => ({
      slug: cat.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: CATEGORIES_QUERY, stega: false })
  const categories = (data || []) as Category[]
  const category = categories.find((c) => c.slug === slug)

  return {
    title: category?.title ? `${category.title} Articles` : 'Category',
    description: category?.description || `Articles about ${category?.title || slug}`,
    alternates: { canonical: `/blog/category/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  let posts: PostSummary[] = []
  let categories: Category[] = []

  try {
    const [postsRes, catsRes] = await Promise.all([
      sanityFetch({ query: POSTS_BY_CATEGORY_SLUG_QUERY, params: { categorySlug: slug } }),
      sanityFetch({ query: CATEGORIES_QUERY }),
    ])
    posts = (postsRes.data || []) as PostSummary[]
    categories = (catsRes.data || []) as Category[]
  } catch {
    // fallback
  }

  const currentCategory = categories.find((c) => c.slug === slug)

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/blog" className="hover:text-black transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{currentCategory?.title || slug}</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">
          {currentCategory?.title || slug}
        </h1>
        {currentCategory?.description && (
          <p className="mt-4 text-lg text-gray-600">{currentCategory.description}</p>
        )}
      </div>

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
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                )}
                {post.publishedAt && (
                  <p className="mt-4 text-xs text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center rounded-xl border border-dashed border-gray-300 bg-white py-16">
          <p className="text-gray-600">No posts in this category yet.</p>
          <Link href="/blog" className="mt-4 inline-block text-sm text-black underline">
            View all posts
          </Link>
        </div>
      )}
    </div>
  )
}
