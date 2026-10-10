// Next 16 removed the `next lint` command, and with it the only consumer of the
// old eslintrc-style config this file used to build through FlatCompat. Keeping
// FlatCompat was not merely redundant, it was broken: translating
// `next/core-web-vitals` through the compat layer produced a config object with
// a cycle in it (plugins.react closes back on itself), and eslintrc's config
// validator JSON.stringify's the config to format errors. That threw
// "TypeError: Converting circular structure to JSON" before a single file was
// linted, so `eslint .` could not run at all.
//
// eslint-config-next 16 ships real flat-config arrays, so they are spread
// directly here and @eslint/eslintrc is no longer needed.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      // Excluded from tsconfig.json to keep Vercel builds green (see BACKLOG);
      // linting them with the typed config would reintroduce exactly that
      // problem, so they stay out of both.
      'scripts/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
]

export default eslintConfig
