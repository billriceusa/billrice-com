"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Intent = 'consulting' | 'podcast' | 'speaking' | 'engagement';

const CONSULTING_CALENDAR_URL = 'https://calendar.app.google/JQJr6qicHvze7tC48';
const DISCOVERY_CALENDAR_URL = 'https://calendar.app.google/SzNkR5pExSJLeu9N7';

export default function ContactForm() {
  const [intent, setIntent] = useState<Intent | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSelectIntent = (selected: Intent) => {
    setIntent(selected);
    setError(null);
    if (selected === 'consulting') {
      // Redirect immediately to paid consulting calendar
      window.location.href = CONSULTING_CALENDAR_URL;
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload: Record<string, string | string[]> = { intent } as Record<string, string | string[]>;
    formData.forEach((value, key) => {
      const stringValue = typeof value === 'string' ? value : value.name;
      if (payload[key] === undefined) {
        payload[key] = stringValue;
      } else if (Array.isArray(payload[key])) {
        (payload[key] as string[]).push(stringValue);
      } else {
        payload[key] = [payload[key] as string, stringValue];
      }
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit.');
      router.push(`/contact/thank-you?intent=${encodeURIComponent(intent)}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">How can I help?</h2>
      <p className="text-gray-600 mb-6">Choose an option to continue.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => onSelectIntent('consulting')}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left text-gray-800 hover:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-2"
          aria-label="One-off consulting call"
        >
          <span className="block font-medium">One-off consulting call</span>
          <span className="block text-sm text-gray-600">Book a paid strategy session</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectIntent('podcast')}
          className={`w-full rounded-lg border px-4 py-3 text-left text-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-2 ${intent==='podcast' ? 'border-[#FFD000] bg-[#FFF8D6]' : 'border-gray-300 hover:border-gray-400'}`}
          aria-label="Guest appearance on your podcast"
        >
          <span className="block font-medium">Guest appearance on your podcast</span>
          <span className="block text-sm text-gray-600">Invite me as a guest</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectIntent('speaking')}
          className={`w-full rounded-lg border px-4 py-3 text-left text-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-2 ${intent==='speaking' ? 'border-[#FFD000] bg-[#FFF8D6]' : 'border-gray-300 hover:border-gray-400'}`}
          aria-label="Speaking at your event"
        >
          <span className="block font-medium">Speaking at your event</span>
          <span className="block text-sm text-gray-600">Keynotes, workshops, panels</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectIntent('engagement')}
          className={`w-full rounded-lg border px-4 py-3 text-left text-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-2 ${intent==='engagement' ? 'border-[#FFD000] bg-[#FFF8D6]' : 'border-gray-300 hover:border-gray-400'}`}
          aria-label="Sales and Marketing Engagement"
        >
          <span className="block font-medium">Sales and Marketing Engagement</span>
          <span className="block text-sm text-gray-600">Explore longer-term collaboration</span>
        </button>
      </div>

      {intent && intent !== 'consulting' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {intent === 'podcast' && (
            <div className="space-y-4">
              <Input name="podcastName" label="Podcast name" required />
              <Input name="hostName" label="Host name" required />
              <Input name="podcastUrl" label="Podcast show URL" type="url" required />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input name="contactName" label="Point of contact name" required />
                <Input name="contactEmail" type="email" label="Point of contact email" required />
                <Input name="contactPhone" type="tel" label="Point of contact phone" required />
              </div>
            </div>
          )}

          {intent === 'speaking' && (
            <div className="space-y-4">
              <Input name="eventName" label="Event name" required />
              <Input name="eventUrl" label="Event URL" type="url" required />
              <div className="grid sm:grid-cols-3 gap-4">
                <Input name="contactName" label="Point of contact name" required />
                <Input name="contactEmail" type="email" label="Point of contact email" required />
                <Input name="contactPhone" type="tel" label="Point of contact phone" required />
              </div>
            </div>
          )}

          {intent === 'engagement' && (
            <div className="space-y-4">
              <Select name="companySize" label="Company size" required options={[
                { value: '1-10', label: '1-10 employees' },
                { value: '11-50', label: '11-50 employees' },
                { value: '51-200', label: '51-200 employees' },
                { value: '201-500', label: '201-500 employees' },
                { value: '501+', label: '501+ employees' },
              ]} />
              <CheckboxGroup
                name="primaryGoals"
                label="Primary goals (select up to 3)"
                options={[
                  'Increase brand awareness',
                  'Generate more leads',
                  'Improve lead conversion rate',
                  'Expand into new markets',
                  'Other',
                ]}
                max={3}
              />
              <CheckboxGroup
                name="topChallenges"
                label="Top challenges (select up to 3)"
                options={[
                  'Limited budget',
                  'Lack of skilled personnel',
                  'Low brand awareness',
                  'High customer acquisition costs',
                  'Poor lead quality',
                  'Ineffective marketing strategies',
                  'Other',
                ]}
                max={3}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Select name="targetAudience" label="Target audience" required options={[
                  { value: 'B2B', label: 'B2B' },
                  { value: 'B2C', label: 'B2C' },
                  { value: 'Specific', label: 'Specific industries' },
                ]} />
                <Input name="industries" label="If specific industries, please specify" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select name="budget" label="Annual marketing budget" required options={[
                  { value: '<10k', label: 'Less than $10,000' },
                  { value: '10k-50k', label: '$10,000 - $50,000' },
                  { value: '50k-100k', label: '$50,001 - $100,000' },
                  { value: '100k-500k', label: '$100,001 - $500,000' },
                  { value: '>500k', label: 'Over $500,000' },
                ]} />
                <Select name="salesProcess" label="Sales process" required options={[
                  { value: 'structured', label: 'Very structured and consistent' },
                  { value: 'somewhat', label: 'Somewhat structured but inconsistent' },
                  { value: 'adhoc', label: 'Ad hoc and unstructured' },
                ]} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="name" label="Your name" required />
                <Input name="email" type="email" label="Email" required />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input name="phone" type="tel" label="Phone" required />
                <Input name="company" label="Company" required />
                <Input name="website" type="url" label="Website" />
              </div>
            </div>
          )}

          {error && <p className="text-red-600" role="alert">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FFD000] hover:bg-[#E6BB00] disabled:opacity-60 text-black px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <a
              href={DISCOVERY_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black underline"
            >
              Or schedule a discovery call →
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

function Input({ name, label, type = 'text', required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-800 mb-1">{label}{required && ' *'}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-2"
      />
    </label>
  );
}

function Select({ name, label, options, required = false }: { name: string; label: string; options: { value: string; label: string }[]; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-800 mb-1">{label}{required && ' *'}</span>
      <select
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] focus-visible:ring-offset-2"
        defaultValue=""
      >
        <option value="" disabled>Choose...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
}

function CheckboxGroup({ name, label, options, max }: { name: string; label: string; options: string[]; max?: number }) {
  const [selected, setSelected] = useState<string[]>([]);
  function toggle(value: string) {
    setSelected((prev) => {
      const exists = prev.includes(value);
      if (exists) return prev.filter((v) => v !== value);
      if (max && prev.length >= max) return prev; // enforce max
      return [...prev, value];
    });
  }
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-800 mb-2">{label}</legend>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              className="h-4 w-4 text-[#FFD000] border-gray-300 rounded accent-[#FFD000]"
            />
            <span className="text-gray-800">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}


