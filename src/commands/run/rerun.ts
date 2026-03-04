import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { execa } from 'execa'

import { findConfig } from '../../lib/config.js'
import { CliError, ExitCode } from '../../lib/errors.js'
import { createLogger } from '../../lib/logger.js'

export default class RunRerun extends Command {
    static override description = 'Run tests multiple times to detect flaky tests'
static override examples = [
        '<%= config.bin %> run rerun',
        '<%= config.bin %> run rerun --min-success 3 --max-reruns 5',
    ]
static override flags = {
        config: Flags.string({
            char: 'c',
            description: 'Path to codecept configuration file',
        }),
        'max-reruns': Flags.integer({
            default: 4,
            description: 'Maximum number of rerun attempts',
        }),
        'min-success': Flags.integer({
            default: 2,
            description: 'Minimum number of successful runs required',
        }),
    }

    async run(): Promise<void> {
        const { flags } = await this.parse(RunRerun)
        const log = createLogger()

        const configPath = flags.config ?? findConfig()
        if (!configPath) {
            throw new CliError(
                'No codecept.conf.js/ts found. Run `ccjs init` to create one.',
                ExitCode.CONFIG_NOT_FOUND,
            )
        }

        log.info(
            `Rerun config: min-success=${chalk.cyan(flags['min-success'].toString())} max-reruns=${chalk.cyan(flags['max-reruns'].toString())}`,
        )

        const args: string[] = ['run-rerun']
        if (flags.config) args.push('-c', flags.config)

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
                `Rerun execution failed: ${execError.message ?? 'Unknown error'}`,
                ExitCode.TEST_EXECUTION_FAILED,
            )
        }
    }
}
