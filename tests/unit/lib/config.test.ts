import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { findConfig, loadRawConfig } from '../../../src/lib/config.js'

describe('config', () => {
  describe('findConfig', () => {
    it('should return undefined when no config exists', () => {
      const tmpDir = mkdtempSync(join(tmpdir(), 'ccjs-test-'))
      try {
        const result = findConfig(tmpDir)
        expect(result).toBeUndefined()
      } finally {
        rmSync(tmpDir, { recursive: true })
      }
    })

    it('should find codecept.conf.ts first', () => {
      const tmpDir = mkdtempSync(join(tmpdir(), 'ccjs-test-'))
      try {
        writeFileSync(join(tmpDir, 'codecept.conf.ts'), 'export default {}')
        writeFileSync(join(tmpDir, 'codecept.conf.js'), 'module.exports = {}')

        const result = findConfig(tmpDir)
        expect(result).toContain('codecept.conf.ts')
      } finally {
        rmSync(tmpDir, { recursive: true })
      }
    })

    it('should find codecept.conf.js when ts is not present', () => {
      const tmpDir = mkdtempSync(join(tmpdir(), 'ccjs-test-'))
      try {
        writeFileSync(join(tmpDir, 'codecept.conf.js'), 'module.exports = {}')

        const result = findConfig(tmpDir)
        expect(result).toContain('codecept.conf.js')
      } finally {
        rmSync(tmpDir, { recursive: true })
      }
    })
  })

  describe('loadRawConfig', () => {
    it('should return file content as string', () => {
      const tmpDir = mkdtempSync(join(tmpdir(), 'ccjs-test-'))
      try {
        const content = 'export const config = { name: "test" }'
        writeFileSync(join(tmpDir, 'codecept.conf.ts'), content)

        const result = loadRawConfig(join(tmpDir, 'codecept.conf.ts'))
        expect(result).toBe(content)
      } finally {
        rmSync(tmpDir, { recursive: true })
      }
    })
  })
})
