import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

/** Config file names in order of priority */
const CONFIG_FILES = [
  'codecept.conf.ts',
  'codecept.conf.js',
  'codecept.conf.mjs',
  'codecept.conf.cjs',
] as const

/**
 * Search for a CodeceptJS config file in the given directory (or cwd).
 * Returns the absolute path to the first config found, or undefined.
 */
export function findConfig(dir?: string): string | undefined {
  const searchDir = dir ?? process.cwd()

  for (const file of CONFIG_FILES) {
    const fullPath = resolve(join(searchDir, file))
    if (existsSync(fullPath)) {
      return fullPath
    }
  }

  return undefined
}

/**
 * Read and return the raw text content of a config file.
 * Useful for validation without executing the config.
 */
export function loadRawConfig(configPath: string): string {
  return readFileSync(configPath, 'utf8')
}
