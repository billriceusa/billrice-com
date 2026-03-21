import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Script from 'next/script';
import { breadcrumbHomeToContact } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact Bill Rice',
  description: 'Get in touch regarding consulting, podcast guest appearances, speaking, or ongoing marketing engagements.',
  alternates: {
    canonical: 'https://billrice.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs JSON-LD */}
      <Script id="breadcrumbs-contact" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbHomeToContact) }} />
      <header className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900">Contact Bill Rice</h1>
            <p className="mt-4 text-lg text-gray-600">
              Tell me how I can help. Pick an option below and I&apos;ll route you to the right next step.
            </p>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}


