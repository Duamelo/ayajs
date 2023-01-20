export default {
    // base: '/ayajs/',
    title: "aya",
    titleTemplate: "A flexible JavaScript library for building any kind of diagrams quickly and in a programmatic way",
    description: 'A flexible JavaScript library for building any kind of diagrams quickly and in a programmatic way.',
    theme: 'reco',
    themeConfig: {
        // logo: 'logo_ayajs.png',
        nav: [
            { text: 'Development',
              items: [
                {text: 'Guide', link: '../guide/what-is-ayajs'},
                {text: 'API', link: '../guide/api'},
                {text: 'Architecture', link: '../guide/architecture'}
              ]
            },
            { text: 'Contributing', link: '/contributing' },
            { text: 'Community', link: '/community' },
            { text: 'Examples', link: '/example' },
            { text: 'Tutorials', link: '/tutorials/index' },
            { text: 'Changelog',
              items: [
                {text: '0.1.1', link: '../changelog/changelog_0.1.1'},
              ]
            },
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
              text: 'Introduction',
              collapsible: true,
              items: [
                { text: 'What is aya ?', link: '../guide/what-is-ayajs' },
                { text: 'Getting Started', link: '../guide/get-started' },
                { text: 'Configuration', link: '../guide/configuration' },
              ]
            },
            {
              text: 'Component classes',
              collapsible: true,
              items: [
                { text: 'Arc', link: '../components/arc' },
                { text: 'Circle', link: '../components/circle' },
                { text: 'Line', link: '../components/line' },
                { text: 'Lozenge', link: '../components/lozenge' },
                { text: 'Polyline', link: '../components/polyline' },
                { text: 'Rectangle', link: '../components/rectangle' },
                { text: 'Triangle', link: '../components/triangle' },
                { text: 'Text', link: '../components/text' }
              ]
            },
            {
              text: 'Simple form classes',
              collapsible: true,
              items: [
                { text: 'Arc', link: '../entities/arc' },
                { text: 'Circle', link: '../entities/circle' },
                { text: 'Image', link: '../entities/image' },
                { text: 'Line', link: '../entities/line' },
                { text: 'Link', link: '../entities/link' },
                { text: 'Lozenge', link: '../entities/lozenge' },
                { text: 'Point', link: '../entities/point' },
                { text: 'Polyline', link: '../entities/polyline' },
                { text: 'Rectangle', link: '../entities/rectangle' },
                { text: 'Text', link: '../entities/text' },
                { text: 'Triangle', link: '../entities/triangle' }
              ]
            },
            {
              text: 'Events handling',
              collapsible: true,
              items: [
                { text: 'How does aya handle events ?', link: '../events/native-events' },
              ]
            },
            {
              text: 'Adding children to a component',
              collapsible: true,
              items: [
                { text: 'How to customise a component ?', link: '/add_child' },
              ]
            }
          ]
    },
    head: [
       // ['link', { rel: 'icon', href: `/favicon-vuesax.png` }],
        ['script', { src: 'https://cpwebassets.codepen.io/assets/embed/ei.js' }],
      ],
  }