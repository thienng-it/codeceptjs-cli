import * as p from '@clack/prompts'
import { Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { ensurePlaywrightBrowsers } from '../integrations/playwright.js'
import { ExitCode } from '../lib/errors.js'
import { renderTemplate } from '../lib/templates.js'

type HelperChoice = 'Appium' | 'Playwright' | 'Puppeteer' | 'TestCafe' | 'WebDriver'

interface InitAnswers {
  browsers: string[]
  helper: HelperChoice
  plugins: string[]
  testDir: string
  typescript: boolean
  url: string
}

export default class Init extends Command {
  static override description = 'Initialize a new CodeceptJS project with interactive setup'
  static override examples = [
    '<%= config.bin %> init',
    '<%= config.bin %> init --helper Playwright',
    '<%= config.bin %> init --test-dir ./e2e',
  ]
  static override flags = {
    helper: Flags.string({
      char: 'h',
      description: 'Testing helper to use',
      options: ['Playwright', 'WebDriver', 'Puppeteer', 'Appium', 'TestCafe'],
    }),
    'test-dir': Flags.string({
      char: 'd',
      default: './tests',
      description: 'Directory for test files',
    }),
    typescript: Flags.boolean({
      char: 't',
      default: true,
      description: 'Enable TypeScript for tests',
    }),
    yes: Flags.boolean({
      char: 'y',
      default: false,
      description: 'Accept all defaults without prompting',
    }),
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Init)

    p.intro(chalk.bgCyan.bold(' CodeceptJS CLI — Project Setup '))

    let answers: InitAnswers

    if (flags.yes) {
      answers = {
        browsers: ['chromium'],
        helper: (flags.helper as HelperChoice) ?? 'Playwright',
        plugins: ['screenshotOnFail', 'retryFailedStep'],
        testDir: flags['test-dir'],
        typescript: flags.typescript,
        url: 'http://localhost:3000',
      }
    } else {
      const result = await p.group(
        {
          browsers({ results }) {
            if (results.helper !== 'Playwright') return Promise.resolve([])
            return p.multiselect({
              initialValues: ['chromium'],
              message: 'Which browsers should be configured?',
              options: [
                { hint: 'default', label: 'Chromium', value: 'chromium' },
                { label: 'Firefox', value: 'firefox' },
                { label: 'WebKit', value: 'webkit' },
              ],
              required: true,
            })
          },
          helper: () =>
            p.select({
              initialValue: (flags.helper as HelperChoice) ?? 'Playwright',
              message: 'Which testing helper do you want to use?',
              options: [
                { hint: 'recommended', label: 'Playwright', value: 'Playwright' },
                { label: 'WebDriver', value: 'WebDriver' },
                { label: 'Puppeteer', value: 'Puppeteer' },
                { hint: 'mobile', label: 'Appium', value: 'Appium' },
                { label: 'TestCafe', value: 'TestCafe' },
              ],
            }),
          plugins: () =>
            p.multiselect({
              initialValues: ['screenshotOnFail', 'retryFailedStep'],
              message: 'Install additional plugins?',
              options: [
                {
                  hint: 'capture screenshots on failure',
                  label: 'screenshotOnFail',
                  value: 'screenshotOnFail',
                },
                {
                  hint: 'auto-retry failed steps',
                  label: 'retryFailedStep',
                  value: 'retryFailedStep',
                },
                { hint: 'advanced reporting', label: 'allure', value: 'allure' },
                { hint: 'reuse login sessions', label: 'autoLogin', value: 'autoLogin' },
                { hint: 'soft assertions', label: 'tryTo', value: 'tryTo' },
              ],
              required: false,
            }),
          testDir: () =>
            p.text({
              defaultValue: flags['test-dir'],
              message: 'Where should tests live?',
              placeholder: flags['test-dir'],
            }),
          typescript: () =>
            p.confirm({
              initialValue: flags.typescript,
              message: 'Enable TypeScript for tests?',
            }),
          url: () =>
            p.text({
              defaultValue: 'http://localhost:3000',
              message: 'What is your application base URL?',
              placeholder: 'http://localhost:3000',
            }),
        },
        {
          onCancel: () => {
            p.cancel('Setup cancelled.')
            this.exit(ExitCode.USER_CANCELLED)
          },
        },
      )

      answers = {
        browsers: (result.browsers ?? []) as string[],
        helper: result.helper as HelperChoice,
        plugins: (result.plugins ?? []) as string[],
        testDir: result.testDir as string,
        typescript: result.typescript as boolean,
        url: result.url as string,
      }
    }

    // Create test directory
    const testDir = join(process.cwd(), answers.testDir)
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true })
    }

    // Create output directory
    const outputDir = join(process.cwd(), 'output')
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    // Generate config file
    const ext = answers.typescript ? 'ts' : 'js'
    const configContent = renderTemplate('codecept.conf', {
      browsers: answers.browsers,
      ext,
      helper: answers.helper,
      plugins: answers.plugins,
      testDir: answers.testDir,
      typescript: answers.typescript,
      url: answers.url,
    })

    const configPath = join(process.cwd(), `codecept.conf.${ext}`)
    writeFileSync(configPath, configContent, 'utf8')
    p.log.success(`Created ${chalk.green(`codecept.conf.${ext}`)}`)

    // Generate first test file
    const testContent = renderTemplate('first-test', {
      typescript: answers.typescript,
      url: answers.url,
    })
    const testPath = join(testDir, `first.test.${ext}`)
    writeFileSync(testPath, testContent, 'utf8')
    p.log.success(`Created ${chalk.green(`${answers.testDir}/first.test.${ext}`)}`)

    // Install Playwright browsers if selected
    if (answers.helper === 'Playwright' && answers.browsers.length > 0) {
      await ensurePlaywrightBrowsers(answers.browsers as ('chromium' | 'firefox' | 'webkit')[])
    }

    // Generate steps.d.ts if TypeScript
    if (answers.typescript) {
      const stepsContent = renderTemplate('steps.d', { helper: answers.helper })
      writeFileSync(join(process.cwd(), 'steps.d.ts'), stepsContent, 'utf8')
      p.log.success(`Created ${chalk.green('steps.d.ts')}`)
    }

    p.outro(
      `${chalk.green('✔')} Project scaffolded! Run ${chalk.cyan('ccjs run')} to execute tests.`,
    )
  }
}
