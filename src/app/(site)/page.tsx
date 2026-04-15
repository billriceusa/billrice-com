import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import {
  personStructuredData,
  websiteStructuredData,
  organizationStructuredData,
  professionalServiceStructuredData,
  bookStructuredData,
} from '@/lib/structured-data'
import { sanityFetch } from '@/sanity/lib/live'
import {
  SITE_SETTINGS_QUERY,
  COMPANIES_QUERY,
  PROJECTS_QUERY,
  TOOLS_QUERY,
} from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'

type SiteSettings = {
  heroTitle: string | null
  heroTagline: string | null
  heroSubtext: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aboutBio: any
  socialLinks: {
    linkedin?: string | null
    twitter?: string | null
    youtube?: string | null
  } | null
}

type Company = {
  _id: string
  name: string | null
  slug: string | null
  description: string | null
  url: string | null
}

type Project = {
  _id: string
  name: string | null
  slug: string | null
  description: string | null
  url: string | null
}

type Tool = {
  _id: string
  name: string | null
  description: string | null
  url: string | null
  category: string | null
  price: string | null
}

const FALLBACK_COMPANIES: Company[] = [
  {
    _id: 'f-kaleidico',
    name: 'Kaleidico',
    slug: 'kaleidico',
    description:
      'High-performance B2C lead generation agency helping mortgage lenders, law firms, and senior living communities build sustainable, scalable sales pipelines.',
    url: 'https://kaleidico.com/',
  },
  {
    _id: 'f-brsg',
    name: 'Bill Rice Strategy Group',
    slug: 'bill-rice-strategy-group',
    description:
      'B2B consultancy helping fintech founders and marketing leaders replace guesswork with data-driven frameworks that generate predictable revenue.',
    url: 'https://billricestrategy.com/',
  },
  {
    _id: 'f-vv',
    name: 'Verified Vector',
    slug: 'verified-vector',
    description:
      'Programmatic SEO and AI marketing agency for fintech companies. Compliance-ready content and marketing systems at scale.',
    url: 'https://verifiedvector.com/',
  },
]

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'f-tlb',
    name: 'The Lead Brief',
    slug: 'the-lead-brief',
    description:
      'Weekly newsletter and podcast on lead generation strategy. Tactics for buying, generating, and converting more leads.',
    url: 'https://theleadbrief.com/',
  },
  {
    _id: 'f-als',
    name: 'Aged Lead Sales',
    slug: 'aged-lead-sales',
    description:
      'Sales training and education platform for working aged leads. Playbooks, calculators, and industry-specific strategies for insurance, mortgage, legal, and solar professionals.',
    url: 'https://agedleadsales.com/',
  },
  {
    _id: 'f-htwl',
    name: 'How to Work Leads',
    slug: 'how-to-work-leads',
    description:
      'Practical strategies and proven techniques for converting leads into customers, from first contact to close.',
    url: 'https://www.howtoworkleads.com/',
  },
  {
    _id: 'f-pih',
    name: 'ProInvestorHub',
    slug: 'proinvestorhub',
    description:
      'Real estate investing education platform with expert guides, interactive calculators, market data for 50+ cities, and a weekly investor newsletter.',
    url: 'https://proinvestorhub.com/',
  },
  {
    _id: 'f-clh',
    name: 'CryptoLendingHub',
    slug: 'cryptolendinghub',
    description:
      'Data-driven crypto lending education with platform reviews, rate comparisons, risk assessments, and DeFi protocol analysis. No hype — just data.',
    url: 'https://cryptolendinghub.com/',
  },
]

const FALLBACK_TOOLS: Tool[] = [
  { _id: 'f-wmss', name: 'WriteMySalesScript', description: 'AI-powered sales script generation for B2B teams', url: 'https://writemysalesscript.com/', category: 'ai-tool', price: 'Free' },
  { _id: 'f-va', name: 'VisibilityAnalyzer', description: 'SEO and LLM visibility analysis and optimization', url: 'https://visibilityanalyzer.com/', category: 'ai-tool', price: 'Free' },
  { _id: 'f-b2b', name: 'B2B Marketing Battlecard', description: 'Competitive intelligence and strategic insights', url: 'https://b2bmarketingbattlecard.com/', category: 'ai-tool', price: 'Free' },
  { _id: 'f-dlg', name: 'DemoLeadGen', description: 'Interactive lead generation demo platform', url: 'https://demoleadgen.com/', category: 'ai-tool', price: 'Free' },
  { _id: 'f-90d', name: '90-Day B2B Growth Toolkit', description: 'Complete Notion-based growth system for B2B founders and lean GTM teams', url: 'https://billriceconsulting.gumroad.com/l/90dayB2Btoolkit', category: 'playbook', price: '$9' },
  { _id: 'f-scripts', name: 'Complete Sales Scripts Course', description: 'Step-by-step guide to designing, writing, and optimizing sales scripts for consistent results', url: 'https://billriceconsulting.gumroad.com/l/sales-scripts', category: 'playbook', price: '$9' },
  { _id: 'f-aged', name: 'Aged Leads Sales Playbook', description: 'Transform dormant aged leads into active customers with proven scripts and strategies', url: 'https://billriceconsulting.gumroad.com/l/aged-leads-scripts', category: 'playbook', price: '$9' },
  { _id: 'f-mortgage', name: 'Mortgage Sales System', description: 'Complete mortgage sales system with scripts, strategies, and lead management automation', url: 'https://billriceconsulting.gumroad.com/l/mortgage-scripts', category: 'playbook', price: '$9' },
]

