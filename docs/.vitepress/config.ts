import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'codeceptjs-cli',
  description: 'A production-grade CLI wrapper for the CodeceptJS testing framework.',

  // Use clean URLs without .html extensions
  cleanUrls: true,

  themeConfig: {
    logo: 'https://codecept.io/img/logo.svg',

    // Enable local search
    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Commands', link: '/commands/init' },
    ],

    sidebar: [
      {
        text: 'Guide',
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
          { text: 'ccjs run workers', link: '/commands/workers' },
          { text: 'ccjs run rerun', link: '/commands/rerun' },
          { text: 'ccjs doctor', link: '/commands/doctor' },
          { text: 'ccjs dry-run', link: '/commands/dry-run' },
          { text: 'ccjs generate', link: '/commands/generate' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/codeceptjs/CodeceptJS' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 CodeceptJS CLI',
    },
  },
})
