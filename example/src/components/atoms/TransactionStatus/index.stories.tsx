import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { TransactionStatus } from '.'

export const Basic: React.VFC = () => {
  return <TransactionStatus item={item} hash={''} />
}

export default {
  title: 'atoms/TransactionStatus',
}

const item = {
  networkId: 4,
} as Item
