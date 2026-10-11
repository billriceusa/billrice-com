import Image from 'next/image'
import { JsonLd } from '@/components/json-ld'
import { billRiceRef } from '@/lib/identity'
import { type BookEntry, buyLabel, isReleased, statusLabel } from '@/lib/books'

const BASE_URL = 'https://billrice.com'

/** How many chapters the detail page shows before it stops. */
const TEASER_CHAPTERS = 6

/**
 * One book's page.
 *
 * Reads from the code registry in src/lib/books.ts rather than Sanity. The
 * Sanity `book` document carries a subtitle the book itself superseded, has no
 * cover asset, and has no record at all for Sales Team of One — so the dataset
 * is behind the shelf, not ahead of it. Book copy is also marketing copy that
 * ought to go through review like any other change to this domain.
 */
export function BookDetail({ book }: { book: BookEntry }) {
  const released = isReleased(book)
  const shownChapters = book.chapters.slice(0, TEASER_CHAPTERS)
  const remaining = book.chapters.length - shownChapters.length

  return (
    <div className="bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: book.title,
          alternateName: book.subtitle,
          // References the canonical Person by @id instead of inlining a second
          // anonymous author node beside the real entity. See src/lib/identity.ts.
          author: billRiceRef,
          url: `${BASE_URL}/book/${book.slug}`,
          datePublished: book.releaseDate,
          bookFormat: 'https://schema.org/EBook',
          description: book.blurb,
          genre: 'Business',
          inLanguage: 'en',
          image: `${BASE_URL}${book.cover.src}`,
        }}
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-12">
            <div className="shrink-0 mx-auto sm:mx-0">
              <Image
                src={book.cover.src}
                alt={book.cover.alt}
                width={book.cover.width}
                height={book.cover.height}
                className="w-48 h-auto rounded-lg shadow-md border border-gray-200"
                priority
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-[#E6BB00] uppercase tracking-wide">
                {statusLabel(book)}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{book.title}</h1>
              <p className="mt-3 text-xl text-gray-500">{book.subtitle}</p>
              <p className="mt-6 text-lg text-gray-600">{book.blurb}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {book.amazonUrl && (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFD000] hover:bg-[#E6BB00] text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2 text-center"
                  >
                    {buyLabel(book)}
                  </a>
                )}
                {book.freeReadUrl && (
                  <a
                    href={book.freeReadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black hover:bg-black hover:text-white text-black px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
                  >
                    {book.freeReadLabel}
                  </a>
                )}
              </div>

              {!released && (
                <p className="mt-4 text-sm text-gray-500">
                  Pre-orders are delivered on release day.
                </p>
              )}
            </div>
          </div>

          {shownChapters.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Inside the book</h2>
              <p className="text-gray-500 mb-8">
                {remaining > 0
                  ? `The first ${shownChapters.length} of ${book.chapters.length} chapters.`
                  : `All ${book.chapters.length} chapters.`}
              </p>
              <div className="space-y-4">
                {shownChapters.map((chapter) => (
                  <div
                    key={chapter.number}
                    className="p-4 border border-gray-200 border-l-4 border-l-[#FFD000] rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-semibold text-[#E6BB00] whitespace-nowrap">
                        Ch. {chapter.number}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{chapter.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {remaining > 0 && (
                <p className="mt-6 text-gray-600">
                  {remaining} more {remaining === 1 ? 'chapter' : 'chapters'} in the full book.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
