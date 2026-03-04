import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'codeceptjs-cli',
  description: 'A production-grade CLI wrapper for the CodeceptJS testing framework.',

  // CRITICAL: base must match the GitHub Pages subpath
  base: '/codeceptjs-cli/',

  // Use clean URLs without .html extensions
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/codeceptjs-cli/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['meta', { property: 'og:title', content: 'codeceptjs-cli' }],
    ['meta', { property: 'og:description', content: 'The next-gen production-grade CLI for CodeceptJS' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    logo: 'https://codecept.io/img/logo.svg',

    siteTitle: 'codeceptjs-cli',

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Commands',
        items: [
          { text: 'ccjs init', link: '/commands/init' },
          { text: 'ccjs run', link: '/commands/run' },
          { text: 'ccjs run workers', link: '/commands/workers' },
          { text: 'ccjs run rerun', link: '/commands/rerun' },
          { text: 'ccjs doctor', link: '/commands/doctor' },
          { text: 'ccjs dry-run', link: '/commands/dry-run' },
          { text: 'ccjs generate', link: '/commands/generate' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
          ],
        },
        {
          text: 'CLI Commands',
          items: [
            { text: 'ccjs init', link: '/commands/init' },
            { text: 'ccjs run', link: '/commands/run' },
            { text: 'ccjs doctor', link: '/commands/doctor' },
          ],
        },
      ],
      '/commands/': [
        {
          text: 'Project Setup',
          items: [
            { text: 'ccjs init', link: '/commands/init' },
            { text: 'ccjs doctor', link: '/commands/doctor' },
          ],
        },
        {
          text: 'Test Execution',
          items: [
            { text: 'ccjs run', link: '/commands/run' },
            { text: 'ccjs run workers', link: '/commands/workers' },
            { text: 'ccjs run rerun', link: '/commands/rerun' },
            { text: 'ccjs dry-run', link: '/commands/dry-run' },
          ],
        },
        {
          text: 'Code Generation',
          items: [
            { text: 'ccjs generate', link: '/commands/generate' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/thienng-it/codeceptjs-cli' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/codeceptjs-cli' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 codeceptjs-cli contributors',
    },

    editLink: {
      pattern: 'https://github.com/thienng-it/codeceptjs-cli/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated',
    },
  },
})
