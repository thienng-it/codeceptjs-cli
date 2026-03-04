import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { execa } from 'execa'

import { resolveCodeceptBin } from '../integrations/codeceptjs.js'
import { findConfig } from '../lib/config.js'
import { CliError, ExitCode } from '../lib/errors.js'
import { createLogger } from '../lib/logger.js'

export default class DryRun extends Command {
  static override description = 'Print test scenarios without executing them'
  static override examples = [
    '<%= config.bin %> dry-run',
    '<%= config.bin %> dry-run --steps',
    '<%= config.bin %> dry-run --debug',
  ]
  static override flags = {
    bootstrap: Flags.boolean({
      default: false,
      description: 'Enable bootstrap script in dry-run mode',
    }),
    config: Flags.string({
      char: 'c',
      description: 'Path to codecept configuration file',
    }),
    debug: Flags.boolean({
      default: false,
      description: 'Show debug output',
    }),
    plugins: Flags.string({
      char: 'p',
      description: 'Enable specific plugins (comma-separated)',
    }),
    steps: Flags.boolean({
      char: 's',
      default: false,
      description: 'Show step-by-step output',
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(DryRun)
    const log = createLogger()

    const configPath = flags.config ?? findConfig()
    if (!configPath) {
      throw new CliError(
        'No codecept.conf.js/ts found. Run `ccjs init` to create one.',
        ExitCode.CONFIG_NOT_FOUND,
      )
    }

    log.info(`${chalk.dim('Dry run mode — no tests will be executed')}`)

    const args: string[] = ['dry-run']

    if (flags.config) args.push('-c', flags.config)
    if (flags.steps) args.push('--steps')
    if (flags.debug) args.push('--debug')
    if (flags.bootstrap) args.push('--bootstrap')
    if (flags.plugins) args.push('-p', flags.plugins)

    log.info(`Running: ${chalk.cyan(`codeceptjs ${args.join(' ')}`)}`)
    log.divider()

    const bin = resolveCodeceptBin()

    try {
      await execa(bin.command, [...bin.args, ...args], {
        cwd: process.cwd(),
        env: {
          ...process.env,
          FORCE_COLOR: '1',
        },
        stdio: 'inherit',
      })
    } catch (error: unknown) {
      const execError = error as { exitCode?: number; message?: string }
      if (execError.exitCode) {
        this.exit(execError.exitCode)
      }

      throw new CliError(
        `Dry run failed: ${execError.message ?? 'Unknown error'}`,
        ExitCode.TEST_EXECUTION_FAILED,
      )
    }
  }
}
