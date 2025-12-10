import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';
import { breadcrumbHomeToNow } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: "What I'm Working On Now",
  description: "Current projects and strategic priorities for Bill Rice - B2B Marketing Strategy Expert. Updated regularly with latest initiatives in AI-powered marketing, fintech consulting, and business strategy.",
  keywords: ["Bill Rice current projects", "AI marketing", "fintech consulting", "B2B strategy", "marketing automation", "business consulting"],
  openGraph: {
    title: "What I'm Working On Now | Bill Rice",
    description: "Current projects and strategic priorities for Bill Rice - B2B Marketing Strategy Expert. Updated regularly with latest initiatives.",
    type: 'website',
    url: 'https://billrice.com/now',
  },
  twitter: {
    title: "What I'm Working On Now | Bill Rice",
    description: "Current projects and strategic priorities for Bill Rice - B2B Marketing Strategy Expert.",
  },
  alternates: {
    canonical: 'https://billrice.com/now',
  },
};

export default function NowPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs JSON-LD */}
      <Script id="breadcrumbs-now" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbHomeToNow) }} />
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#FFD000] text-black p-2 z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <nav className="mb-4" aria-label="Breadcrumb">
              <Link
                href="/"
                className="text-black hover:text-black font-medium inline-flex items-center underline"
                aria-label="Return to homepage"
              >
                <span aria-hidden="true">←</span>
                <span className="ml-1">Back to BillRice.com</span>
              </Link>
            </nav>
            <h1 className="text-4xl font-bold text-gray-900">
              What I&apos;m Working On Now
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              <time dateTime="2025-07-30">Last updated: July 30, 2025</time>
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Current Projects */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Strategic Priorities</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Marketing Systems</h3>
                  <p className="text-gray-600">
                    Developing compliance-ready AI marketing solutions for fintech companies through{' '}
                    <a
                      href="https://verifiedvector.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-black underline"
                    >
                      Verified Vector
                    </a>.
                    {' '}Focus on dramatically increasing content productivity while maintaining regulatory compliance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">B2B Strategy Consulting</h3>
                  <p className="text-gray-600">
                    Working with 120-day strategic engagements through{' '}
                    <a
                      href="https://billricestrategy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-black underline"
                    >
                      Bill Rice Strategy
                    </a>, helping fintech and B2B
                    companies build predictable revenue pipelines and demand generation systems.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">My Executive Brief Newsletter</h3>
                  <p className="text-gray-600">
                    Publishing{' '}
                    <a
                      href="https://myexecutivebrief.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-black underline"
                    >
                      weekly strategic insights for B2B marketing leaders
                    </a>.
                    {' '}Curating tactical briefs, 
                    strategic notes, and special reports on emerging trends in B2B marketing and fintech.
                  </p>
                </div>
              </div>
            </div>

            {/* Currently Reading */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Currently Reading & Learning</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Business & Strategy</h3>
                  <p className="text-gray-600">
                    Exploring the intersection of AI and business strategy, with particular focus on 
                    how emerging technologies are reshaping B2B marketing and customer acquisition.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Technology Trends</h3>
                  <p className="text-gray-600">
                    Following developments in AI agents, LLM applications for business, and 
                    compliance-first approaches to marketing automation in regulated industries.
                  </p>
                </div>
              </div>
            </div>

            {/* Speaking & Availability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Speaking & Consulting</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Available Topics</h3>
                  <ul className="text-gray-600 space-y-2 ml-4">
                    <li>• AI-Powered Marketing for Fintech Companies</li>
                    <li>• Building Predictable B2B Revenue Pipelines</li>
                    <li>• From Military Intelligence to Marketing Strategy</li>
                    <li>• Compliance-First Marketing in Regulated Industries</li>
                    <li>• Strategic Frameworks for B2B Growth</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Consulting Availability</h3>
                  <p className="text-gray-600">
                    Currently accepting strategic consulting engagements for fintech companies and 
                    B2B organizations looking to build or optimize their marketing and growth systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-l-[#FFD000] text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                Interested in working together or have questions about any of these projects?
              </p>
              <a
                href="mailto:bill@billrice.com"
                className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
              >
                Contact Bill Rice
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 border-t border-gray-200" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Bill Rice. All rights reserved.</p>
            <p className="mt-2">
              This page follows the{' '}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-black underline"
                aria-label="Learn about the now page movement by Derek Sivers (opens in new tab)"
              >
                now page movement
              </a>{' '}
              by Derek Sivers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}