import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'
import { JsonLd, breadcrumbJsonLd } from '@/components/json-ld'

type Props = { params: Promise<{ slug: string }> }

type Project = {
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
    const { data } = await sanityFetch({ query: PROJECT_SLUGS_QUERY, perspective: 'published', stega: false })
    return ((data as Array<{ slug: string }>) || []).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug }, stega: false })
  const project = data as Project | null
  if (!project) return {}
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: PROJECT_BY_SLUG_QUERY, params: { slug } })
  const project = data as Project | null

  if (!project) notFound()

  const baseUrl = 'https://billrice.com'

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: baseUrl },
          { name: 'Projects', url: `${baseUrl}/projects` },
          { name: project.name || '', url: `${baseUrl}/projects/${project.slug}` },
        ])}
      />

      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/projects" className="hover:text-black transition-colors">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{project.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{project.name}</h1>

      {project.description && (
        <p className="mt-4 text-lg text-gray-600">{project.description}</p>
      )}

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Visit {project.name}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}

      {project.body && (
        <div className="mt-10">
          <PortableText value={project.body} />
        </div>
      )}
    </div>
  )
}
