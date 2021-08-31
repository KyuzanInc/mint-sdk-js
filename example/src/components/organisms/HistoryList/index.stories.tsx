import React from 'react'
import { ItemLog } from '@kyuzan/mint-sdk-js'
import { Presentation } from './presentation'

export const Basic: React.VFC = () => (
  <Presentation loading={false} history={itemLogs} networkId={4} />
)

export const Loading: React.VFC = () => (
  <Presentation loading={true} history={[]} networkId={4} />
)

export default {
  title: 'organism/HistoryList',
}

const itemLogs: ItemLog[] = [
  {
    type: 'bid',
    accountAddress: '0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B',
    price: 1,
    createAt: new Date(),
    transactionHash: '0xxxxxxxxxxxxxxxxxxxxx',
  },
  {
    type: 'bid',
    accountAddress: '0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B',
    price: 0.1,
    createAt: new Date(),
    transactionHash: '0xxxxxxxxxxxxxxxxxxxxx',
  },
]
