import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-8 bg-gray-100 border-t border-gray-200" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Bill Rice. All rights reserved.</p>
          <p className="mt-2">
            <Link
              href="/now"
              className="text-black hover:text-black underline"
              aria-label="Visit Bill Rice&apos;s now page"
            >
              See what I&apos;m working on now
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
