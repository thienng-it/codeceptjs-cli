import { resolvePackagePath } from '../lib/system.js'

/**
 * Check if CodeceptJS is installed in the current project.
 */
export function isCodeceptJSInstalled(): boolean {
    return resolvePackagePath('codeceptjs') !== undefined
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
