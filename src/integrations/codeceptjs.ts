import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { resolvePackagePath } from '../lib/system.js'

/**
 * Check if CodeceptJS is installed in the current project.
 */
export function isCodeceptJSInstalled(): boolean {
  return resolvePackagePath('codeceptjs') !== undefined
}

/**
 * Resolve the command and args needed to run the local CodeceptJS binary.
 * Prefers the local `node_modules/.bin/codeceptjs` so that sibling
 * packages (e.g. playwright) are visible at runtime.
 * Falls back to `npx codeceptjs` when no local install is found.
 */
export function resolveCodeceptBin(): { args: string[]; command: string } {
  const ccjsPath = resolvePackagePath('codeceptjs')
  if (ccjsPath) {
    // Walk up from node_modules/codeceptjs to node_modules/.bin
    const binPath = join(ccjsPath, '..', '.bin', 'codeceptjs')
    if (existsSync(binPath)) {
      return { args: [], command: binPath }
    }
  }

  return { args: ['codeceptjs'], command: 'npx' }
}

/**
 * Get the installed CodeceptJS version, or undefined if not installed.
 */
export async function getCodeceptJSVersion(): Promise<string | undefined> {
  const ccjsPath = resolvePackagePath('codeceptjs')
  if (!ccjsPath) return undefined

  try {
    const { readFileSync } = await import('node:fs')
    const { join } = await import('node:path')
    const pkgJson = JSON.parse(readFileSync(join(ccjsPath, 'package.json'), 'utf8'))
    return pkgJson.version as string
  } catch {
    return undefined
  }
}
