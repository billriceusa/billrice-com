'use client'

import { PortableText as PortableTextRenderer, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    table: ({ value }: { value: { caption?: string; rows?: { cells?: string[] }[] } }) => {
      const rows = value?.rows || []
      if (rows.length === 0) return null
      const [headerRow, ...bodyRows] = rows
      return (
        <figure className="my-8">
          {value.caption && (
            <figcaption className="mb-2 text-sm font-medium text-gray-700">
              {value.caption}
            </figcaption>
          )}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse text-sm">
              {headerRow?.cells && (
                <thead className="bg-gray-50">
                  <tr>
                    {headerRow.cells.map((cell, i) => (
                      <th key={i} className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-gray-100 last:border-0">
                    {(row.cells || []).map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 align-top text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      )
    },
    codeBlock: ({ value }: { value: { code: string; language?: string; filename?: string } }) => {
      const code = value?.code || ''
      const label = value?.filename || value?.language
      return (
        <figure className="my-6 overflow-hidden rounded-lg border border-gray-200 bg-zinc-900">
          {label && (
            <figcaption className="border-b border-zinc-800 bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-400">
              {label}
            </figcaption>
          )}
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="font-mono text-zinc-100">{code}</code>
          </pre>
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 text-gray-600 mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#FFD000] pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-black underline hover:text-[#E6BB00] transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600">{children}</ol>
    ),
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableText({ value }: { value: any }) {
  return <PortableTextRenderer value={value} components={components} />
}
