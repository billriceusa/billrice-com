import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { PROJECTS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Authority-driven education platforms and resources built by Bill Rice.',
  alternates: { canonical: '/projects' },
}

type Project = {
  _id: string
  name: string | null
  slug: string | null
  description: string | null
  url: string | null
}

export default async function ProjectsPage() {
  let projects: Project[] = []
  try {
    const { data } = await sanityFetch({ query: PROJECTS_QUERY })
    projects = (data || []) as Project[]
  } catch {
    // fallback
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
        <p className="mt-4 text-lg text-gray-600">
          Authority-driven education platforms across lead generation, real estate investing, and crypto lending.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {project.name}
            </h2>
            {project.description && (
              <p className="text-gray-600 mb-4">{project.description}</p>
            )}
            <div className="flex gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className="text-black font-medium underline hover:text-[#E6BB00] transition-colors"
              >
                Learn more
              </Link>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-500 hover:text-black font-medium transition-colors"
                >
                  Visit site
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
