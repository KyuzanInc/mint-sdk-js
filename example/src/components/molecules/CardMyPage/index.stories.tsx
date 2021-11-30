// import React from 'react'
// import { CardMyPage } from '.'
// import { action } from '@storybook/addon-actions'
// import { addDays } from 'date-fns/esm'
// import { subDays, subMinutes } from 'date-fns'
// import { Item } from '@kyuzan/mint-sdk-js'

// export const Losing: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={'0x'}
//     loading={false}
//     item={item}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//     onComplete={action('onComplete')}
//   />
// )

// export const Wining: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={''}
//     loading={false}
//     item={item}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//     onComplete={action('onComplete')}
//   />
// )

// export const Won: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={''}
//     loading={false}
//     item={{
//       ...item,
//       endAt: subDays(new Date(), 1),
//     }}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//     onComplete={action('onComplete')}
//   />
// )

// export const WonAndWait5min: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={''}
//     loading={false}
//     item={{
//       ...item,
//       endAt: subMinutes(new Date(), 4),
//     }}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//     onComplete={action('onComplete')}
//   />
// )

// export const ShippingInfoIsBlank: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={''}
//     loading={false}
//     item={{
//       ...item,
//       type: 'nftWithPhysicalProduct',
//       physicalOrderStatus: 'shippingInfoIsBlank',
//       endAt: subMinutes(new Date(), 4),
//     }}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//   />
// )

// export const ShippingProcessing: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={''}
//     loading={false}
//     item={{
//       ...item,
//       type: 'nftWithPhysicalProduct',
//       physicalOrderStatus: 'wip',
//       endAt: subMinutes(new Date(), 4),
//     }}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//   />
// )

// export const Shipped: React.VFC = () => (
//   <CardMyPage
//     userWalletAddress={''}
//     loading={false}
//     item={{
//       ...item,
//       type: 'nftWithPhysicalProduct',
//       physicalOrderStatus: 'shipped',
//       endAt: subMinutes(new Date(), 4),
//     }}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//   />
// )

// export const Loading: React.VFC = () => (
//   <CardMyPage
//     loading={true}
//     item={undefined}
//     withdrawing={false}
//     onWithdraw={action('onWithdraw')}
//     onShowShippingInfo={action('onShowShippingInfo')}
//     onComplete={action('onComplete')}
//   />
// )

// export default {
//   title: 'molecules/CardMyPage',
// }

// const item: Item = {
//   id: '0001',
//   type: 'nftWithPhysicalProduct',
//   physicalOrderStatus: 'shippingInfoIsBlank',
//   tradeType: 'auction',
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
//   currentBidderAddress: '',
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
