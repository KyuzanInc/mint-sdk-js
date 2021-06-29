import React from 'react'
import { TransactionStatus } from '.'

export const Basic: React.VFC = () => {
  return <TransactionStatus transactionUrl={''} />
}

export default {
  title: 'atoms/TransactionStatus',
}
