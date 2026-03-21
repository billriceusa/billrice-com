import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { COMPANY_BY_SLUG_QUERY, COMPANY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'

type Props = { params: Promise<{ slug: string }> }

type Company = {
  _id: string
  name: string | null
  slug: string | null
  description: string | null
  url: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
}

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({ query: COMPANY_SLUGS_QUERY, perspective: 'published', stega: false })
    return ((data as Array<{ slug: string }>) || []).map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: COMPANY_BY_SLUG_QUERY, params: { slug }, stega: false })
  const company = data as Company | null
  if (!company) return {}
  return {
    title: company.name,
    description: company.description,
    alternates: { canonical: `/companies/${slug}` },
  }
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: COMPANY_BY_SLUG_QUERY, params: { slug } })
  const company = data as Company | null

  if (!company) notFound()

  const baseUrl = 'https://billrice.com'

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: company.name || '', url: `${baseUrl}/companies/${company.slug}` },
        ])}
      />

      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{company.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{company.name}</h1>

      {company.description && (
        <p className="mt-4 text-lg text-gray-600">{company.description}</p>
      )}

      {company.url && (
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Visit {company.name}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}

      {company.body && (
        <div className="mt-10">
          <PortableText value={company.body} />
        </div>
      )}
    </div>
  )
}
