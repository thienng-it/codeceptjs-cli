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
      expect(result).toContain('import { setHeadlessWhen')
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
      expect(result).toContain("require('@codeceptjs/configure')")
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
  })
})
