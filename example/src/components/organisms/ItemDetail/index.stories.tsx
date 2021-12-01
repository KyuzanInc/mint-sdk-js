// import { Item } from '@kyuzan/mint-sdk-js'
// import { action } from '@storybook/addon-actions'
// import { addDays } from 'date-fns'
// import React, { useState } from 'react'
// import { Presentation } from './presentation'

// export const Basic: React.VFC = () => {
//   const [physicalOpen, setPhysicalOpen] = useState(false)
//   const [autoExtensionOpen, setAutoExtensionOpen] = useState(false)
//   const [connectWalletOpen, setConnectWalletOpen] = useState(false)
//   const [bidModalOpen, setBidModalOpen] = useState(false)
//   const [bidPrice, setBidPrice] = useState('0')
//   return (
//     <Presentation
//       loading={false}
//       item={loseItem}
//       aboutPhysicalModalIsOpen={physicalOpen}
//       handleCloseBidSuccessModal={action('handleClose')}
//       showBidSuccessModal={false}
//       handleClosePhysicalModal={() => setPhysicalOpen(false)}
//       handleOpenPhysicalModal={() => setPhysicalOpen(true)}
//       aboutAutoExtensionAuctionModalIsOpen={autoExtensionOpen}
//       handleCloseAutoExtensionModal={() => setAutoExtensionOpen(false)}
//       handleOpenAutoExtensionModal={() => setAutoExtensionOpen(true)}
//       connectingWallet={false}
//       connectWalletModalIsOpen={connectWalletOpen}
//       handleCloseConnectWalletModal={() => setConnectWalletOpen(false)}
//       handleConnectWallet={action('handleConnectWallet')}
//       userWalletBalance={'1.4'}
//       actionModalOpen={bidModalOpen}
//       handleOpenSaleActionModal={() => setBidModalOpen(true)}
//       handleCloseBidModal={() => setBidModalOpen(false)}
//       handleChangeInputPrice={(e) => setBidPrice(e.target.value)}
//       bidding={false}
//       showBuyFixedPriceSuccessModal={false}
//       handleCloseBuyFixedPriceSuccessModal={action(
//         'handleCloseBuyFixedPriceSuccessModal'
//       )}
//       bidPrice={bidPrice}
//       handleDoBid={action('handleDoBid')}
//       handleDoBuy={action('handleDoBuy')}
//       isValidationError={false}
//       errorText={''}
//       taHash={''}
//       onTick={action('onTick')}
//     />
//   )
// }

// export const AuctionIsOutOfDate: React.VFC = () => {
//   const [physicalOpen, setPhysicalOpen] = useState(false)
//   const [autoExtensionOpen, setAutoExtensionOpen] = useState(false)
//   const [connectWalletOpen, setConnectWalletOpen] = useState(false)
//   const [bidModalOpen, setBidModalOpen] = useState(false)
//   const [bidPrice, setBidPrice] = useState('0')
//   return (
//     <Presentation
//       loading={false}
//       item={loseItem}
//       handleCloseBidSuccessModal={action('handleClose')}
//       showBidSuccessModal={false}
//       showBuyFixedPriceSuccessModal={false}
//       handleCloseBuyFixedPriceSuccessModal={action(
//         'handleCloseBuyFixedPriceSuccessModal'
//       )}
//       aboutPhysicalModalIsOpen={physicalOpen}
//       handleClosePhysicalModal={() => setPhysicalOpen(false)}
//       handleOpenPhysicalModal={() => setPhysicalOpen(true)}
//       aboutAutoExtensionAuctionModalIsOpen={autoExtensionOpen}
//       handleCloseAutoExtensionModal={() => setAutoExtensionOpen(false)}
//       handleOpenAutoExtensionModal={() => setAutoExtensionOpen(true)}
//       connectingWallet={false}
//       connectWalletModalIsOpen={connectWalletOpen}
//       handleCloseConnectWalletModal={() => setConnectWalletOpen(false)}
//       handleConnectWallet={action('handleConnectWallet')}
//       userWalletBalance={'1.4'}
//       actionModalOpen={bidModalOpen}
//       handleOpenSaleActionModal={() => setBidModalOpen(true)}
//       handleCloseBidModal={() => setBidModalOpen(false)}
//       handleChangeInputPrice={(e) => setBidPrice(e.target.value)}
//       bidding={false}
//       bidPrice={bidPrice}
//       handleDoBid={action('handleDoBid')}
//       handleDoBuy={action('handleDoBuy')}
//       isValidationError={false}
//       errorText={''}
//       taHash={''}
//       onTick={action('onTick')}
//     />
//   )
// }

// export const Loading: React.VFC = () => {
//   return (
//     <Presentation
//       loading={true}
//       item={null}
//     />
//   )
// }

// export default {
//   title: 'organism/ItemDetail',
// }

// const otherWalletAddress = '0x000001'

// const loseItem: Item = {
//   id: '0001',
//   type: 'normal',
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
//   buyerAddress: null,
//   currentPrice: 2.212,
//   minBidPrice: 2.3,
//   currentBidderAddress: otherWalletAddress,
//   startAt: new Date().toISOString(),
//   endAt: addDays(new Date(), 1).toISOString(),
//   initialPrice: 1,
//   chainType: 'ethereum',
//   collectionId: 'xxxx', // uuidv4
//   mintContractAddress: '',
//   mintShopContractAddress: '',
//   yearCreated: '2021',
//   feeRatePermill: 0,
//   createdBy: [],
// }
