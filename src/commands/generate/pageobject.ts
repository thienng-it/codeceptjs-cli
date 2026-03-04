import * as p from '@clack/prompts'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { findConfig } from '../../lib/config.js'
import { CliError, ExitCode } from '../../lib/errors.js'
import { renderTemplate } from '../../lib/templates.js'

export default class GeneratePageobject extends Command {
  static override description = 'Generate a new page object file'
  static override examples = [
    '<%= config.bin %> generate pageobject',
    '<%= config.bin %> generate pageobject --name LoginPage',
  ]
  static override flags = {
    name: Flags.string({
      char: 'n',
      description: 'Page object name',
    }),
    'output-dir': Flags.string({
      char: 'o',
      default: './pages',
      description: 'Directory for the page object file',
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(GeneratePageobject)

    const configPath = findConfig()
    if (!configPath) {
      throw new CliError(
        'No codecept.conf.js/ts found. Run `ccjs init` first.',
        ExitCode.CONFIG_NOT_FOUND,
      )
    }

    let pageName = flags.name

    if (!pageName) {
      const nameResult = await p.text({
        message: 'What is the page object name?',
        placeholder: 'LoginPage',
        validate(value) {
          if (!value.trim()) return 'Page object name is required'
          if (!/^[A-Z][\w]*$/.test(value)) return 'Use PascalCase (e.g., LoginPage)'
        },
      })

      if (p.isCancel(nameResult)) {
        p.cancel('Generation cancelled.')
        this.exit(ExitCode.USER_CANCELLED)
      }

      pageName = nameResult
    }

    const ext = configPath.endsWith('.ts') ? 'ts' : 'js'
    const content = renderTemplate('pageobject', {
      pageName,
      typescript: ext === 'ts',
    })

    const outputDir = join(process.cwd(), flags['output-dir'])
    const { existsSync, mkdirSync } = await import('node:fs')
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    const outputPath = join(outputDir, `${pageName}.${ext}`)
    writeFileSync(outputPath, content, 'utf8')

    this.log(`\n${chalk.green('✔')} Created ${chalk.cyan(outputPath)}`)
  }
}
