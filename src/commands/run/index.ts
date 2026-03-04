import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { execa } from 'execa'

import { findConfig } from '../../lib/config.js'
import { CliError, ExitCode } from '../../lib/errors.js'
import { createLogger } from '../../lib/logger.js'

export default class Run extends Command {
    static override description = 'Execute CodeceptJS tests with enhanced output'
static override examples = [
        '<%= config.bin %> run',
        '<%= config.bin %> run --grep "login"',
        '<%= config.bin %> run --steps',
        '<%= config.bin %> run --debug',
        '<%= config.bin %> run test/login.test.ts',
    ]
static override flags = {
        config: Flags.string({
            char: 'c',
            description: 'Path to codecept configuration file',
        }),
        debug: Flags.boolean({
            default: false,
            description: 'Run tests in debug mode',
        }),
        grep: Flags.string({
            char: 'g',
            description: 'Run tests matching pattern',
        }),
        invert: Flags.boolean({
            default: false,
            description: 'Invert grep pattern matching',
        }),
        override: Flags.string({
            char: 'o',
            description: 'Override config with JSON string',
        }),
        reporter: Flags.string({
            char: 'r',
            description: 'Mocha reporter to use',
        }),
        shuffle: Flags.boolean({
            default: false,
            description: 'Run test files in shuffled order',
        }),
        steps: Flags.boolean({
            char: 's',
            default: false,
            description: 'Show step-by-step output',
        }),
        verbose: Flags.boolean({
            char: 'v',
            default: false,
            description: 'Show verbose output',
        }),
    }
static override strict = false

    async run(): Promise<void> {
        const { argv, flags } = await this.parse(Run)
        const log = createLogger()

        // Find config file
        const configPath = flags.config ?? findConfig()
        if (!configPath) {
            throw new CliError(
                'No codecept.conf.js/ts found. Run `ccjs init` to create one.',
                ExitCode.CONFIG_NOT_FOUND,
            )
        }

        log.info(`Using config: ${chalk.dim(configPath)}`)

        // Build codeceptjs command args
        const args: string[] = ['run']

        if (flags.config) args.push('-c', flags.config)
        if (flags.grep) args.push('--grep', flags.grep)
        if (flags.invert) args.push('--invert')
        if (flags.steps) args.push('--steps')
        if (flags.debug) args.push('--debug')
        if (flags.verbose) args.push('--verbose')
        if (flags.shuffle) args.push('--shuffle')
        if (flags.reporter) args.push('--reporter', flags.reporter)
        if (flags.override) args.push('--override', flags.override)

        // Append any pass-through args (test file paths, etc.)
        for (const arg of (argv as string[])) {
            args.push(arg)
        }

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
                `Test execution failed: ${execError.message ?? 'Unknown error'}`,
                ExitCode.TEST_EXECUTION_FAILED,
            )
        }
    }
}
