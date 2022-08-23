export default {
    title: 'ayajs',
    description: 'Just playing bycreating your diagram.',
    theme: 'reco',
    themeConfig: {
        //logo: '/logo_ayajs.png',
        nav: [
            { text: 'Docs', link: '../guide_docs/introduction' },
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
                //{ text: 'Integration', link: '../guide_docs/integration' },
              ]
            },
            {
              text: 'Composants',
              collapsible: true,
              items: [
                { text: 'Rectangle', link: '../composants_docs/component_rectangle' },
                { text: 'Circle', link: '../composants_docs/component_circle' },
                { text: 'Triangle', link: '../composants_docs/component_triangle' },
                { text: 'Line', link: '../composants_docs/component_line' },
                { text: 'Lozenge', link: '../composants_docs/component_lozenge' }
              ]
            },
            {
              text: 'Formes simple',
              collapsible: true,
              items: [
                { text: 'Arc', link: '../entities_docs/arc' },
                { text: 'Cicrle', link: '../entities_docs/circle' },
                { text: 'Group', link: '../entities_docs/group' },
                { text: 'Image', link: '../entities_docs/image' },
                { text: 'Line', link: '../entities_docs/line' },
                { text: 'Lozenge', link: '../entities_docs/lozenge' },
                { text: 'Point', link: '../entities_docs/point' },
                { text: 'Polyline', link: '../entities_docs/polyline' },
                { text: 'Rectangle', link: '../entities_docs/rectangle' },
              ]
            },
            {
              text: 'Config',
              collapsible: true,
              items:[
                { text: 'Configuration', link: '/' },

              ]
            }
          ]
    },
    head: [
       // ['link', { rel: 'icon', href: `/favicon-vuesax.png` }],
        ['script', { src: 'https://cpwebassets.codepen.io/assets/embed/ei.js' }]
      ],
  }