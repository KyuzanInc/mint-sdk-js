import React from 'react'
import { Item, Token } from '@kyuzan/mint-sdk-js'
import { Presentation } from './presentation'
import { addDays, subDays } from 'date-fns'

export const Basic: React.VFC = () => (
  <Presentation
    waitingOwnTokens={false}
    userWalletAddress={userWalletAddress}
    ownTokens={[token]}
    accountDisplayName={''}
    accountBio={''}
    accountProfileUrl={undefined}
    accountInstagramAccountName={undefined}
    accountTwitterAccountName={undefined}
    accountSiteUrl={undefined}
    accountLoading={false}
  />
)
export default {
  title: 'organism/Account',
}

const userWalletAddress = '0x000000'
const otherWalletAddress = '0x000001'

const winItem: Item = {
  itemId: '0001',
  type: 'nft',
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
  chainType: 'ethereum',
  collectionId: 'xxxx', // uuidv4
  mintContractAddress: '',
  mintShopContractAddress: '',
  yearCreated: '2021',
  feeRatePermill: 0,
  createdBy: [],
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
