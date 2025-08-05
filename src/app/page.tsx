import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { personStructuredData, websiteStructuredData, organizationStructuredData } from '@/lib/structured-data';

export default function HomePage() {
  const combinedStructuredData = [
    personStructuredData,
    websiteStructuredData,
    organizationStructuredData
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
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
            B2B Marketing Strategy Expert
          </p>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Helping fintech and B2B companies grow through proven marketing strategies and lead generation systems.
          </p>
          
          <nav className="mt-10 flex flex-col sm:flex-row justify-center gap-4" aria-label="Primary navigation">
            <a
              href="https://www.myexecutivebrief.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
              aria-label="Subscribe to Bill Rice's newsletter (opens in new tab)"
            >
              Subscribe to Newsletter
            </a>
            <a
              href="#about"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
              aria-label="Learn more about Bill Rice"
            >
              Learn More
            </a>
          </nav>
        </div>
      </header>

      {/* About Section */}
      <main id="main-content">
        <section id="about" className="py-16 bg-gray-50" aria-labelledby="about-heading">
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
                    Bill Rice brings 20+ years of experience designing and building online consumer-direct banking and lending platforms. His journey from Air Force intelligence operations to marketing leadership provides a unique strategic perspective on B2B growth.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    As the founder of multiple successful marketing agencies including Kaleidico, Bill Rice Strategy, and Verified Vector, Bill helps fintech companies and B2B organizations build predictable revenue pipelines through proven marketing frameworks.
                  </p>
                  <p className="text-lg text-gray-600">
                    His expertise spans from building marketing systems for major financial institutions like Quicken Loans to developing AI-powered growth strategies for emerging fintech companies.
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
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
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

        {/* Companies Section */}
        <section className="py-16 bg-white" aria-labelledby="companies-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="companies-heading" className="text-3xl font-bold text-gray-900">
                Companies & Projects
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Strategic marketing solutions across multiple ventures
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Kaleidico
                </h3>
                <p className="text-gray-600 mb-4">
                  B2C lead generation agency for mortgage lenders, law firms, and senior living communities.
                </p>
                <a
                  href="https://kaleidico.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  aria-label="Visit Kaleidico website (opens in new tab)"
                >
                  Visit Kaleidico
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
              
              <article className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Bill Rice Strategy
                </h3>
                <p className="text-gray-600 mb-4">
                  B2B marketing strategy consulting for fintech companies and growth-focused businesses.
                </p>
                <a
                  href="https://billricestrategy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  aria-label="Visit Bill Rice Strategy website (opens in new tab)"
                >
                  Visit Bill Rice Strategy
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
              
              <article className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Verified Vector
                </h3>
                <p className="text-gray-600 mb-4">
                  AI-powered marketing agency for fintech growth with compliance-ready systems.
                </p>
                <a
                  href="https://verifiedvector.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">WriteMySalesScript</h4>
                  <p className="text-sm text-gray-600 mb-4">AI-powered sales script generation for B2B teams</p>
                  <a
                    href="https://writemysalesscript.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Visit WriteMySalesScript
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">VisibilityAnalyzer</h4>
                  <p className="text-sm text-gray-600 mb-4">SEO and LLM visibility analysis and optimization</p>
                  <a
                    href="https://visibilityanalyzer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Visit VisibilityAnalyzer
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">B2B Marketing Battlecard</h4>
                  <p className="text-sm text-gray-600 mb-4">Competitive intelligence and strategic insights</p>
                  <a
                    href="https://b2bmarketingbattlecard.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Visit B2B Marketing Battlecard
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
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-gray-900 mb-2">90-Day B2B Growth Toolkit</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete Notion-based growth system for B2B founders and lean GTM teams</p>
                  <span className="text-blue-600 font-medium">Get it for $9 →</span>
                </a>
                
                <a
                  href="https://billriceconsulting.gumroad.com/l/sales-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-gray-900 mb-2">Complete Sales Scripts Course</h4>
                  <p className="text-sm text-gray-600 mb-3">Step-by-step guide to designing, writing, and optimizing sales scripts for consistent results</p>
                  <span className="text-blue-600 font-medium">Get it for $9 →</span>
                </a>
                
                <a
                  href="https://billriceconsulting.gumroad.com/l/aged-leads-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-gray-900 mb-2">Aged Leads Sales Playbook</h4>
                  <p className="text-sm text-gray-600 mb-3">Transform dormant aged leads into active customers with proven scripts and strategies</p>
                  <span className="text-blue-600 font-medium">Get it for $9 →</span>
                </a>
                
                <a
                  href="https://billriceconsulting.gumroad.com/l/mortgage-scripts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-gray-900 mb-2">Mortgage Sales System</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete mortgage sales system with scripts, strategies, and lead management automation</p>
                  <span className="text-blue-600 font-medium">Get it for $9 →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Newsletter & Contact Section */}
        <section id="contact" className="py-16 bg-white" aria-labelledby="contact-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="contact-heading" className="text-3xl font-bold text-gray-900 mb-8">
                Stay Connected
              </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">My Executive Brief</h3>
                <p className="text-gray-600 mb-6">
                  Weekly strategic insights for B2B marketing leaders. Curated notes, tactical briefs, and special reports.
                </p>
                <a
                  href="https://www.myexecutivebrief.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Subscribe to Newsletter
                </a>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get In Touch</h3>
                <p className="text-gray-600 mb-6">
                  Interested in strategic consulting or speaking engagements? Let&apos;s discuss how we can work together.
                </p>
                <a
                  href="mailto:bill@billrice.com"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/billrice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@billricestrategy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 border-t border-gray-200" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Bill Rice. All rights reserved.</p>
            <p className="mt-2">
              <Link 
                href="/now" 
                className="text-blue-600 hover:text-blue-700"
                aria-label="Visit Bill Rice's now page"
              >
                See what I&apos;m working on now
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
