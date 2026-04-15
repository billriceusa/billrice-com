import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import Script from 'next/script'
import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@/components/portable-text'

export const metadata: Metadata = {
  title: 'About Bill Rice | Career, Experience & Expertise',
  description:
    'Bill Rice is a fintech marketing pioneer who coined "lead management," built platforms at DeepGreen Bank and Quicken Loans, and has spent 30+ years building lead generation systems for financial services companies.',
  keywords: [
    'Bill Rice',
    'fintech marketing',
    'lead management',
    'Kaleidico',
    'Bill Rice Strategy Group',
    'DeepGreen Bank',
    'Quicken Loans',
    'lead generation',
    'demand generation',
  ],
  openGraph: {
    title: 'About Bill Rice | Career, Experience & Expertise',
    description:
      'Fintech marketing pioneer. Coined "lead management." Built platforms at DeepGreen Bank and Quicken Loans. 30+ years building lead generation systems.',
    type: 'profile',
    url: 'https://billrice.com/about',
  },
  twitter: {
    title: 'About Bill Rice | Career, Experience & Expertise',
    description:
      'Fintech marketing pioneer. Coined "lead management." 30+ years building lead generation systems for financial services.',
  },
  alternates: {
    canonical: 'https://billrice.com/about',
  },
}

const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://billrice.com/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://billrice.com/about' },
  ],
}

// Fallback content used when Sanity document isn't seeded yet. Kept in sync
// with the initial site copy so the page renders fully even pre-seed.
const FALLBACK_TIMELINE = [
  {
    year: '1992',
    title: 'U.S. Air Force Academy',
    subtitle: 'B.S. Political Science',
    description:
      'Commissioned from the United States Air Force Academy. Served as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), conducting counterespionage operations during the earliest days of the internet.',
  },
  {
    year: '1992-2000',
    title: 'Air Force Intelligence & Information Warfare',
    subtitle: 'USAF, TASC Inc., Iridium Communications',
    description:
      'Served as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), conducting counterespionage operations. Managed information warfare programs at TASC, Inc. and served as Call Intercept System Security Manager at Iridium Communications. Pioneered information warfare operations at the dawn of the internet age.',
  },
  {
    year: '2000-2004',
    title: 'DeepGreen Bank - Employee #7',
    subtitle: 'One of the first internet-only banks',
    description:
      "Joined DeepGreen Bank as Employee #7, one of the earliest internet-only banks in the United States. At operational maturity we were about 80 people running what functionally behaved like a billion-dollar bank — still small by industry standards. Helped launch the industry's first unconditional online HELOC, establishing a template the industry would follow for the next two decades. DeepGreen was sold to LightYear Capital in 2004.",
  },
  {
    year: '2004-2005',
    title: 'Quicken Loans - COO Rock Bank Project → VP, National Home Equity',
    subtitle: 'Built the EquityOnline platform',
    description:
      "Recruited to Quicken Loans (now Rocket Mortgage) in 2004, initially as COO of the Rock Bank project — a federally chartered bank initiative. When that wound down, pivoted to VP of National Home Equity and led the design and build of EquityOnline, Quicken Loans' first true online lending and offer platform. Completed MBA in Marketing at University of Phoenix (2003) during this era.",
  },
  {
    year: '2005',
    title: 'Founded Kaleidico',
    subtitle: 'Lead management software → demand generation agency',
    description:
      'Founded Kaleidico as a lead management software company. Built icoSales, an intelligent lead scoring and distribution platform that competed with Leads360 (later Velocify). Coined "lead management" as a category and authored the original Wikipedia page. After the 2008 mortgage meltdown destroyed the call-center lender client base, pivoted Kaleidico into a demand generation agency serving mortgage lenders, law firms, and senior living communities.',
  },
  {
    year: '2008-2012',
    title: 'Quizzle - Growth Marketing Consultant',
    subtitle: 'Free credit report platform, later acquired by Bankrate',
    description:
      "Served as growth marketing consultant for Quizzle, one of the first free credit report and financial planning platforms. Bankrate later acquired Quizzle to power their customer acquisition and retention strategy.",
  },
  {
    year: '2016-2018',
    title: 'Velocity Lending - Owner & Operator',
    subtitle: 'DTC mortgage lender (proof-of-concept)',
    description:
      'Owned and operated Velocity Lending, a consumer direct (DTC) mortgage lender, alongside Kaleidico. Built as a live proof-of-concept for the Kaleidico playbook: that a small lender could compete alongside the biggest names in the business with first-party lead generation. Also validated that aged leads, worked correctly, can quickly build a large database marketing operation — giving a startup lender a real foundation of leads to nurture, recapture, and generate referrals from.',
  },
  {
    year: '2016',
    title: 'SpringEQ - GTM Strategy & Launch',
    subtitle: 'Home equity lending fintech',
    description:
      'Built the initial go-to-market strategy for SpringEQ. Led the build-out of the website, lead generation systems, and GTM launch, then supported initial operations through the early growth phase.',
  },
  {
    year: '2020',
    title: 'Founded Bill Rice Strategy Group',
    subtitle: 'B2B strategic agency for fintech',
    description:
      'Founded Bill Rice Strategy Group to serve fintech companies — many of them longtime referral partners and friends operating as satellites in the same ecosystem Kaleidico has worked in for two decades. BRSG engages at a strategic level, bringing the systems and processes that fueled Kaleidico\'s growth from bootstrap to acquisition.',
  },
  {
    year: '2024',
    title: 'Founded Verified Vector',
    subtitle: 'AI-first agency',
    description:
      'Founded Verified Vector as a playground and proof-of-concept that an agency can be run largely as an AI-first organization. No employees — just AI agents and me. Every deliverable (strategy, content, presentations, sales, marketing) is produced in code.',
  },
  {
    year: '2025',
    title: "Published The Lead Buyer's Playbook",
    subtitle: 'Enterprise guide to lead buying',
    description:
      "Published The Lead Buyer's Playbook, the enterprise guide to buying and converting leads profitably. Drawing on 30+ years in lead generation, the book covers strategic foundations, vendor management, compliance, financial modeling, and scaling operations.",
  },
  {
    year: '2025-Present',
    title: 'Building Authority Content Portfolio',
    subtitle: 'Niche education and lead generation platforms',
    description:
      'Building and operating a portfolio of authority-driven content sites: AgedLeadSales.com (sales training for aged leads), ProInvestorHub.com (real estate investing education), CryptoLendingHub.com (crypto lending reviews), HowToWorkLeads.com (lead conversion techniques), and DemoLeadGen.com (lead generation demo platform). All built on Next.js and Sanity.io.',
  },
]

