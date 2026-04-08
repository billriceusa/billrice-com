import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { personStructuredData, websiteStructuredData, organizationStructuredData, professionalServiceStructuredData, bookStructuredData } from '@/lib/structured-data';

export default function HomePage() {
  const combinedStructuredData = [
    personStructuredData,
    websiteStructuredData,
    organizationStructuredData,
    professionalServiceStructuredData,
    bookStructuredData
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedStructuredData) }}
      />
      
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#FFD000] text-black p-2 z-50"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            Bill Rice
          </h1>
          <p className="mt-6 text-2xl text-gray-600 max-w-3xl mx-auto">
            Fintech Marketing Pioneer & Lead Generation Strategist
          </p>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            30+ years building lead generation platforms and revenue systems for financial services companies. Coined &ldquo;lead management.&rdquo; Built platforms at DeepGreen Bank and Quicken Loans.
          </p>
          
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

      {/* Book Section */}
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
                    aria-label="Read The Lead Buyer's Playbook free online (opens in new tab)"
                  >
                    Read Free Online
                  </a>
                  <a
                    href="https://www.amazon.com/dp/B0DRBK6QJZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black hover:bg-black hover:text-white text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                    aria-label="Buy The Lead Buyer's Playbook on Amazon (opens in new tab)"
                  >
                    Buy on Amazon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white" aria-labelledby="about-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="about-heading" className="text-3xl font-bold text-gray-900">
                  About Bill Rice
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <p className="text-lg text-gray-600 mb-6">
                    I started as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations, then became Employee #7 at DeepGreen Bank&mdash;one of the first internet-only banks. At Quicken Loans, I built EquityOnline, their first true online lending platform.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    I coined the term &ldquo;lead management&rdquo; to differentiate platforms that work leads from CRMs that manage customers. I authored the original Wikipedia page for the category. The frameworks I built are now industry standard.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Today I run three companies&mdash;Kaleidico, Bill Rice Strategy Group, and Verified Vector&mdash;and operate a portfolio of authority content sites across lead generation, real estate investing, and fintech.
                  </p>
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
                      aria-label="Visit Bill Rice's now page to see current projects"
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

        {/* My Companies Section */}
        <section className="py-16 bg-gray-50" aria-labelledby="companies-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="companies-heading" className="text-3xl font-bold text-gray-900">
                My Companies
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Strategic marketing solutions across multiple ventures
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Kaleidico
                </h3>
                <p className="text-gray-600 mb-4">
                  High-performance B2C lead generation agency helping mortgage lenders, law firms, and senior living communities build sustainable, scalable sales pipelines.
                </p>
                <a
                  href="https://kaleidico.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit Kaleidico website (opens in new tab)"
                >
                  Visit Kaleidico
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Bill Rice Strategy Group
                </h3>
                <p className="text-gray-600 mb-4">
                  B2B consultancy helping fintech founders and marketing leaders replace guesswork with data-driven frameworks that generate predictable revenue.
                </p>
                <a
                  href="https://billricestrategy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit Bill Rice Strategy Group website (opens in new tab)"
                >
                  Visit Bill Rice Strategy Group
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Verified Vector
                </h3>
                <p className="text-gray-600 mb-4">
                  Programmatic SEO and AI marketing agency for fintech companies. Compliance-ready content and marketing systems at scale.
                </p>
                <a
                  href="https://verifiedvector.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit Verified Vector website (opens in new tab)"
                >
                  Visit Verified Vector
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* My Projects Section */}
        <section className="py-16 bg-white" aria-labelledby="projects-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="projects-heading" className="text-3xl font-bold text-gray-900">
                My Projects
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Authority-driven education platforms and resources across lead generation, real estate investing, and crypto lending
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg bg-gray-50 hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  The Lead Brief
                </h3>
                <p className="text-gray-600 mb-4">
                  Weekly newsletter and podcast on lead generation strategy. Tactics for buying, generating, and converting more leads.
                </p>
                <a
                  href="https://theleadbrief.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit The Lead Brief website (opens in new tab)"
                >
                  Visit The Lead Brief
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg bg-gray-50 hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Aged Lead Sales
                </h3>
                <p className="text-gray-600 mb-4">
                  Sales training and education platform for working aged leads. Playbooks, calculators, and industry-specific strategies for insurance, mortgage, legal, and solar professionals.
                </p>
                <a
                  href="https://agedleadsales.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit Aged Lead Sales website (opens in new tab)"
                >
                  Visit Aged Lead Sales
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg bg-gray-50 hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How to Work Leads
                </h3>
                <p className="text-gray-600 mb-4">
                  Practical strategies and proven techniques for converting leads into customers, from first contact to close.
                </p>
                <a
                  href="https://www.howtoworkleads.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit How to Work Leads website (opens in new tab)"
                >
                  Visit How to Work Leads
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg bg-gray-50 hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ProInvestorHub
                </h3>
                <p className="text-gray-600 mb-4">
                  Real estate investing education platform with expert guides, interactive calculators, market data for 50+ cities, and a weekly investor newsletter.
                </p>
                <a
                  href="https://proinvestorhub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit ProInvestorHub website (opens in new tab)"
                >
                  Visit ProInvestorHub
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>

              <article className="text-center p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg bg-gray-50 hover:shadow-lg hover:border-l-[#E6BB00] transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  CryptoLendingHub
                </h3>
                <p className="text-gray-600 mb-4">
                  Data-driven crypto lending education with platform reviews, rate comparisons, risk assessments, and DeFi protocol analysis. No hype — just data.
                </p>
                <a
                  href="https://cryptolendinghub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:text-black font-medium underline"
                  aria-label="Visit CryptoLendingHub website (opens in new tab)"
                >
                  Visit CryptoLendingHub
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Tools & Resources Section */}
        <section className="py-16 bg-gray-50" aria-labelledby="tools-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="tools-heading" className="text-3xl font-bold text-gray-900">
                Tools & Resources
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Free AI-powered tools and strategic playbooks
              </p>
            </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Free AI Tools</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all">
                  <h4 className="font-medium text-gray-900 mb-2">WriteMySalesScript</h4>
                  <p className="text-sm text-gray-600 mb-4">AI-powered sales script generation for B2B teams</p>
                  <a
                    href="https://writemysalesscript.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-black hover:text-black font-medium underline"
                  >
                    Visit WriteMySalesScript
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                
                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all">
                  <h4 className="font-medium text-gray-900 mb-2">VisibilityAnalyzer</h4>
                  <p className="text-sm text-gray-600 mb-4">SEO and LLM visibility analysis and optimization</p>
                  <a
                    href="https://visibilityanalyzer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-black hover:text-black font-medium underline"
                  >
                    Visit VisibilityAnalyzer
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                
                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all">
                  <h4 className="font-medium text-gray-900 mb-2">B2B Marketing Battlecard</h4>
                  <p className="text-sm text-gray-600 mb-4">Competitive intelligence and strategic insights</p>
                  <a
                    href="https://b2bmarketingbattlecard.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-black hover:text-black font-medium underline"
                  >
                    Visit B2B Marketing Battlecard
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all">
                  <h4 className="font-medium text-gray-900 mb-2">DemoLeadGen</h4>
                  <p className="text-sm text-gray-600 mb-4">Interactive lead generation demo platform</p>
                  <a
                    href="https://demoleadgen.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-black hover:text-black font-medium underline"
                  >
                    Visit DemoLeadGen
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Playbooks</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                <a
                  href="https://billriceconsulting.gumroad.com/l/90dayB2Btoolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all"
                >
                  <h4 className="font-medium text-gray-900 mb-2">90-Day B2B Growth Toolkit</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete Notion-based growth system for B2B founders and lean GTM teams</p>
                  <span className="text-black font-medium underline">Get it for $9 →</span>
                </a>

                <a
                  href="https://billriceconsulting.gumroad.com/l/sales-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all"
                >
                  <h4 className="font-medium text-gray-900 mb-2">Complete Sales Scripts Course</h4>
                  <p className="text-sm text-gray-600 mb-3">Step-by-step guide to designing, writing, and optimizing sales scripts for consistent results</p>
                  <span className="text-black font-medium underline">Get it for $9 →</span>
                </a>

                <a
                  href="https://billriceconsulting.gumroad.com/l/aged-leads-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all"
                >
                  <h4 className="font-medium text-gray-900 mb-2">Aged Leads Sales Playbook</h4>
                  <p className="text-sm text-gray-600 mb-3">Transform dormant aged leads into active customers with proven scripts and strategies</p>
                  <span className="text-black font-medium underline">Get it for $9 →</span>
                </a>

                <a
                  href="https://billriceconsulting.gumroad.com/l/mortgage-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg hover:shadow-md hover:border-l-[#E6BB00] transition-all"
                >
                  <h4 className="font-medium text-gray-900 mb-2">Mortgage Sales System</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete mortgage sales system with scripts, strategies, and lead management automation</p>
                  <span className="text-black font-medium underline">Get it for $9 →</span>
                </a>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Newsletter & Contact Section */}
        <section id="contact" className="py-16 bg-white" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="contact-heading" className="text-3xl font-bold text-gray-900 mb-8">
                Stay Connected
              </h2>
            
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
              <a
                href="https://www.linkedin.com/in/billrice/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#FFD000] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/billrice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#FFD000] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@billricestrategy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#FFD000] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
