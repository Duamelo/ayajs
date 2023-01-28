const guideSidebar = [
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

const apiSidebar = [
  {
    text: 'Init',
    collapsible: true,
    items: [
      { text: 'Init class attributes', link: '../api/init' },
    ]
  },
  {
    text: 'Component',
    collapsible: true,
    items: [
      { text: 'Component class', link: '../api/component-api' },
    ]
  },
  {
    text: 'Shape',
    collapsible: true,
    items: [
      { text: 'abstract class Shape', link: '../api/basic-shapes' },
    ]
  },
]

export default {
    lang: 'en-US',
    title: "aya",
    titleTemplate: "A flexible JavaScript library for building any kind of diagrams quickly and in a programmatic way",
    description: 'A flexible JavaScript library for building any kind of diagrams quickly and in a programmatic way.',
    theme: 'home',
    lastUpdated: true,
    lastUpdatedText: 'Update Date',
    themeConfig: {  
      editLink: {
        pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
        text: 'Suggest changes to this page'
      },
      nav: [
          { text: 'Development',
            items: [
              {text: 'Guide', link: '../guide/what-is-ayajs'},
              {text: 'APIs', link: '../api/init'},
              // {text: 'Architecture', link: '../guide/architecture'}
            ]
          },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Community', link: '/community' },
          { text: 'Examples', link: '/example' },
          { text: 'Tutorials', link: '/tutorials/index' },
          { text: 'Changelog',
            items: [
              {text: '1.0.1', link: '../changelog/changelog_1.0.1'},
            ]
          },
        ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/Duamelo/ayajs'},
      ],
      algolia: {
        appId: '7H67QR5P0A',
        apiKey: 'deaab78bcdfe96b599497d25acc6460e',
        indexName: 'aya',
        searchParameters: {
          facetFilters: ['tags:en'],
        },
      },
      sidebar: {
        '/guide/': guideSidebar,
        'components/': guideSidebar,
        'entities/': guideSidebar,
        '/api/': apiSidebar
      },
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022-present David DOSSEH, Aya contributors'
      }
    },
}