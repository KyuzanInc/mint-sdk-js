module.exports = {
  main: {
    'Getting Started': [
      'gettingStarted/Tutorial',
      'gettingStarted/PhysicalItem',
      'gettingStarted/UserAccountInfo',
    ],
    OpenSeaやEtherscanなどへのリンク生成方法: [
      'tokenRelatedURL/openSea',
      'tokenRelatedURL/blockchainExplorer',
    ],
    tokenIdについて: ['TokenIdDesign'],
    通貨について: ['EthInSdk'],
    'Mint SDK API': require('./typedoc-sidebar.js'),
  },
}
