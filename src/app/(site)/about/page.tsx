import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Script from 'next/script';

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
};

const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://billrice.com/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://billrice.com/about' },
  ],
};

const timelineEvents = [
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
    year: '2000',
    title: 'DeepGreen Bank - Employee #7',
    subtitle: 'One of the first internet-only banks',
    description:
      'Joined DeepGreen Bank as Employee #7, one of the earliest internet-only banks in the United States. Helped launch the industry\'s first unconditional online HELOC (Home Equity Line of Credit), establishing a template that the industry would follow for the next two decades.',
  },
  {
    year: '2002-2005',
    title: 'Quicken Loans - VP, National Home Equity',
    subtitle: 'Built the EquityOnline platform',
    description:
      'Recruited to Quicken Loans (now Rocket Mortgage) as Vice President of National Home Equity. Led the design and build of EquityOnline, Quicken Loans\' first true online lending and offer platform. During this period, earned an MBA in Marketing from the University of Phoenix (2003).',
  },
  {
    year: '2005',
    title: 'Founded Kaleidico',
    subtitle: 'Demand generation agency',
    description:
      'Founded Kaleidico, a demand generation agency serving mortgage lenders, law firms, and senior living communities. Built icoSales, an intelligent lead scoring and distribution platform that competed with Leads360 (later Velocify). Coined the term "lead management" to differentiate platforms that work leads from CRMs that manage customers. Authored the original Wikipedia page for lead management.',
  },
  {
    year: '2008-2012',
    title: 'Quizzle - Growth Marketing Consultant',
    subtitle: 'Free credit report platform, later acquired by Bankrate',
    description:
      'Served as growth marketing consultant for Quizzle, one of the first free credit report and financial planning platforms. Bankrate later acquired Quizzle to power their customer acquisition and retention strategy.',
  },
  {
    year: '2018',
    title: 'SpringEQ - GTM Strategy & Launch',
    subtitle: 'Home equity lending fintech',
    description:
      'Built the initial go-to-market strategy for SpringEQ. Led the build-out of the website, lead generation systems, and GTM launch, then supported initial operations through the early growth phase.',
  },
  {
    year: '2020',
    title: 'Founded Bill Rice Strategy Group',
    subtitle: 'B2B consulting for fintech',
    description:
      'Launched Bill Rice Strategy Group (BRSG) to focus on B2B consulting for fintech companies and financial services organizations. Provides content strategy, executive thought leadership, and demand generation for high-growth companies including Figure and Boldin.',
  },
  {
    year: '2024',
    title: 'Founded Verified Vector',
    subtitle: 'Programmatic SEO & AI marketing agency',
    description:
      'Launched Verified Vector, a programmatic SEO and AI marketing agency serving fintech companies. Builds compliance-ready AI-powered content and marketing systems at scale.',
  },
  {
    year: '2025',
    title: 'Published The Lead Buyer\'s Playbook',
    subtitle: 'Enterprise guide to lead buying',
    description:
      'Published The Lead Buyer\'s Playbook, the enterprise guide to buying and converting leads profitably. Drawing on 30+ years in lead generation, the book covers strategic foundations, vendor management, compliance, financial modeling, and scaling operations.',
  },
  {
    year: '2025-Present',
    title: 'Building Authority Content Portfolio',
    subtitle: 'Niche education and lead generation platforms',
    description:
      'Building and operating a portfolio of authority-driven content sites: AgedLeadSales.com (sales training for aged leads), ProInvestorHub.com (real estate investing education), CryptoLendingHub.com (crypto lending reviews), HowToWorkLeads.com (lead conversion techniques), and DemoLeadGen.com (lead generation demo platform). All built on Next.js and Sanity.io.',
  },
];

