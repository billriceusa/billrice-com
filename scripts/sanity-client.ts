/**
 * The one Sanity client every script in this directory uses.
 *
 * Why this exists rather than twelve copies of createClient:
 *
 * Each script used to build its own client with
 * `projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki'`. That
 * reads as a sensible default and is the opposite: the environment wins, and
 * ten of these scripts mutate the published dataset. A shell that exports a
 * different NEXT_PUBLIC_SANITY_PROJECT_ID — a sibling project in the estate, a
 * stale value, a cloud container seeded for something else — silently points
 * createOrReplace at the wrong dataset. There is no confirmation step and no
 * dry run: the first sign of trouble is content appearing somewhere it should
 * not, or not appearing where it should.
 *
 * This is not hypothetical. The container this module was written in had
 * NEXT_PUBLIC_SANITY_PROJECT_ID set to a different project entirely, so every
 * script in here was one command away from writing to it.
 *
 * So the project and dataset are pinned to literals below, and a disagreeing
 * environment variable is a hard stop rather than an override. Refusing to run
 * is the correct outcome: a script that writes Bill's canonical content to an
 * unknown project cannot be undone from here.
 */

import { createClient } from 'next-sanity'

/** billrice.com's Sanity project. Pinned, not configurable. */
export const PROJECT_ID = 'st1plnki'

/** The only dataset these scripts are allowed to touch. */
export const DATASET = 'production'

export const API_VERSION = '2026-03-21'

function assertEnvAgrees(name: string, pinned: string) {
  const fromEnv = process.env[name]
  if (fromEnv && fromEnv !== pinned) {
    console.error(
      `Refusing to run: ${name} is "${fromEnv}" but these scripts are pinned to "${pinned}".\n` +
        `\n` +
        `These scripts write to the published dataset, so the environment does not get\n` +
        `to redirect them. Either unset ${name} for this command, or change the pinned\n` +
        `value in scripts/sanity-client.ts if the project really has moved.`
    )
    process.exit(1)
  }
}

/**
 * A client pinned to billrice.com's project, with a write token.
 *
 * Exits rather than returning when the environment is wrong or the token is
 * missing, so a caller never holds a client it cannot trust.
 */
export function sanityScriptClient(options: { perspective?: 'raw' } = {}) {
  assertEnvAgrees('NEXT_PUBLIC_SANITY_PROJECT_ID', PROJECT_ID)
  assertEnvAgrees('NEXT_PUBLIC_SANITY_DATASET', DATASET)

  const token = process.env.SANITY_API_TOKEN
  if (!token) {
    // Every script used to say "Set it in .env.local", which does not work:
    // tsx never reads .env.local, so following that advice fails in a way that
    // looks like a bad token. The Sanity CLI's own login token is on disk after
    // `sanity login` and is what actually works.
    console.error(
      'Missing SANITY_API_TOKEN.\n' +
        '\n' +
        'tsx does NOT read .env.local, so putting it there does nothing. Export it, or\n' +
        'pass the Sanity CLI login token inline:\n' +
        '\n' +
        '  SANITY_API_TOKEN=$(node -e "process.stdout.write(require(require(\'os\').homedir()+\'/.config/sanity/config.json\').authToken)") \\\n' +
        '    npx tsx scripts/<script>.ts\n' +
        '\n' +
        'Note the CLI login is Google (bill@billrice.com), not GitHub.'
    )
    process.exit(1)
  }

  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
    token,
    ...(options.perspective ? { perspective: options.perspective } : {}),
  })
}
