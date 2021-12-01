import { Bid } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { HistoryCard } from '.'

export const Basic: React.VFC = () => (
  <HistoryCard log={itemLog} loading={false} />
)

export const WithAvatar: React.VFC = () => (
  <HistoryCard
    log={{ ...itemLog, avatarImgUrl: 'https://place-hold.it/350x150' }}
    loading={false}
  />
)

export const Loading: React.VFC = () => <HistoryCard loading={true} />

export default {
  title: 'molecules/HistoryCard',
}

const itemLog: Bid = {
  id: 'x',
  bidder: '0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B',
  bidPrice: 1,
  itemDocumentId: '1',
  createAt: new Date().toISOString(),
  transactionHash: '0xxxxxxxxxxxxxxxxxxxxx',
  updateAt: new Date().toISOString(),
  transactionAt: new Date().toISOString(),
}
