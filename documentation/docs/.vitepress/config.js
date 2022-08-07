export default {
    title: 'ayajs',
    description: 'Just playing bycreating your diagram.',
    theme: 'reco',
    themeConfig: {
        logo: '/logo_ayajs.png',
        nav: [
            { text: 'Docs', link: '/docs' },
            { text: 'Examples', link: '/example' },
            { text: 'Changelog', link: '/changelog' }
          ],
          socialLinks: [
            { icon: 'github', link: 'https://github.com/Duamelo/ayajs'},
          ],
          docFooter: {
            prev: 'Pagina prior',
            next: 'Proxima pagina'
          },
          carbonAds: {
            code: 'your-carbon-code',
            placement: 'your-carbon-placement'
          },
          sidebar: [
            {
              text: 'Guide',
              items: [
                { text: 'Introduction', link: '/introduction' },
                { text: 'Getting Started', link: '/getting-started' },
              ]
            },{
              text: 'Forms',
              collapsible: true,
              items: [
                { text: 'triangle', link: '/introduction' },
                { text: 'losange', link: '/getting-started' },
              ]
            },
            {
              text: 'Components',
              collapsible: true,
              items: [
                { text: 'rectangle', link: '/introduction' },
                { text: 'triangle', link: '/getting-started' },
              ]
            }
          ]
    },
    head: [
       // ['link', { rel: 'icon', href: `/favicon-vuesax.png` }],
        ['script', { src: 'https://cpwebassets.codepen.io/assets/embed/ei.js' }]
      ],
  }