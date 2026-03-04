import * as p from '@clack/prompts'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { findConfig } from '../../lib/config.js'
import { CliError, ExitCode } from '../../lib/errors.js'
import { renderTemplate } from '../../lib/templates.js'

export default class GenerateTest extends Command {
    static override description = 'Generate a new test file with interactive prompts'
static override examples = [
        '<%= config.bin %> generate test',
        '<%= config.bin %> generate test --name login',
        '<%= config.bin %> generate test --name login --feature "User Authentication"',
    ]
static override flags = {
        feature: Flags.string({
            char: 'f',
            description: 'Feature name for the test',
        }),
        name: Flags.string({
            char: 'n',
            description: 'Test file name (without extension)',
        }),
        'output-dir': Flags.string({
            char: 'o',
            default: './tests',
            description: 'Directory for the test file',
        }),
    }

    async run(): Promise<void> {
        const { flags } = await this.parse(GenerateTest)

        const configPath = findConfig()
        if (!configPath) {
            throw new CliError(
                'No codecept.conf.js/ts found. Run `ccjs init` first.',
                ExitCode.CONFIG_NOT_FOUND,
            )
        }

        let testName = flags.name
        let featureName = flags.feature

        if (!testName) {
            const nameResult = await p.text({
                message: 'What is the test name?',
                placeholder: 'login',
                validate(value) {
                    if (!value.trim()) return 'Test name is required'
                    if (!/^[\w-]+$/.test(value)) return 'Use only letters, numbers, hyphens, and underscores'
                    
                },
            })

            if (p.isCancel(nameResult)) {
                p.cancel('Generation cancelled.')
                this.exit(ExitCode.USER_CANCELLED)
            }

            testName = nameResult
        }

        if (!featureName) {
            const featureResult = await p.text({
                defaultValue: testName.charAt(0).toUpperCase() + testName.slice(1),
                message: 'What is the feature name?',
                placeholder: testName.charAt(0).toUpperCase() + testName.slice(1),
            })

            if (p.isCancel(featureResult)) {
                p.cancel('Generation cancelled.')
                this.exit(ExitCode.USER_CANCELLED)
            }

            featureName = featureResult
        }

        const ext = configPath.endsWith('.ts') ? 'ts' : 'js'
        const content = renderTemplate('test', {
            featureName,
            testName,
            typescript: ext === 'ts',
        })

        const outputPath = join(process.cwd(), flags['output-dir'], `${testName}.test.${ext}`)
        writeFileSync(outputPath, content, 'utf8')

        this.log(`\n${chalk.green('✔')} Created ${chalk.cyan(outputPath)}`)
    }
}
