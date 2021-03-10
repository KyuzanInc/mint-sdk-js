/** @type {import('@docusaurus/types').DocusaurusConfig} */

const URL_REPO = 'https://github.com/KyuzanInc/mint-sdk-js'

module.exports = {
  title: 'MINT SDK',
  tagline: 'MINT SDK',
  url: URL_REPO,
  baseUrl: '/mint-sdk-js/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'KyuzanInc', // Usually your GitHub org/user name.
  projectName: 'mint-sdk-js', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'MINT SDK JS',
      logo: {
        alt: 'MINT SDK JS',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/api',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: URL_REPO,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'API',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'About company',
              href: 'https://kyuzan.com/',
            },
            {
              label: 'GitHub',
              href: URL_REPO,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kyuzan Inc. Built with Docusaurus.`,
    },
  },
  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: URL_REPO,
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
