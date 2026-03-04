import { existsSync } from 'node:fs'
import { arch, platform, release } from 'node:os'
import { join } from 'node:path'

export interface SystemInfo {
    arch: string
    nodeVersion: string
    platform: string
    release: string
}

/**
 * Gather system information for diagnostics and the doctor command.
 */
export function getSystemInfo(): SystemInfo {
    return {
        arch: arch(),
        nodeVersion: process.versions.node ?? 'unknown',
        platform: platform(),
        release: release(),
    }
}

/**
 * Attempt to resolve the installed path of an npm package by walking up
 * from cwd looking for node_modules/<pkgName>.
 */
export function resolvePackagePath(pkgName: string): string | undefined {
    let dir = process.cwd()

    // Walk up directories looking for node_modules
     
    while (true) {
        const candidate = join(dir, 'node_modules', pkgName)
        if (existsSync(candidate)) {
            return candidate
        }

        const parent = join(dir, '..')
        if (parent === dir) {
            // Reached filesystem root
            return undefined
        }

        dir = parent
    }
}
