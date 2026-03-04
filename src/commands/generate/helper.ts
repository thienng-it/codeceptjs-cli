import * as p from '@clack/prompts'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { findConfig } from '../../lib/config.js'
import { CliError, ExitCode } from '../../lib/errors.js'
import { renderTemplate } from '../../lib/templates.js'

export default class GenerateHelper extends Command {
    static override description = 'Generate a new custom helper file'
static override examples = [
        '<%= config.bin %> generate helper',
        '<%= config.bin %> generate helper --name DataHelper',
    ]
static override flags = {
        name: Flags.string({
            char: 'n',
            description: 'Helper name',
        }),
        'output-dir': Flags.string({
            char: 'o',
            default: './helpers',
            description: 'Directory for the helper file',
        }),
    }

    async run(): Promise<void> {
        const { flags } = await this.parse(GenerateHelper)

        const configPath = findConfig()
        if (!configPath) {
            throw new CliError(
                'No codecept.conf.js/ts found. Run `ccjs init` first.',
                ExitCode.CONFIG_NOT_FOUND,
            )
        }

        let helperName = flags.name

        if (!helperName) {
            const nameResult = await p.text({
                message: 'What is the helper name?',
                placeholder: 'DataHelper',
                validate(value) {
                    if (!value.trim()) return 'Helper name is required'
                    if (!/^[A-Z][\w]*$/.test(value)) return 'Use PascalCase (e.g., DataHelper)'
                    
                },
            })

            if (p.isCancel(nameResult)) {
                p.cancel('Generation cancelled.')
                this.exit(ExitCode.USER_CANCELLED)
            }

            helperName = nameResult
        }

        const ext = configPath.endsWith('.ts') ? 'ts' : 'js'
        const content = renderTemplate('helper', {
            helperName,
            typescript: ext === 'ts',
        })

        const outputDir = join(process.cwd(), flags['output-dir'])
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true })
        }

        const outputPath = join(outputDir, `${helperName}.${ext}`)
        writeFileSync(outputPath, content, 'utf8')

        this.log(`\n${chalk.green('✔')} Created ${chalk.cyan(outputPath)}`)
    }
}
