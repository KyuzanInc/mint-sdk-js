import React from 'react'
import { TransactionStatus } from '.'

export const Basic: React.VFC = () => {
  return <TransactionStatus networkId={4} hash={''} />
}

export default {
  title: 'atoms/TransactionStatus',
}
