export type ItemLog = {
  type: 'bought' | 'bid'
  accountAddress: string
  price: number // only 'bid' and 'bought'
  createAt: Date
  transactionHash: string
}
