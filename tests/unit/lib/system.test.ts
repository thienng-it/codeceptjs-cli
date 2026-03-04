import { describe, expect, it } from 'vitest'

import { getSystemInfo, resolvePackagePath } from '../../../src/lib/system.js'

describe('system', () => {
    describe('getSystemInfo', () => {
        it('should return platform, arch, nodeVersion, and release', () => {
            const info = getSystemInfo()

            expect(info).toHaveProperty('platform')
            expect(info).toHaveProperty('arch')
            expect(info).toHaveProperty('nodeVersion')
            expect(info).toHaveProperty('release')
            expect(info.nodeVersion).toMatch(/^\d+\.\d+\.\d+$/)
        })

        it('should report the correct platform', () => {
            const info = getSystemInfo()
            expect(['darwin', 'linux', 'win32']).toContain(info.platform)
        })
    })

    describe('resolvePackagePath', () => {
        it('should find typescript package (installed as devDep)', () => {
            const result = resolvePackagePath('typescript')
            expect(result).toBeDefined()
            expect(result).toContain('node_modules/typescript')
        })

        it('should return undefined for non-existent package', () => {
            const result = resolvePackagePath('definitely-not-a-real-package-123456')
            expect(result).toBeUndefined()
        })
    })
})
