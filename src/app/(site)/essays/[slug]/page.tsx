import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { ESSAY_BY_SLUG_QUERY, ESSAY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import type { EssayDetail } from '@/sanity/lib/types'
import { JsonLd, essayJsonLd, breadcrumbJsonLd } from '@/components/json-ld'

// New essays should appear without a redeploy, same as posts.
export const dynamicParams = true
export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({
      query: ESSAY_SLUGS_QUERY,
      perspective: 'published',
      stega: false,
    })
    return ((data as Array<{ slug: string }>) || []).map((essay) => ({
      slug: essay.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: ESSAY_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  })
  const essay = data as EssayDetail | null
  if (!essay) return {}

  const baseUrl = 'https://billrice.com'
  const ogImage = essay.ogImage?.asset
    ? urlFor(essay.ogImage).width(1200).height(630).url()
    : `${baseUrl}/og-image.jpg`

  return {
    title: essay.seo?.metaTitle || essay.title || undefined,
    description: essay.seo?.metaDescription || essay.standfirst || undefined,
    alternates: { canonical: `/essays/${slug}` },
    openGraph: {
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  }
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({
    query: ESSAY_BY_SLUG_QUERY,
    params: { slug },
  })
  const essay = data as EssayDetail | null

  if (!essay) notFound()

  const baseUrl = 'https://billrice.com'
  const url = `${baseUrl}/essays/${essay.slug}`

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 lg:px-8">
      <JsonLd
        data={essayJsonLd({
          title: essay.title || '',
          standfirst: essay.standfirst || '',
          url,
          imageUrl: essay.ogImage?.asset
            ? urlFor(essay.ogImage).width(1200).height(630).url()
            : undefined,
          // Real, but deliberately not rendered anywhere on the page.
          publishedAt: essay.publishedAt || undefined,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Essays', url: `${baseUrl}/essays` },
          { name: essay.title || '', url },
        ])}
      />

      <nav className="mb-10 text-sm text-gray-500">
        <Link href="/essays" className="hover:text-black transition-colors">
          Essays
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{essay.title}</span>
      </nav>

      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {essay.title}
      </h1>

      {essay.standfirst && (
        <p className="mt-6 border-l-2 border-[#FFD000] pl-5 text-lg leading-relaxed text-gray-600">
          {essay.standfirst}
        </p>
      )}

      {/* No date, no author block, no share chrome — the argument carries it. */}

      {essay.body && (
        <div className="mt-12">
          <PortableText value={essay.body} />
        </div>
      )}

      <footer className="mt-20 border-t border-gray-200 pt-8">
        <p className="text-sm leading-relaxed text-gray-600">
          Bill Rice has spent 30+ years building lead generation for financial
          services — all four sides of the consumer-direct lead.{' '}
          <Link
            href="/about"
            className="text-black underline underline-offset-4"
          >
            More about that
          </Link>
          , or{' '}
          <Link
            href="/essays"
            className="text-black underline underline-offset-4"
          >
            read the other essays
          </Link>
          .
        </p>
      </footer>
    </article>
  )
}
