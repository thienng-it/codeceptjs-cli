import { execa } from 'execa'
import ora from 'ora'

import { CliError, ExitCode } from '../lib/errors.js'

type BrowserName = 'chromium' | 'firefox' | 'webkit'

/**
 * Install Playwright browser binaries.
 * Called during `ccjs init` when Playwright is selected as the helper.
 */
export async function ensurePlaywrightBrowsers(browsers: BrowserName[]): Promise<void> {
    const spinner = ora({
        color: 'cyan',
        text: `Installing Playwright browsers: ${browsers.join(', ')}...`,
    }).start()

    try {
        await execa('npx', ['playwright', 'install', ...browsers], {
            cwd: process.cwd(),
        })
        spinner.succeed(`Playwright browsers installed: ${browsers.join(', ')}`)
    } catch (error: unknown) {
        spinner.fail('Failed to install Playwright browsers')
        const execError = error as { message?: string }
        throw new CliError(
            `Playwright browser installation failed: ${execError.message ?? 'Unknown error'}`,
            ExitCode.BROWSER_INSTALL_FAILED,
        )
    }
}

/**
 * Check if a specific Playwright browser is already installed.
 */
export async function isPlaywrightBrowserInstalled(browser: BrowserName): Promise<boolean> {
    try {
        await execa('npx', ['playwright', 'install', '--check', browser], {
            cwd: process.cwd(),
        })
        return true
    } catch {
        return false
    }
}
