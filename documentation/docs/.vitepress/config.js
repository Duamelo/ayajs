export default {
    title: 'ayajs',
    description: 'Just playing bycreating your diagram.',
    theme: 'reco',
    themeConfig: {
        //logo: '/logo_ayajs.png',
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
              collapsible: true,
              items: [
                { text: 'Introduction', link: '../guide_docs/introduction' },
                { text: 'Démarrage', link: '../guide_docs/demarrage' },
                { text: 'Installation', link: '../guide_docs/installation' },
                { text: 'Integration', link: '../guide_docs/integration' },
              ]
            },
            {
              text: 'Composants',
              collapsible: true,
              items: [
                { text: 'rectangle', link: '../composants_docs/component_rectangle' },
                { text: 'circle', link: '../composants_docs/component_circle' },
                { text: 'triangle', link: '../composants_docs/component_triangle' },
                { text: 'line', link: '../composants_docs/component_line' },
                { text: 'lozenge', link: '../composants_docs/component_lozenge' }
              ]
            },
            {
              text: 'Formes simple',
              collapsible: true,
              items: [
                { text: 'arc', link: '../entities_doc/arc' },
                { text: 'cicrle', link: '../entities_doc/circle' },
                { text: 'group', link: '../entities_doc/group' },
                { text: 'image', link: '../entities_doc/image' },
                { text: 'line', link: '../entities_doc/line' },
                { text: 'lozenge', link: '../entities_doc/lozenge' },
                { text: 'point', link: '../entities_doc/point' },
                { text: 'polyline', link: '../entities_doc/polyline' },
                { text: 'rectangle', link: '../entities_doc/rectangle' },
                { text: 'point', link: '../entities_doc/point' },
                { text: 'polyline', link: '../entities_doc/polyline' },
                { text: 'rectangle', link: '../entities_doc/rectangle' },
              ]
            },
            {
              text: 'Config',
              collapsible: true,
              items:[
                { text: 'configuration', link: '/' },

              ]
            }
          ]
    },
    head: [
       // ['link', { rel: 'icon', href: `/favicon-vuesax.png` }],
        ['script', { src: 'https://cpwebassets.codepen.io/assets/embed/ei.js' }]
      ],
  }