export default function AboutPage() {
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
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-black inline-flex items-center"
              >
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
                <h1 className="text-4xl font-bold text-gray-900">About Bill Rice</h1>
                <p className="mt-4 text-xl text-gray-600">
                  Fintech marketing pioneer. Coined &ldquo;lead management.&rdquo; 30+ years building lead generation platforms and revenue systems for financial services companies.
                </p>
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
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  I started my career as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations in the late 1990s&mdash;the very beginning of the internet era. That experience taught me systems thinking, pattern recognition, and how to build operational frameworks under pressure.
                </p>
                <p>
                  In 2000, I made the jump to fintech as Employee #7 at DeepGreen Bank, one of the very first internet-only banks in the United States. We launched the industry&rsquo;s first unconditional online HELOC. From there, I went to Quicken Loans (now Rocket Mortgage) as VP of National Home Equity, where I built EquityOnline&mdash;their first true online lending and offer platform.
                </p>
                <p>
                  In 2005, I founded Kaleidico, a demand generation agency. While building the agency, I created icoSales, an intelligent lead scoring and distribution platform. I started calling it a &ldquo;lead management&rdquo; platform to differentiate it from a CRM&mdash;because it worked <em>leads</em>, not customers. There was no relationship yet. That was my punch line, and the term stuck. I authored the original Wikipedia page for lead management. The category I named is now an industry standard.
                </p>
                <p>
                  Since then, I&rsquo;ve been a growth consultant for Quizzle (acquired by Bankrate), built the GTM strategy and launch for SpringEQ, and founded Bill Rice Strategy Group to do B2B content strategy and demand generation for fintech companies like Figure and Boldin.
                </p>
                <p>
                  Today I run three companies&mdash;Kaleidico (B2C lead gen agency), Bill Rice Strategy Group (B2B consulting), and Verified Vector (programmatic SEO and AI marketing)&mdash;and operate a portfolio of authority content sites across lead generation, real estate investing, and crypto lending.
                </p>
              </div>
            </section>

            {/* Key Differentiators */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes My Background Unusual</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-l-[#FFD000] pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">Intelligence to Internet</h3>
                  <p className="text-gray-600 mt-1">
                    I went from running counterespionage operations as an AFOSI Special Agent to building one of the first internet banks. The systems thinking and analytical rigor from intelligence work is the foundation of everything I do in marketing.
                  </p>
                </div>
                <div className="border-l-4 border-l-[#FFD000] pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">I Named the Category</h3>
                  <p className="text-gray-600 mt-1">
                    I coined &ldquo;lead management&rdquo; as a category and authored the original Wikipedia page. Before that, everyone called these platforms CRMs, even though they were working prospects, not managing customer relationships. The distinction matters because the workflows, metrics, and systems are fundamentally different.
                  </p>
                </div>
                <div className="border-l-4 border-l-[#FFD000] pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">Builder, Not Just Advisor</h3>
                  <p className="text-gray-600 mt-1">
                    I was Employee #7 at DeepGreen Bank. I built EquityOnline at Quicken Loans. I built icoSales from scratch. I built the GTM for SpringEQ. I don&rsquo;t just advise&mdash;I build the platforms, the campaigns, the systems, and the operations.
                  </p>
                </div>
                <div className="border-l-4 border-l-[#FFD000] pl-6">
                  <h3 className="text-lg font-semibold text-gray-900">30+ Years, Same Industry</h3>
                  <p className="text-gray-600 mt-1">
                    I&rsquo;ve been in fintech and financial services since the industry&rsquo;s earliest days online. That depth means I understand compliance, regulation, sales cycles, and buyer psychology in ways that generalist marketers simply cannot.
                  </p>
                </div>
              </div>
            </section>

            {/* Career Timeline */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Career Timeline</h2>
              <div className="space-y-0">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative pl-8 pb-8 last:pb-0">
                    {/* Vertical line */}
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute left-[7px] top-3 bottom-0 w-px bg-gray-200" aria-hidden="true" />
                    )}
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#FFD000] border-2 border-white ring-2 ring-gray-200" aria-hidden="true" />
                    <div>
                      <span className="text-sm font-medium text-gray-500">{event.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-0.5">{event.title}</h3>
                      <p className="text-sm text-gray-500 italic">{event.subtitle}</p>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Expertise Areas */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { area: 'Demand Generation', detail: 'Building scalable, predictable revenue engines for B2B and B2C' },
                  { area: 'Lead Management', detail: 'Coined the category. Built the systems. Wrote the definition.' },
                  { area: 'Fintech Marketing', detail: 'Mortgage, lending, banking, payments, blockchain, RegTech' },
                  { area: 'Go-to-Market Strategy', detail: '120-day sprints from strategy to measurable pipeline' },
                  { area: 'Content & SEO', detail: 'Programmatic and editorial content at scale for regulated industries' },
                  { area: 'Sales-Marketing Alignment', detail: 'Connecting marketing systems to sales operations and revenue' },
                  { area: 'AI-Powered Marketing', detail: 'Compliance-ready AI content and automation systems' },
                  { area: 'Startup Traction', detail: 'Pre-revenue to revenue. GTM strategy through initial operations.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{item.area}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 bg-[#FFD000] rounded flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">B.S., Political Science</h3>
                    <p className="text-gray-600">United States Air Force Academy, 1992</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-[#FFD000] rounded flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">MBA, Marketing</h3>
                    <p className="text-gray-600">University of Phoenix, 2003</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Current Ventures */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Ventures</h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                  <h3 className="font-semibold text-gray-900">
                    <a href="https://kaleidico.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Kaleidico</a>
                  </h3>
                  <p className="text-sm text-gray-500">Founder & CRO</p>
                  <p className="text-gray-600 mt-1">B2C lead generation agency for mortgage lenders, law firms, and senior living communities.</p>
                </div>
                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                  <h3 className="font-semibold text-gray-900">
                    <a href="https://billricestrategy.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Bill Rice Strategy Group</a>
                  </h3>
                  <p className="text-sm text-gray-500">Founder & Chief Strategist</p>
                  <p className="text-gray-600 mt-1">B2B content strategy, executive thought leadership, and demand generation for fintech companies.</p>
                </div>
                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg">
                  <h3 className="font-semibold text-gray-900">
                    <a href="https://verifiedvector.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Verified Vector</a>
                  </h3>
                  <p className="text-sm text-gray-500">Founder</p>
                  <p className="text-gray-600 mt-1">Programmatic SEO and AI marketing agency for fintech companies.</p>
                </div>
              </div>
            </section>

            {/* Speaking & Writing */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Speaking & Writing</h2>
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
                  <a href="https://www.linkedin.com/in/billrice/" target="_blank" rel="noopener noreferrer" className="text-black underline">linkedin.com/in/billrice</a>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">X:</span>{' '}
                  <a href="https://twitter.com/billrice" target="_blank" rel="noopener noreferrer" className="text-black underline">@billrice</a>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">YouTube:</span>{' '}
                  <a href="https://www.youtube.com/@billricestrategy" target="_blank" rel="noopener noreferrer" className="text-black underline">@billricestrategy</a>
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
  );
}
