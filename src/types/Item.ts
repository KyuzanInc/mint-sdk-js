export type Item = {
  itemId: string
  tradeType: 'fixedPrice' | 'auction'
  tokenId: number
  description: string
  tokenURI: string // 'QmStCJksdYHLE1xmsC7ny3U8QAMBXt7SozajWd3sWRMAxt/metadata.json',
  imageURL: string
  authorAddress: string
  networkId: 1 | 4
  signature: string
  buyerAddress: string | null //
  price?: number // only 'fixedPrice'  ether
  currentPrice?: number // only 'auction'  ether
  currentBidder?: string | null // only 'auction'
  startAt?: string // only 'auction'
  endAt?: string // only 'auction'
  initialPrice?: number // only 'auction'  ether
}
