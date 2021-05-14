/** @type {import('@docusaurus/types').DocusaurusConfig} */

const URL_REPO = 'https://github.com/KyuzanInc/mint-sdk-js'

module.exports = {
  title: 'Mint Developers',
  tagline: 'Mint Developers',
  url: 'https://kyuzaninc.github.io',
  baseUrl: '/mint-sdk-js/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'KyuzanInc', // Usually your GitHub org/user name.
  projectName: 'mint-sdk-js', // Usually your repo name.
  themeConfig: {
    image: 'img/ogp.png',
    metadatas: [{ name: 'twitter:card', content: 'summary_large_image' }],
    navbar: {
      title: 'Mint Developers',

      items: [
        {
          to: 'docs/api',
          activeBasePath: 'docs/api',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://mintnft.jp',
          label: 'Mint',
          position: 'right',
        },
        {
          href: URL_REPO,
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@kyuzan/mint-sdk-js',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Powered by Kyuzan Inc.',
        src: 'img/logo_footer.svg',
        href: 'https://kyuzan.com',
      },
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
        theme: {
          customCss: require.resolve('./src/css/index.css'),
        },
      },
    ],
  ],
}
