import { Item, Token } from '@kyuzan/mint-sdk-js'
import { addDays, subDays } from 'date-fns'
import React from 'react'
import { ActiveCard } from './active'
import { EndedCard } from './ended'
import { LoadingCard } from './loading'

export const Active: React.VFC = () => <ActiveCard item={loseItem} />
export const Ended: React.VFC = () => <EndedCard item={doneItem} />
export const Loading: React.VFC = () => <LoadingCard />

export default {
  title: 'molecules/Card',
}

const userWalletAddress = '0x000000'
const otherWalletAddress = '0x000001'

const loseItem: Item = {
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
