import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You | Bill Rice',
  alternates: {
    canonical: 'https://billrice.com/contact/thank-you',
  },
};

const DISCOVERY_CALENDAR_URL = 'https://calendar.app.google/SzNkR5pExSJLeu9N7';

export default async function ContactThankYou({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = (await searchParams) || {};
  const intent = (params.intent as string) || '';
  const title = 'Thanks for reaching out!';
  const message = intent
    ? `I received your ${intent} details. I’ll review and follow up soon.`
    : `I received your details. I’ll review and follow up soon.`;

  return (
    <div className="min-h-screen bg-white">
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600 mb-8">{message}</p>
            <a
              href={DISCOVERY_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Schedule a discovery call
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}


