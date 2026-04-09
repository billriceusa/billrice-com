import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import type { PostDetail } from '@/sanity/lib/types'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/json-ld'

// Allow dynamic rendering for new posts not in the static build
export const dynamicParams = true
// Revalidate every hour so new posts appear without a full redeploy
export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: POST_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Array<{ slug: string }>) || []).map((post) => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  const post = data as PostDetail | null
  if (!post) return {}

  const baseUrl = 'https://billrice.com'
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/og-image.jpg`

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { images: [{ url: ogImage, width: 1200, height: 630 }] },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  })
  const post = data as PostDetail | null

  if (!post) notFound()

  const baseUrl = 'https://billrice.com'

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={articleJsonLd({
          title: post.title || '',
          description: post.excerpt || '',
          url: `${baseUrl}/blog/${post.slug}`,
          imageUrl: post.mainImage?.asset
            ? urlFor(post.mainImage).width(1200).height(630).url()
            : undefined,
          publishedAt: post.publishedAt || '',
          authorName: post.author?.name || 'Bill Rice',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title || '', url: `${baseUrl}/blog/${post.slug}` },
        ])}
      />

      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/blog" className="hover:text-black transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 mb-4">
          {post.categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="rounded-full bg-[#FFD000]/10 px-3 py-1 text-xs font-medium text-[#B8960A] hover:bg-[#FFD000]/20 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
        {post.title}
      </h1>

      <div className="mt-6 flex items-center gap-4">
        {post.author?.image && (
          <Image
            src={urlFor(post.author.image).width(40).height(40).url()}
            alt={post.author.name || ''}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          {post.author && (
            <span className="text-sm font-medium text-gray-900">
              {post.author.name}
            </span>
          )}
          {post.publishedAt && (
            <p className="text-xs text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {post.mainImage?.asset && (
        <div className="mt-8 overflow-hidden rounded-xl">
          <Image
            src={urlFor(post.mainImage).width(960).height(540).url()}
            alt={post.mainImage.alt || ''}
            width={960}
            height={540}
            className="w-full"
            priority
          />
        </div>
      )}

      {post.body && (
        <div className="mt-10">
          <PortableText value={post.body} />
        </div>
      )}

      {post.author && (
        <div className="mt-16 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-4">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(56).height(56).url()}
                alt={post.author.name || ''}
                width={56}
                height={56}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <span className="font-semibold text-gray-900">
                {post.author.name}
              </span>
              <p className="text-xs text-[#E6BB00] font-medium mt-0.5">30+ years in B2B marketing &amp; lead generation</p>
              {post.author.bio && (
                <p className="text-sm text-gray-600 mt-2">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
