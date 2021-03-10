export type Item = {
  itemId: string
  tradeType: 'fixedPrice' | 'auction'
  tokenId: number
  name: string
  description: string
  tokenURI: string // 'QmStCJksdYHLE1xmsC7ny3U8QAMBXt7SozajWd3sWRMAxt/metadata.json',
  imageURL: string
  authorAddress: string
  networkId: 1 | 4
  signature: string
  buyerAddress: string | null //
  price?: number // only 'fixedPrice'  ether
  currentPrice?: number // only 'auction'  ether
  currentBidderAddress?: string | null // only 'auction'
  startAt?: Date // only 'auction'
  endAt?: Date // only 'auction'
  initialPrice?: number // only 'auction'  ether
}
