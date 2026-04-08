import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="text-base font-semibold text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            aria-label="BillRice.com home"
          >
            Bill Rice
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm text-black hover:underline focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            >
              About
            </Link>
            <Link
              href="/book"
              className="text-sm text-black hover:underline focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            >
              Book
            </Link>
            <Link
              href="/blog"
              className="text-sm text-black hover:underline focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            >
              Blog
            </Link>
            <Link
              href="/now"
              className="text-sm text-black hover:underline focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            >
              Now
            </Link>
            <Link
              href="/contact"
              className="text-sm bg-[#FFD000] hover:bg-[#E6BB00] text-black px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-[#FFD000] focus:ring-offset-2"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
