import Link from 'next/link';

export default function NowPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block"
            >
              ← Back to BillRice.com
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">
              What I&apos;m Working On Now
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Last updated: July 30, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Current Projects */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Strategic Priorities</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Marketing Systems</h3>
                  <p className="text-gray-600">
                    Developing compliance-ready AI marketing solutions for fintech companies through Verified Vector. 
                    Focus on dramatically increasing content productivity while maintaining regulatory compliance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">B2B Strategy Consulting</h3>
                  <p className="text-gray-600">
                    Working with 120-day strategic engagements through Bill Rice Strategy, helping fintech and B2B 
                    companies build predictable revenue pipelines and demand generation systems.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">My Executive Brief Newsletter</h3>
                  <p className="text-gray-600">
                    Publishing weekly strategic insights for B2B marketing leaders. Curating tactical briefs, 
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
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                Interested in working together or have questions about any of these projects?
              </p>
              <a
                href="mailto:bill@billrice.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact Bill Rice
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Bill Rice. All rights reserved.</p>
            <p className="mt-2">
              This page follows the <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">now page movement</a> by Derek Sivers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}