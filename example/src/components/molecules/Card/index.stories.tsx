// import { Item } from '@kyuzan/mint-sdk-js'
// import { addDays, subDays } from 'date-fns'
// import React from 'react'
// import { Card } from '.'

// export const AuctionActive: React.VFC = () => (
//   <Card item={loseItem} loading={false} />
// )
// export const AuctionActiveWithLongTitle: React.VFC = () => (
//   <Card
//     item={{
//       ...loseItem,
//       name: '宮沢賢治の作品を読み解く上での重要なキーワードに「イーハトーブ」がある。彼の心の中の理想郷とも言うべきこの言葉は、故郷の岩手をモチーフに生まれた。賢治生誕120年を迎えた今、この言葉の意味を中国人の賢治研究家が再考する。',
//     }}
//     loading={false}
//   />
// )
// export const ActiveWithPhysicalItem: React.VFC = () => (
//   <Card
//     item={{ ...loseItem, type: 'nftWithPhysicalProduct' }}
//     loading={false}
//   />
// )
// export const AuctionEnded: React.VFC = () => (
//   <Card item={doneItem} loading={false} />
// )

// export const FixedPriceOnSale: React.VFC = () => (
//   <Card
//     item={{
//       ...loseItem,
//       buyerAddress: null,
//       tradeType: 'fixedPrice',
//       currentPrice: undefined,
//       startAt: subDays(new Date(), 2),
//       price: 1,
//     }}
//     loading={false}
//   />
// )

// export const FixedPriceEnded: React.VFC = () => (
//   <Card
//     item={{
//       ...doneItem,
//       tradeType: 'fixedPrice',
//       currentPrice: undefined,
//       price: 1,
//     }}
//     loading={false}
//   />
// )

// export const Loading: React.VFC = () => <Card loading={true} />

// export default {
//   title: 'molecules/Card',
// }

// const userWalletAddress = '0x000000'
// const otherWalletAddress = '0x000001'

// const loseItem: Item = {
//   itemId: '0001',
//   type: 'nft',
//   physicalOrderStatus: 'shippingInfoIsBlank',
//   tradeType: 'autoExtensionAuction',
//   tokenId: 1,
//   name: 'test',
//   description: 'ddeded',
//   tokenURI: '',
//   tokenURIHTTP: '',
//   imageURI: '',
//   imageURIHTTP: {
//     url: '',
//     mimeType: '',
//   },
//   authorAddress: '0x',
//   previews: [
//     {
//       url: 'https://place-hold.it/350x150',
//       mimeType: 'image/png',
//     },
//   ],
//   networkId: 4,
//   buyerAddress: '0x',
//   currentPrice: 2.212,
//   currentBidderAddress: otherWalletAddress,
//   startAt: new Date(),
//   endAt: addDays(new Date(), 1),
//   initialPrice: 1,
//   chainType: 'ethereum',
//   collectionId: 'xxxx', // uuidv4
//   mintContractAddress: '',
//   mintShopContractAddress: '',
//   yearCreated: '2021',
//   feeRatePermill: 0,
//   createdBy: [],
// }

// const winItem: Item = {
//   ...loseItem,
//   currentBidderAddress: userWalletAddress,
// }

// const doneItem: Item = {
//   ...winItem,
//   startAt: subDays(new Date(), 2),
//   endAt: subDays(new Date(), 1),
// }

export {}
