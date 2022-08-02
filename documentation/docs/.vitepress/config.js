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
          footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present David DOSSEH'
          },
          docFooter: {
            prev: 'Pagina prior',
            next: 'Proxima pagina'
          },
          carbonAds: {
            code: 'your-carbon-code',
            placement: 'your-carbon-placement'
          }
    },
    head: [
       // ['link', { rel: 'icon', href: `/favicon-vuesax.png` }],
        ['script', { src: 'https://cpwebassets.codepen.io/assets/embed/ei.js' }]
      ],
  }