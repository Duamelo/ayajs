export default {
    title: 'ayajs',
    description: 'A librairy to design diagram',
    themeConfig: {
        siteTitle: 'ayajs'
      },
      themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
          ],
        nav: [
          { text: 'Docs', link: '/docs' },
          { text: 'Examples', link: '/configs' },
          { text: 'Changelog', link: 'https://github.com/...' }
        ],
        sidebar:{
            '/docs/': [
                {
                  text: 'Introduction',
                  items: [
                    { text: 'Getting Started', link: '/docs/started' }, // /guide/index.md
                    { text: 'One', link: '/guide/one' }, // /guide/one.md
                    { text: 'Two', link: '/guide/two' } // /guide/two.md
                  ]
                }
              ],
        }
      }
  }