const FALLBACK_DIFFERENTIATORS = [
  {
    title: 'Intelligence to Internet',
    description:
      'I went from running counterespionage operations as an AFOSI Special Agent to building one of the first internet banks. The systems thinking and analytical rigor from intelligence work is the foundation of everything I do in marketing.',
  },
  {
    title: 'I Named the Category',
    description:
      'I coined "lead management" as a category and authored the original Wikipedia page. Before that, everyone called these platforms CRMs, even though they were working prospects, not managing customer relationships. The distinction matters because the workflows, metrics, and systems are fundamentally different.',
  },
  {
    title: 'Builder, Not Just Advisor',
    description:
      "I was Employee #7 at DeepGreen Bank. I built EquityOnline at Quicken Loans. I built icoSales from scratch. I built the GTM for SpringEQ. I owned and operated Velocity Lending, a DTC mortgage lender, from 2016 to 2018 to prove the playbook works when I run it myself. I don't just advise — I build the platforms, the campaigns, the systems, and the operations.",
  },
  {
    title: '30+ Years, Same Industry',
    description:
      "I've been in fintech and financial services since the industry's earliest days online. That depth means I understand compliance, regulation, sales cycles, and buyer psychology in ways that generalist marketers simply cannot.",
  },
]

const FALLBACK_EXPERTISE = [
  { area: 'Demand Generation', detail: 'Building scalable, predictable revenue engines for B2B and B2C' },
  { area: 'Lead Management', detail: 'Coined the category. Built the systems. Wrote the definition.' },
  { area: 'Fintech Marketing', detail: 'Mortgage, lending, banking, payments, blockchain, RegTech' },
  { area: 'Go-to-Market Strategy', detail: '120-day sprints from strategy to measurable pipeline' },
  { area: 'Content & SEO', detail: 'Programmatic and editorial content at scale for regulated industries' },
  { area: 'Sales-Marketing Alignment', detail: 'Connecting marketing systems to sales operations and revenue' },
  { area: 'AI-Powered Marketing', detail: 'Compliance-ready AI content and automation systems' },
  { area: 'Startup Traction', detail: 'Pre-revenue to revenue. GTM strategy through initial operations.' },
]

const FALLBACK_EDUCATION = [
  { degree: 'B.S., Political Science', institution: 'United States Air Force Academy', year: '1992' },
  { degree: 'MBA, Marketing', institution: 'University of Phoenix', year: '2003' },
]

