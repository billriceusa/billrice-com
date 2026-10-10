import { PortableText } from '@/components/portable-text'
import { JsonLd } from '@/components/json-ld'
import { billRiceRef } from '@/lib/identity'
import type { BookDetail as Book } from '@/sanity/lib/types'

const BASE_URL = 'https://billrice.com'

/**
 * Values /book falls back to when Sanity is unreachable or a field is empty.
 * /books/[slug] passes none of these: a book that exists only as a Sanity
 * document has nothing to fall back to, and inventing copy for it would be
 * worse than rendering it thin.
 */
export type BookFallback = {
  title: string
  subtitle: string
  description: string
  publishedDate: string
  dateLabel: string
  freeReadUrl: string
  purchase: { url: string; label: string }
}

export function BookDetail({
  book,
  canonicalPath,
  fallback,
  eyebrow = 'Book',
}: {
  book: Book | null
  canonicalPath: string
  fallback?: BookFallback
  eyebrow?: string
}) {
  const title = book?.title || fallback?.title || ''
  const subtitle = book?.subtitle || fallback?.subtitle || null
  const authorName = book?.author?.name || 'Bill Rice'
  const freeReadUrl = book?.freeReadUrl || fallback?.freeReadUrl || null
  const purchaseLinks = book?.purchaseLinks?.length ? book.purchaseLinks : null

  const dateLabel = book?.publishedDate
    ? new Date(book.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      })
    : fallback?.dateLabel || null

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: title,
          ...(subtitle ? { alternateName: subtitle } : {}),
          // References the canonical Person by @id rather than inlining one.
          // This node used to carry its own { "@type": "Person", name, url },
          // which mints a fresh anonymous author beside the real entity — the
          // exact entity-splitting the essay pages were fixed for. Matching
          // names do not merge two nodes; a shared @id does. See
          // src/lib/identity.ts.
          author: billRiceRef,
          url: `${BASE_URL}${canonicalPath}`,
          ...(book?.publishedDate || fallback?.publishedDate
            ? { datePublished: book?.publishedDate || fallback?.publishedDate }
            : {}),
          bookEdition: 'First Edition',
          bookFormat: 'https://schema.org/EBook',
          ...(subtitle ? { description: subtitle } : {}),
          genre: 'Business',
          inLanguage: 'en',
        }}
      />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#E6BB00] uppercase tracking-wide mb-2">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-4 text-xl text-gray-500">{subtitle}</p>}
            <p className="mt-2 text-gray-400">
              By {authorName}
              {dateLabel ? ` · ${dateLabel}` : ''}
            </p>
          </div>

          {/* CTAs */}
          {(freeReadUrl || purchaseLinks || fallback?.purchase) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {freeReadUrl && (
                <a
                  href={freeReadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2 text-center"
                >
                  Read Free Online
                </a>
              )}
              {purchaseLinks
                ? purchaseLinks.map((link) => (
                    <a
                      key={link._key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                    >
                      {link.label || `Buy on ${link.platform}`}
                    </a>
                  ))
                : fallback?.purchase && (
                    <a
                      href={fallback.purchase.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                    >
                      {fallback.purchase.label}
                    </a>
                  )}
            </div>
          )}

          {/* Description */}
          {book?.description ? (
            <div className="prose prose-lg max-w-3xl mx-auto mb-16">
              <PortableText value={book.description} />
            </div>
          ) : (
            fallback?.description && (
              <div className="max-w-3xl mx-auto mb-16">
                <p className="text-lg text-gray-600">{fallback.description}</p>
              </div>
            )
          )}

          {/* Chapters */}
          {book?.chapters && book.chapters.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Chapters</h2>
              <div className="space-y-4">
                {book.chapters.map((chapter) => (
                  <div
                    key={chapter._key}
                    className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-semibold text-[#E6BB00] whitespace-nowrap">
                        Ch. {chapter.number}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                        {chapter.description && (
                          <p className="mt-1 text-sm text-gray-600">{chapter.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
