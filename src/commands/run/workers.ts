import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { execa } from 'execa'
import { cpus } from 'node:os'

import { findConfig } from '../../lib/config.js'
import { CliError, ExitCode } from '../../lib/errors.js'
import { createLogger } from '../../lib/logger.js'

export default class RunWorkers extends Command {
  static override description = 'Run tests in parallel with adaptive worker pooling'
  static override examples = [
    '<%= config.bin %> run workers',
    '<%= config.bin %> run workers --count 4',
    '<%= config.bin %> run workers --by pool',
    '<%= config.bin %> run workers --grep "@smoke"',
  ]
  static override flags = {
    by: Flags.string({
      default: 'pool',
      description: 'Test distribution strategy',
      options: ['test', 'suite', 'pool'],
    }),
    config: Flags.string({
      char: 'c',
      description: 'Path to codecept configuration file',
    }),
    count: Flags.integer({
      description: 'Number of worker threads',
    }),
    grep: Flags.string({
      char: 'g',
      description: 'Run tests matching pattern',
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(RunWorkers)
    const log = createLogger()

    const configPath = flags.config ?? findConfig()
    if (!configPath) {
      throw new CliError(
        'No codecept.conf.js/ts found. Run `ccjs init` to create one.',
        ExitCode.CONFIG_NOT_FOUND,
      )
    }

    // Adaptive worker count: use CPU count - 1, minimum 2
    const workerCount = flags.count ?? Math.max(2, cpus().length - 1)

    log.info(
      `Workers: ${chalk.cyan(workerCount.toString())} | Strategy: ${chalk.cyan(flags.by ?? 'pool')}`,
    )

    const args: string[] = ['run-workers', workerCount.toString()]

    if (flags.config) args.push('-c', flags.config)
    if (flags.by) args.push('--by', flags.by)
    if (flags.grep) args.push('--grep', flags.grep)

    log.info(`Running: ${chalk.cyan(`codeceptjs ${args.join(' ')}`)}`)
    log.divider()

    try {
      const result = await execa('npx', ['codeceptjs', ...args], {
        cwd: process.cwd(),
        env: {
          ...process.env,
          FORCE_COLOR: '1',
        },
        stdio: 'inherit',
      })

      if (result.exitCode !== 0) {
        this.exit(result.exitCode)
      }
    } catch (error: unknown) {
      const execError = error as { exitCode?: number; message?: string }
      if (execError.exitCode) {
        this.exit(execError.exitCode)
      }

      throw new CliError(
        `Worker execution failed: ${execError.message ?? 'Unknown error'}`,
        ExitCode.TEST_EXECUTION_FAILED,
      )
    }
  }
}