const FALLBACK_HERO_TITLE = 'Bill Rice'
const FALLBACK_HERO_TAGLINE = 'Fintech Marketing Pioneer & Lead Generation Strategist'
const FALLBACK_HERO_SUBTEXT =
  '30+ years building lead generation platforms and revenue systems for financial services companies. Coined "lead management." Built platforms at DeepGreen Bank and Quicken Loans.'

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

export default async function HomePage() {
  let settings: SiteSettings | null = null
  let companies: Company[] = []
  let projects: Project[] = []
  let tools: Tool[] = []
  try {
    const [s, c, p, t] = await Promise.all([
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
      sanityFetch({ query: COMPANIES_QUERY }),
      sanityFetch({ query: PROJECTS_QUERY }),
      sanityFetch({ query: TOOLS_QUERY }),
    ])
    settings = s.data as SiteSettings | null
    companies = (c.data as Company[]) ?? []
    projects = (p.data as Project[]) ?? []
    tools = (t.data as Tool[]) ?? []
  } catch {
    // fall through to fallbacks
  }

  if (companies.length === 0) companies = FALLBACK_COMPANIES
  if (projects.length === 0) projects = FALLBACK_PROJECTS
  if (tools.length === 0) tools = FALLBACK_TOOLS

  const heroTitle = settings?.heroTitle || FALLBACK_HERO_TITLE
  const heroTagline = settings?.heroTagline || FALLBACK_HERO_TAGLINE
  const heroSubtext = settings?.heroSubtext || FALLBACK_HERO_SUBTEXT
  const linkedin = settings?.socialLinks?.linkedin || 'https://www.linkedin.com/in/billrice/'
  const twitter = settings?.socialLinks?.twitter || 'https://twitter.com/billrice'
  const youtube = settings?.socialLinks?.youtube || 'https://www.youtube.com/@billricestrategy'

  const aiTools = tools.filter((t) => t.category === 'ai-tool')
  const playbooks = tools.filter((t) => t.category === 'playbook')

  const combinedStructuredData = [
    personStructuredData,
    websiteStructuredData,
    organizationStructuredData,
    professionalServiceStructuredData,
    bookStructuredData,
  ]

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedStructuredData) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#FFD000] text-black p-2 z-50"
      >
        Skip to main content
      </a>

      {/* Hero */}
      <header className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            {heroTitle}
          </h1>
          <p className="mt-6 text-2xl text-gray-600 max-w-3xl mx-auto">{heroTagline}</p>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{heroSubtext}</p>

          <nav className="mt-10 flex flex-col sm:flex-row justify-center gap-4" aria-label="Primary navigation">
            <a
              href="https://theleadbrief.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2 text-center"
              aria-label="Subscribe to The Lead Brief newsletter (opens in new tab)"
            >
              Subscribe to The Lead Brief
            </a>
            <a
              href="/contact"
              className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
              aria-label="Contact Bill Rice"
            >
              Contact Bill Rice
            </a>
          </nav>
        </div>
      </header>

      {/* Book */}
      <main id="main-content">
        <section className="py-16 bg-gray-50" aria-labelledby="book-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-sm font-semibold text-[#E6BB00] uppercase tracking-wide mb-2">New Book</p>
                <h2 id="book-heading" className="text-3xl font-bold text-gray-900">
                  The Lead Buyer&apos;s Playbook
                </h2>
                <p className="mt-2 text-lg text-gray-500">The Enterprise Guide to Buying and Converting Leads Profitably</p>
              </div>
              <div className="bg-white p-8 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                <p className="text-lg text-gray-600 mb-6">
                  Stop treating lead generation as a procurement problem. Learn the systematic approach that transforms lead buying from a cost center into a competitive advantage. Drawing on 30+ years of experience in lead generation and mortgage lending, this book covers strategic foundations, risk management, operational excellence, and financial intelligence for enterprise lead acquisition.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://www.leadbuyerplaybook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2 text-center"
                  >
                    Read Free Online
                  </a>
                  <a
                    href="https://www.amazon.com/dp/B0DRBK6QJZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black hover:bg-black hover:text-white text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                  >
                    Buy on Amazon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About teaser */}
        <section id="about" className="py-16 bg-white" aria-labelledby="about-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="about-heading" className="text-3xl font-bold text-gray-900">About Bill Rice</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  {settings?.aboutBio ? (
                    <div className="prose prose-lg max-w-none text-gray-600">
                      <PortableText value={settings.aboutBio} />
                    </div>
                  ) : (
                    <>
                      <p className="text-lg text-gray-600 mb-6">
                        I started as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations, then became Employee #7 at DeepGreen Bank&mdash;one of the first internet-only banks. At Quicken Loans, I built EquityOnline, their first true online lending platform.
                      </p>
                      <p className="text-lg text-gray-600 mb-6">
                        I coined the term &ldquo;lead management&rdquo; to differentiate platforms that work leads from CRMs that manage customers. I authored the original Wikipedia page for the category. The frameworks I built are now industry standard.
                      </p>
                      <p className="text-lg text-gray-600 mb-6">
                        Today I run three companies&mdash;Kaleidico, Bill Rice Strategy Group, and Verified Vector&mdash;and operate a portfolio of authority content sites across lead generation, real estate investing, and fintech.
                      </p>
                    </>
                  )}
                  <p className="mt-4">
                    <Link href="/about" className="text-black font-medium underline hover:text-gray-700">
                      Read the full story &rarr;
                    </Link>
                  </p>
                </div>
                <div className="order-1 md:order-2 text-center">
                  <div className="w-64 h-64 mx-auto">
                    <Image
                      src="/bill-rice-headshot.jpg"
                      alt="Bill Rice - Professional headshot showing a business leader in professional attire"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                      priority
                      sizes="(max-width: 768px) 256px, 256px"
                    />
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/now"
                      className="text-black hover:text-black font-medium inline-flex items-center underline"
                    >
                      See what I&apos;m working on now
                      <span className="ml-1" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Companies */}
        <section className="py-16 bg-gray-50" aria-labelledby="companies-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="companies-heading" className="text-3xl font-bold text-gray-900">My Companies</h2>
              <p className="mt-4 text-lg text-gray-600">
                Strategic marketing solutions across multiple ventures
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {companies.map((company) => (
                <article
                  key={company._id}
                  className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-lg hover:border-l-[#E6BB00] transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{company.name}</h3>
                  {company.description && <p className="text-gray-600 mb-4">{company.description}</p>}
                  {company.url && (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-black hover:text-black font-medium underline"
                      aria-label={`Visit ${company.name} website (opens in new tab)`}
                    >
                      Visit {company.name}
                      <ExternalLinkIcon />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 bg-white" aria-labelledby="projects-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="projects-heading" className="text-3xl font-bold text-gray-900">My Projects</h2>
              <p className="mt-4 text-lg text-gray-600">
                Authority-driven education platforms and resources across lead generation, real estate investing, and crypto lending
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg bg-gray-50 hover:shadow-lg hover:border-l-[#E6BB00] transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.name}</h3>
                  {project.description && <p className="text-gray-600 mb-4">{project.description}</p>}
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-black hover:text-black font-medium underline"
                      aria-label={`Visit ${project.name} website (opens in new tab)`}
                    >
                      Visit {project.name}
                      <ExternalLinkIcon />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Playbooks */}
        <section className="py-16 bg-gray-50" aria-labelledby="tools-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="tools-heading" className="text-3xl font-bold text-gray-900">Tools & Resources</h2>
              <p className="mt-4 text-lg text-gray-600">Free AI-powered tools and strategic playbooks</p>
            </div>
            <div className="max-w-4xl mx-auto">
              {aiTools.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Free AI Tools</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {aiTools.map((tool) => (
                      <div
                        key={tool._id}
                        className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{tool.name}</h4>
                        {tool.description && <p className="text-sm text-gray-600 mb-4">{tool.description}</p>}
                        {tool.url && (
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-black hover:text-black font-medium underline"
                          >
                            Visit {tool.name}
                            <ExternalLinkIcon />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {playbooks.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Playbooks</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {playbooks.map((p) => (
                      <a
                        key={p._id}
                        href={p.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{p.name}</h4>
                        {p.description && <p className="text-sm text-gray-600 mb-3">{p.description}</p>}
                        <span className="text-black font-medium underline">
                          {p.price ? `Get it for ${p.price} →` : 'Get it →'}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 bg-white" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="contact-heading" className="text-3xl font-bold text-gray-900 mb-8">Stay Connected</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">The Lead Brief</h3>
                  <p className="text-gray-600 mb-6">
                    Weekly tactics for buying, generating, and converting more leads. Newsletter and podcast for founders, agency owners, and sales teams.
                  </p>
                  <a
                    href="https://theleadbrief.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
                  >
                    Subscribe to The Lead Brief
                  </a>
                </div>
                <div className="p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Get In Touch</h3>
                  <p className="text-gray-600 mb-6">
                    Interested in strategic consulting or speaking engagements? Let&apos;s discuss how we can work together.
                  </p>
                  <a
                    href="mailto:bill@billrice.com"
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Contact Bill Rice
                  </a>
                </div>
              </div>
              <div className="flex justify-center gap-6 flex-wrap">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#FFD000] transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#FFD000] transition-colors" aria-label="X (Twitter)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#FFD000] transition-colors" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
