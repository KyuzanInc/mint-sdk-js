export type ItemLog = {
  type: 'bought' | 'bid'
  account: string
  price: number // only 'bid' and 'bought'
  createAt: Date
  transactionHash: string
}
