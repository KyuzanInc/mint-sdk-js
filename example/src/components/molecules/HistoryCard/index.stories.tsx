import React from 'react'
import { HistoryCard } from '.'

export const Basic: React.VFC = () => (
  <HistoryCard log={itemLog} networkId={4} loading={false} />
)

export const WithAvatar: React.VFC = () => (
  <HistoryCard
    log={{ ...itemLog, avatarImgUrl: 'https://place-hold.it/350x150' }}
    networkId={4}
    loading={false}
  />
)

export const Loading: React.VFC = () => (
  <HistoryCard log={[]} networkId={4} loading={true} />
)

export default {
  title: 'molecules/HistoryCard',
}

const itemLog = {
  type: 'bid',
  accountAddress: '0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B',
  price: 1,
  createAt: new Date(),
  transactionHash: '0xxxxxxxxxxxxxxxxxxxxx',
}
