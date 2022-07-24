const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'aya.js',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Docs',
        link: '/docs/',
      },
      {
        text: 'Examples',
        link: '/example/'
      }
    ],
    sidebar: {
      '/docs/': [
        {
          title: 'Doc',
          collapsable: false,
          children: [
            '',

          ]
        },
        {
          title: 'Quick start',
          collapse: false,
          children : [
            '/start/introduction.md',
            '/start/installation.md'
          ]
        },
        {
          title: 'Component',
          collapse: false,
          children : [
            '/component/index.md',
          ]
        },
        {
          title: 'Shapes',
          collapse: false,
          children : [
            '/shapes/rectangle.md',
            '/shapes/lozenge.md',
            '/shapes/triangle.md',
            '/shapes/circle.md',
            '/shapes/line.md',
            '/shapes/polyline.md',
            '/shapes/arc.md',
          ]
        },
        {
          title: 'children shape',
          collapse: false,
          children : [
            '/child/index.md',
          ]
        },
        {
          title: 'events',
          collapse: false,
          children : [
            '/events/mousedown.md',
            '/events/mousemove.md',
            '/events/mouseup.md',
            '/events/addYourOwnEvent.md',
          ]
        },
        {
          title: 'config',
          collapse: false,
          children : [
            '/config/index.md',
          ]
        },
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