const FALLBACK_VENTURES = [
  {
    name: 'Kaleidico',
    role: 'Founder & CRO',
    url: 'https://kaleidico.com/',
    description: "Demand generation agency for mortgage lenders, law firms, and senior living communities. Founded 2005. Following the agency's acquisition and liquidity event, I retained 10% ownership and transitioned into the CRO role, where I continue to lead business development, sales, and marketing strategy and execution.",
  },
  {
    name: 'Bill Rice Strategy Group',
    role: 'Founder & Chief Strategist',
    url: 'https://billricestrategy.com/',
    description: "B2B strategic agency for fintech companies — many of them longtime referral partners and friends who have been satellites in the same ecosystem Kaleidico has worked in for two decades. BRSG helps these clients at a more strategic level.",
  },
  {
    name: 'Verified Vector',
    role: 'Founder',
    url: 'https://verifiedvector.com/',
    description: "AI-first agency — a playground proving that an agency can be run largely as an AI-first organization. No employees. Just AI agents and me. Every deliverable (strategy, content, presentations, sales, marketing) is produced in code.",
  },
]

const FALLBACK_HERO_TAGLINE =
  'Fintech marketing pioneer. Coined "lead management." 30+ years building lead generation platforms and revenue systems for financial services companies.'

type AboutPage = {
  headline: string | null
  heroTagline: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shortVersion: any
  differentiators: Array<{ title: string; description: string }> | null
  timelineEvents: Array<{ year: string; title: string; subtitle: string | null; description: string | null }> | null
  expertiseAreas: Array<{ area: string; detail: string | null }> | null
  education: Array<{ degree: string; institution: string | null; year: string | null }> | null
  currentVentures: Array<{ name: string; role: string | null; url: string | null; description: string | null }> | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  speakingWriting: any
}

type SiteSettings = {
  socialLinks: {
    linkedin?: string | null
    twitter?: string | null
    youtube?: string | null
  } | null
}

