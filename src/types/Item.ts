export type Item = {
  itemId: string
  tradeType: 'fixedPrice' | 'auction'
  tokenId: number
  description: string
  tokenURI: string // 'QmStCJksdYHLE1xmsC7ny3U8QAMBXt7SozajWd3sWRMAxt/metadata.json',
  ipfsURI: string
  author: string
  networkId: 1 | 4
  signature: string
  currentOwner: string | null //
  price?: number // only 'fixedPrice'  ether
  currentPrice?: number // only 'auction'  ether
  currentBidder?: string | null // only 'auction'
  startAt?: Date // only 'auction'
  endAt?: Date // only 'auction'
  initialPrice?: number // only 'auction'  ether
}
