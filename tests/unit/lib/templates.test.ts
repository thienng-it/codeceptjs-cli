import { describe, expect, it } from 'vitest'

import { getTemplateNames, renderTemplate } from '../../../src/lib/templates.js'

describe('templates', () => {
  describe('getTemplateNames', () => {
    it('should return all available template names', () => {
      const names = getTemplateNames()
      expect(names).toContain('codecept.conf')
      expect(names).toContain('first-test')
      expect(names).toContain('test')
      expect(names).toContain('pageobject')
      expect(names).toContain('helper')
      expect(names).toContain('steps.d')
      expect(names).toContain('package.json')
    })
  })

  describe('renderTemplate', () => {
    it('should throw for unknown template', () => {
      expect(() => renderTemplate('nonexistent', {})).toThrow('Template "nonexistent" not found')
    })

    it('should render codecept.conf template with Playwright', () => {
      const result = renderTemplate('codecept.conf', {
        browsers: ['chromium'],
        ext: 'ts',
        helper: 'Playwright',
        plugins: ['screenshotOnFail', 'retryFailedStep'],
        testDir: './tests',
        typescript: true,
        url: 'http://localhost:3000',
      })

      expect(result).toContain('Playwright')
      expect(result).toContain('chromium')
      expect(result).toContain('http://localhost:3000')
      expect(result).toContain('screenshotOnFail')
      expect(result).toContain('retryFailedStep')
      expect(result).toContain('export const config: CodeceptJS.MainConfig')
      expect(result).not.toContain('@codeceptjs/configure')
    })

    it('should render codecept.conf template with WebDriver (JS)', () => {
      const result = renderTemplate('codecept.conf', {
        browsers: [],
        ext: 'js',
        helper: 'WebDriver',
        plugins: [],
        testDir: './e2e',
        typescript: false,
        url: 'http://localhost:8080',
      })

      expect(result).toContain('WebDriver')
      expect(result).toContain('exports.config')
      expect(result).not.toContain('@codeceptjs/configure')
      expect(result).toContain('http://localhost:8080')
    })

    it('should render test template', () => {
      const result = renderTemplate('test', {
        featureName: 'Login',
        testName: 'login',
        typescript: true,
      })

      expect(result).toContain("Feature('Login')")
      expect(result).toContain('login - basic test')
    })

    it('should render first-test template', () => {
      const result = renderTemplate('first-test', { typescript: true, url: '/' })
      expect(result).toContain("Feature('Welcome')")
      expect(result).toContain("I.amOnPage('/')")
    })

    it('should render pageobject template (TS)', () => {
      const result = renderTemplate('pageobject', {
        pageName: 'LoginPage',
        typescript: true,
      })

      expect(result).toContain('const { I } = inject()')
      expect(result).toContain('export =')
    })

    it('should render helper template (TS)', () => {
      const result = renderTemplate('helper', {
        helperName: 'DataHelper',
        typescript: true,
      })

      expect(result).toContain('class DataHelper extends Helper')
      expect(result).toContain('export = DataHelper')
    })

    it('should render steps.d template', () => {
      const result = renderTemplate('steps.d', {})
      expect(result).toContain("/// <reference types='codeceptjs' />")
      expect(result).toContain('interface Methods extends Playwright')
    })

    it('should render steps.d template with custom helper', () => {
      const result = renderTemplate('steps.d', { helper: 'WebDriver' })
      expect(result).toContain('interface Methods extends WebDriver')
      expect(result).not.toContain('Playwright')
    })

    it('should render package.json template with Playwright (TS)', () => {
      const result = renderTemplate('package.json', {
        helper: 'Playwright',
        projectName: 'my-test-project',
        typescript: true,
      })

      const pkg = JSON.parse(result)
      expect(pkg.name).toBe('my-test-project')
      expect(pkg.dependencies.codeceptjs).toBe('^3.6.0')
      expect(pkg.dependencies.playwright).toBe('latest')
      expect(pkg.devDependencies.typescript).toBe('^5')
      expect(pkg.scripts.test).toBe('ccjs run')
    })

    it('should render package.json template with WebDriver (JS)', () => {
      const result = renderTemplate('package.json', {
        helper: 'WebDriver',
        projectName: 'wd-project',
        typescript: false,
      })

      const pkg = JSON.parse(result)
      expect(pkg.name).toBe('wd-project')
      expect(pkg.dependencies.codeceptjs).toBe('^3.6.0')
      expect(pkg.dependencies.webdriverio).toBe('latest')
      expect(pkg.devDependencies).toBeUndefined()
    })
  })
})