export default async function AboutPage() {
  let about: AboutPage | null = null
  let settings: SiteSettings | null = null
  try {
    const [{ data: a }, { data: s }] = await Promise.all([
      sanityFetch({ query: ABOUT_PAGE_QUERY }),
      sanityFetch({ query: SITE_SETTINGS_QUERY }),
    ])
    about = a as AboutPage | null
    settings = s as SiteSettings | null
  } catch {
    // fall through to fallbacks
  }

  const headline = about?.headline || 'About Bill Rice'
  const heroTagline = about?.heroTagline || FALLBACK_HERO_TAGLINE
  const differentiators = about?.differentiators?.length ? about.differentiators : FALLBACK_DIFFERENTIATORS
  const timeline = about?.timelineEvents?.length ? about.timelineEvents : FALLBACK_TIMELINE
  const expertise = about?.expertiseAreas?.length ? about.expertiseAreas : FALLBACK_EXPERTISE
  const education = about?.education?.length ? about.education : FALLBACK_EDUCATION
  const ventures = about?.currentVentures?.length ? about.currentVentures : FALLBACK_VENTURES

  const linkedin = settings?.socialLinks?.linkedin || 'https://www.linkedin.com/in/billrice/'
  const twitter = settings?.socialLinks?.twitter || 'https://twitter.com/billrice'
  const youtube = settings?.socialLinks?.youtube || 'https://www.youtube.com/@billricestrategy'

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="breadcrumbs-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* Header */}
      <header className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <nav className="mb-4" aria-label="Breadcrumb">
              <Link href="/" className="text-sm text-gray-500 hover:text-black inline-flex items-center">
                <span aria-hidden="true">&larr;</span>
                <span className="ml-1">Home</span>
              </Link>
            </nav>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-48 h-48 flex-shrink-0">
                <Image
                  src="/bill-rice-headshot.jpg"
                  alt="Bill Rice - Fintech marketing strategist and demand generation expert"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{headline}</h1>
                <p className="mt-4 text-xl text-gray-600">{heroTagline}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* The Story */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Short Version</h2>
              {about?.shortVersion ? (
                <div className="prose prose-lg max-w-none">
                  <PortableText value={about.shortVersion} />
                </div>
              ) : (
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    I started my career as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations in the late 1990s&mdash;the very beginning of the internet era. That experience taught me systems thinking, pattern recognition, and how to build operational frameworks under pressure.
                  </p>
                  <p>
                    In 2000, I made the jump to fintech as Employee #7 at DeepGreen Bank, one of the very first internet-only banks in the United States. We grew to about 80 people running what functionally behaved like a billion-dollar bank&mdash;still small by industry standards, still punching several weight classes up. We launched the industry&rsquo;s first unconditional online HELOC. In 2004, DeepGreen was sold to LightYear Capital and I went to Quicken Loans (now Rocket Mortgage)&mdash;initially joining for the Rock Bank project, then pivoting to VP of National Home Equity, where I built EquityOnline, their first true online lending and offer platform.
                  </p>
                  <p>
                    In 2005, I founded Kaleidico&mdash;originally as a lead management software company. I built icoSales, an intelligent lead scoring and distribution platform. I started calling it a &ldquo;lead management&rdquo; platform to differentiate it from a CRM&mdash;because it worked <em>leads</em>, not customers. There was no relationship yet. That was my punch line, and the term stuck. I authored the original Wikipedia page for lead management. After the 2008 mortgage meltdown destroyed my call-center clients, I pivoted Kaleidico into the demand generation agency it is today.
                  </p>
                  <p>
                    From 2016 to 2018 I also owned and operated Velocity Lending, a DTC mortgage lender I built as a live proof-of-concept for everything Kaleidico was teaching clients. I&rsquo;ve also been a growth marketing consultant for Quizzle (acquired by Bankrate), built the initial GTM strategy and launch for SpringEQ in 2016, and founded Bill Rice Strategy Group to serve fintech companies&mdash;many of them longtime referral partners who have been satellites in the same ecosystem Kaleidico has worked in for two decades.
                  </p>
                  <p>
                    Today I run three companies. Kaleidico, where I&rsquo;m CRO following the agency&rsquo;s acquisition and liquidity event&mdash;I retained 10% and continue to lead business development, sales, and marketing strategy and execution. Bill Rice Strategy Group, my B2B strategic agency for fintech clients. And Verified Vector, my AI-first agency with no employees&mdash;just AI agents and me, with every deliverable produced in code. Alongside the companies, I operate a portfolio of authority content sites across lead generation, real estate investing, and crypto lending.
                  </p>
                </div>
              )}
            </section>

            {/* Differentiators */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes My Background Unusual</h2>
              <div className="space-y-6">
                {differentiators.map((d, i) => (
                  <div key={i} className="border-l-4 border-l-[#FFD000] pl-6">
                    <h3 className="text-lg font-semibold text-gray-900">{d.title}</h3>
                    <p className="text-gray-600 mt-1">{d.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Timeline */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Career Timeline</h2>
              <div className="space-y-0">
                {timeline.map((event, index) => (
                  <div key={index} className="relative pl-8 pb-8 last:pb-0">
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-gray-200" aria-hidden="true" />
                    )}
                    <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#FFD000] border-2 border-white ring-2 ring-gray-200" aria-hidden="true" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">{event.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-0.5">{event.title}</h3>
                      {event.subtitle && <p className="text-sm text-gray-500 italic">{event.subtitle}</p>}
                      {event.description && <p className="text-gray-600 mt-2">{event.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Expertise */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {expertise.map((item, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{item.area}</h3>
                    {item.detail && <p className="text-sm text-gray-600 mt-1">{item.detail}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-4">
                {education.map((e, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 bg-[#FFD000] rounded flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{e.degree}</h3>
                      {(e.institution || e.year) && (
                        <p className="text-gray-600">
                          {e.institution}
                          {e.institution && e.year ? ', ' : ''}
                          {e.year}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Current Ventures */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Ventures</h2>
              <div className="space-y-4">
                {ventures.map((v, i) => (
                  <div key={i} className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                    <h3 className="font-semibold text-gray-900">
                      {v.url ? (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {v.name}
                        </a>
                      ) : (
                        v.name
                      )}
                    </h3>
                    {v.role && <p className="text-sm text-gray-500">{v.role}</p>}
                    {v.description && <p className="text-gray-600 mt-1">{v.description}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Speaking & Writing */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Speaking & Writing</h2>
              {about?.speakingWriting ? (
                <div className="prose prose-lg max-w-none">
                  <PortableText value={about.speakingWriting} />
                </div>
              ) : (
                <div className="space-y-3 text-gray-600">
                  <p>
                    Author of{' '}
                    <a href="https://www.leadbuyerplaybook.com/" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-700">The Lead Buyer&rsquo;s Playbook</a>{' '}
                    (2025). Publisher of{' '}
                    <a href="https://theleadbrief.com/" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-gray-700">The Lead Brief</a>{' '}
                    newsletter. Regular speaker at Lead Generation World and fintech industry conferences. Featured guest on 30+ marketing and business podcasts.
                  </p>
                  <p>
                    Topics: demand generation, lead management systems, AI-driven marketing, B2B growth, sales-marketing alignment, aged lead reconversion, and go-to-market strategy for fintech startups.
                  </p>
                </div>
              )}
            </section>

            {/* Connect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Email:</span>{' '}
                  <a href="mailto:bill@billrice.com" className="text-black underline">bill@billrice.com</a>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">LinkedIn:</span>{' '}
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-black underline">{linkedin.replace(/^https?:\/\//, '')}</a>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">X:</span>{' '}
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-black underline">@billrice</a>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">YouTube:</span>{' '}
                  <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-black underline">@billricestrategy</a>
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}
