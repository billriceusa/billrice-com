import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Bill Rice',
  description: 'Get in touch regarding consulting, podcast guest appearances, speaking, or ongoing marketing engagements.'
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
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


