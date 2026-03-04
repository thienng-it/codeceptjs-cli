/**
 * Shared TypeScript types for the CodeceptJS CLI config schema.
 */

export type HelperName = 'Appium' | 'Playwright' | 'Puppeteer' | 'TestCafe' | 'WebDriver'

export type BrowserName = 'chromium' | 'firefox' | 'webkit'

export type PluginName = 'allure' | 'autoLogin' | 'retryFailedStep' | 'screenshotOnFail' | 'tryTo'

export interface HelperConfig {
  [key: string]: unknown
  browser?: string
  show?: boolean
  url: string
}

export interface PluginConfig {
  [key: string]: unknown
  enabled: boolean
}

export interface CodeceptConfig {
  helpers: Record<HelperName, HelperConfig>
  include: Record<string, string>
  name: string
  output: string
  plugins: Record<string, PluginConfig>
  tests: string
}
