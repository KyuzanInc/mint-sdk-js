import React from 'react'
import { action } from '@storybook/addon-actions'
import { Presentation } from './presentation'
import { Item, Token } from '@kyuzan/mint-sdk-js'
import { addDays, subDays } from 'date-fns'

export const Basic: React.VFC = () => (
  <Presentation
    connectingWallet={false}
    onConnectWallet={action('onConnectWallet')}
    waitingBidedItems={false}
    waitingOwnTokens={false}
    bidedItems={[doneItem, winItem, loseItem]}
    handleWithdrawItem={action('handleWithdrawItem')}
    handleHideShippingInfo={action('handleHideShippingInfo')}
    showShippingInfo={action('showShippingInfo')}
    userWalletAddress={userWalletAddress}
    withdrawingItemId={'test'}
    ownTokens={[token]}
    showShippingInfoModal={false}
    shippingInfo={undefined}
    accountDisplayName={''}
    accountBio={''}
    accountProfileUrl={undefined}
    accountInstagramAccountName={undefined}
    accountTwitterAccountName={undefined}
    accountSiteUrl={undefined}
    accountLoading={false}
    accountOnClickEdit={action('accountOnClickEdit')}
    onComplete={action('onComplete')}
  />
)

export const NoItems: React.VFC = () => (
  <Presentation
    connectingWallet={false}
    onConnectWallet={action('onConnectWallet')}
    waitingBidedItems={false}
    waitingOwnTokens={false}
    bidedItems={[]}
    handleWithdrawItem={action('handleWithdrawItem')}
    handleHideShippingInfo={action('handleHideShippingInfo')}
    showShippingInfo={action('showShippingInfo')}
    userWalletAddress={userWalletAddress}
    withdrawingItemId={'test'}
    ownTokens={[]}
    showShippingInfoModal={false}
    shippingInfo={undefined}
    accountDisplayName={''}
    accountBio={''}
    accountProfileUrl={undefined}
    accountInstagramAccountName={undefined}
    accountTwitterAccountName={undefined}
    accountSiteUrl={undefined}
    accountLoading={false}
    accountOnClickEdit={action('accountOnClickEdit')}
  />
)

export const NoWalletAddress: React.VFC = () => (
  <Presentation
    connectingWallet={false}
    onConnectWallet={action('onConnectWallet')}
    waitingBidedItems={false}
    waitingOwnTokens={false}
    bidedItems={[]}
    handleWithdrawItem={action('handleWithdrawItem')}
    handleHideShippingInfo={action('handleHideShippingInfo')}
    showShippingInfo={action('showShippingInfo')}
    userWalletAddress={undefined}
    withdrawingItemId={'test'}
    ownTokens={[]}
    showShippingInfoModal={false}
    shippingInfo={undefined}
    accountDisplayName={''}
    accountBio={''}
    accountProfileUrl={undefined}
    accountInstagramAccountName={undefined}
    accountTwitterAccountName={undefined}
    accountSiteUrl={undefined}
    accountLoading={false}
    accountOnClickEdit={action('accountOnClickEdit')}
    onComplete={action('onComplete')}
  />
)

export const Loading: React.VFC = () => (
  <Presentation
    connectingWallet={false}
    onConnectWallet={action('onConnectWallet')}
    waitingBidedItems={true}
    waitingOwnTokens={true}
    bidedItems={[]}
    handleWithdrawItem={action('handleWithdrawItem')}
    handleHideShippingInfo={action('handleHideShippingInfo')}
    showShippingInfo={action('showShippingInfo')}
    userWalletAddress={userWalletAddress}
    withdrawingItemId={'test'}
    ownTokens={[]}
    showShippingInfoModal={false}
    shippingInfo={undefined}
    accountDisplayName={''}
    accountBio={''}
    accountProfileUrl={undefined}
    accountInstagramAccountName={undefined}
    accountTwitterAccountName={undefined}
    accountSiteUrl={undefined}
    accountLoading={false}
    accountOnClickEdit={action('accountOnClickEdit')}
    onComplete={action('onComplete')}
  />
)

export const ShowShippingInfo: React.VFC = () => (
  <Presentation
    connectingWallet={false}
    onConnectWallet={action('onConnectWallet')}
    waitingBidedItems={false}
    waitingOwnTokens={false}
    bidedItems={[doneItem, winItem, loseItem]}
    handleWithdrawItem={action('handleWithdrawItem')}
    handleHideShippingInfo={action('handleHideShippingInfo')}
    showShippingInfo={action('showShippingInfo')}
    userWalletAddress={userWalletAddress}
    withdrawingItemId={'test'}
    ownTokens={[token]}
    showShippingInfoModal={true}
    shippingInfo={{
      name: '山田太郎',
      email: 'example@kyuza.com',
      postalCode: '1000000',
      prefecture: '東京都',
      city: '千代田区',
      address1: 'xxxx',
      address2: 'oooビル2F',
      tel: '00000000000',
      memo: 'memo',
    }}
    accountDisplayName={''}
    accountBio={''}
    accountProfileUrl={undefined}
    accountInstagramAccountName={undefined}
    accountTwitterAccountName={undefined}
    accountSiteUrl={undefined}
    accountLoading={false}
    accountOnClickEdit={action('accountOnClickEdit')}
    onComplete={action('onComplete')}
  />
)

export default {
  title: 'organism/MyPage',
}

const userWalletAddress = '0x000000'
const otherWalletAddress = '0x000001'

const loseItem: Item = {
  itemId: '0001',
  type: 'nftWithPhysicalProduct',
  physicalOrderStatus: 'shippingInfoIsBlank',
  tradeType: 'auction',
  tokenId: 1,
  name: 'test',
  description: 'ddeded',
  tokenURI: '',
  tokenURIHTTP: '',
  imageURI: '',
  imageURIHTTP: {
    url: '',
    mimeType: '',
  },
  authorAddress: '0x',
  previews: [
    {
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    },
  ],
  networkId: 4,
  buyerAddress: '0x',
  currentPrice: 2.212,
  currentBidderAddress: otherWalletAddress,
  startAt: new Date(),
  endAt: addDays(new Date(), 1),
  initialPrice: 1,
  signatureBuyAuction: undefined,
  signatureBidAuction: undefined,
  signatureBuyFixedPrice: undefined,
  chainType: 'ethereum',
  collectionId: 'xxxx', // uuidv4
  mintContractAddress: '',
  mintShopContractAddress: '',
  yearCreated: '2021',
  feeRatePermill: 0,
  createdBy: [],
}

const winItem: Item = {
  ...loseItem,
  currentBidderAddress: userWalletAddress,
}

const doneItem: Item = {
  ...winItem,
  startAt: subDays(new Date(), 2),
  endAt: subDays(new Date(), 1),
}

const token: Token = {
  contractAddress: '0x2222',
  tokenId: 1,
  name: 'test',
  description: 'test test',
  tokenURI: 'ipft://xxxxxx',
  tokenURIHTTP: 'https://hoo.png',
  imageURI: 'ipft://xxxxxx',
  imageURIHTTP: {
    url: 'https://place-hold.it/350x150',
    mimeType: 'image/png',
  },
  authorAddress: '0x1111',
  previews: [
    {
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    },
  ],
  item: doneItem,
}
