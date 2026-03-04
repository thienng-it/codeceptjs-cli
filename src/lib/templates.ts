/**
 * Template rendering engine.
 *
 * We use a simple string interpolation approach instead of Handlebars
 * to keep the bundle lean. Templates are embedded as functions.
 */

type TemplateData = Record<string, unknown>

type TemplateFn = (data: TemplateData) => string

const templates: Record<string, TemplateFn> = {
  'codecept.conf'(data) {
    const helper = data.helper as string
    const browsers = data.browsers as string[]
    const testDir = data.testDir as string
    const plugins = data.plugins as string[]
    const url = data.url as string
    const ext = data.ext as string

    const helperConfig =
      helper === 'Playwright'
        ? `    Playwright: {
      browser: '${browsers[0] ?? 'chromium'}',
      url: '${url}',
      show: !process.env.CI,
    }`
        : helper === 'WebDriver'
          ? `    WebDriver: {
      url: '${url}',
      browser: 'chrome',
    }`
          : helper === 'Puppeteer'
            ? `    Puppeteer: {
      url: '${url}',
      show: !process.env.CI,
    }`
            : `    ${helper}: {
      url: '${url}',
    }`

    const pluginLines = plugins.map((p) => `    ${p}: { enabled: true },`).join('\n')

    return `${ext === 'ts' ? 'export const config: CodeceptJS.MainConfig = ' : 'exports.config = '}{
  tests: '${testDir}/**/*.test.${ext}',
  output: './output',
  helpers: {
${helperConfig}
  },
  plugins: {
${pluginLines}
  },
  include: {},
  name: '${process.cwd().split('/').pop() ?? 'codeceptjs-project'}',
};
`
  },

  'first-test'() {
    return `Feature('Welcome');

Scenario('test welcome page', ({ I }) => {
  I.amOnPage('/');
  I.see('Welcome');
});
`
  },

  helper(data) {
    const helperName = data.helperName as string
    const ts = data.typescript as boolean

    if (ts) {
      return `const Helper = require('@codeceptjs/helper');

class ${helperName} extends Helper {
  /**
   * Define custom helper methods here.
   *
   * @example
   * async myMethod() {
   *   const page = this.helpers.Playwright.page;
   *   // custom logic
   * }
   */
}

export = ${helperName};
`
    }

    return `const Helper = require('@codeceptjs/helper');

class ${helperName} extends Helper {
  /**
   * Define custom helper methods here.
   *
   * @example
   * async myMethod() {
   *   const page = this.helpers.Playwright.page;
   *   // custom logic
   * }
   */
}

module.exports = ${helperName};
`
  },

  pageobject(data) {
    const ts = data.typescript as boolean

    if (ts) {
      return `const { I } = inject();

export = {
  // Insert your locators and methods here

  // Locators
  fields: {
    // example: '#username',
  },
  buttons: {
    // example: 'Submit',
  },

  // Methods
  // example:
  // async login(username: string, password: string) {
  //   I.fillField(this.fields.username, username);
  //   I.click(this.buttons.submit);
  // },
};
`
    }

    return `const { I } = inject();

module.exports = {
  // Insert your locators and methods here

  // Locators
  fields: {
    // example: '#username',
  },
  buttons: {
    // example: 'Submit',
  },

  // Methods
  // example:
  // async login(username, password) {
  //   I.fillField(this.fields.username, username);
  //   I.click(this.buttons.submit);
  // },
};
`
  },

  'package.json'(data) {
    const projectName = (data.projectName as string) || 'codeceptjs-project'
    const helper = (data.helper as string) || 'Playwright'
    const typescript = data.typescript as boolean

    const helperPackages: Record<string, string> = {
      Appium: 'appium',
      Playwright: 'playwright',
      Puppeteer: 'puppeteer',
      TestCafe: 'testcafe',
      WebDriver: 'webdriverio',
    }

    const deps: Record<string, string> = {
      codeceptjs: '^3.6.0',
    }

    const helperPkg = helperPackages[helper]
    if (helperPkg) {
      deps[helperPkg] = 'latest'
    }

    const devDeps: Record<string, string> = {}
    if (typescript) {
      devDeps.typescript = '^5'
    }

    const pkg: Record<string, unknown> = {
      name: projectName,
      version: '0.0.1',
      private: true,
      scripts: {
        'test': 'ccjs run',
        'test:parallel': 'ccjs run workers --count 2',
      },
      dependencies: deps,
    }

    if (Object.keys(devDeps).length > 0) {
      pkg.devDependencies = devDeps
    }

    return JSON.stringify(pkg, null, 2) + '\n'
  },

  'steps.d'(data) {
    const helper = (data.helper as string) || 'Playwright'
    return `/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
  }
  interface Methods extends ${helper} {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
`
  },

  test(data) {
    const featureName = data.featureName as string
    const testName = data.testName as string

    return `Feature('${featureName}');

Scenario('${testName} - basic test', ({ I }) => {
  // TODO: implement test
  I.amOnPage('/');
  I.see('Welcome');
});
`
  },
}

/**
 * Render a named template with the given data.
 */
export function renderTemplate(name: string, data: TemplateData): string {
  const template = templates[name]
  if (!template) {
    throw new Error(`Template "${name}" not found. Available: ${Object.keys(templates).join(', ')}`)
  }

  return template(data)
}

/**
 * Get all available template names.
 */
export function getTemplateNames(): string[] {
  return Object.keys(templates)
}
