import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import Table from 'cli-table3'
import figures from 'figures'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { findConfig } from '../lib/config.js'
import { createLogger } from '../lib/logger.js'
import { getSystemInfo } from '../lib/system.js'

interface CheckResult {
  detail: string
  label: string
  ok: boolean
}

export default class Doctor extends Command {
  static override description =
    'Check environment health: Node.js, CodeceptJS, browsers, and config'
  static override examples = ['<%= config.bin %> doctor']
  static override flags = {
    config: Flags.string({
      char: 'c',
      description: 'Path to codecept configuration file',
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Doctor)
    const log = createLogger()

    log.info(chalk.bold('CodeceptJS CLI — Environment Health Check\n'))

    const checks: CheckResult[] = []

    // 1. Node.js version
    const sysInfo = getSystemInfo()
    const { nodeVersion } = sysInfo
    const nodeMajor = Number.parseInt(nodeVersion.split('.')[0] ?? '0', 10)
    checks.push({
      detail: `v${nodeVersion}${nodeMajor < 22 ? ' (requires >= 22)' : ''}`,
      label: 'Node.js version',
      ok: nodeMajor >= 22,
    })

    // 2. CodeceptJS installed
    let codeceptVersion = 'not found'
    try {
      const { resolvePackagePath } = await import('../lib/system.js')
      const ccjsPath = resolvePackagePath('codeceptjs')
      if (ccjsPath) {
        const pkg = await import(join(ccjsPath, 'package.json'), { with: { type: 'json' } })
        codeceptVersion = `v${pkg.default.version}`
      }
    } catch {
      // Not found
    }

    checks.push({
      detail: codeceptVersion,
      label: 'CodeceptJS',
      ok: codeceptVersion !== 'not found',
    })

    // 3. Config file exists
    const configPath = flags.config ?? findConfig()
    checks.push({
      detail: configPath ?? 'not found — run `ccjs init`',
      label: 'Config file',
      ok: configPath !== undefined,
    })

    // 4. Test directory exists
    const testDirs = ['./tests', './test', './e2e', './specs']
    const foundTestDir = testDirs.find((d) => existsSync(join(process.cwd(), d)))
    checks.push({
      detail: foundTestDir ?? 'not found',
      label: 'Test directory',
      ok: foundTestDir !== undefined,
    })

    // 5. Output directory
    const outputDir = existsSync(join(process.cwd(), 'output'))
    checks.push(
      {
        detail: outputDir ? './output' : 'not found',
        label: 'Output directory',
        ok: outputDir,
      },
      {
        detail: `${sysInfo.platform} ${sysInfo.arch}`,
        label: 'Platform',
        ok: true,
      },
    )

    // Render table
    const table = new Table({
      head: ['', 'Check', 'Status'],
      style: { head: ['cyan'] },
    })

    let allPassed = true
    for (const check of checks) {
      const icon = check.ok ? chalk.green(figures.tick) : chalk.red(figures.cross)

      if (!check.ok) allPassed = false

      table.push([icon, check.label, check.detail])
    }

    this.log(table.toString())
    this.log()

    if (allPassed) {
      log.success('All checks passed! Your environment is ready.')
    } else {
      log.warning('Some checks failed. Please fix the issues above.')
    }
  }
}
