/**
 * Itemはマスターデータ
 * Itemが購買・引出されてERC721トークンとなったものが{@link Token}
 * */
export type Item = {
  itemId: string
  tradeType: 'fixedPrice' | 'auction'
  tokenId: number
  name: string
  description: string
  /**
   * ipfs://xxxx
   * */
  tokenURI: string
  /**
   * tokenURIのブラウザ閲覧用
   * https://xxxx
   * */
  tokenURIHTTP: string
  /**
   * ipfs://xxxx
   * */
  imageURI: string
  /**
   * imageURIのブラウザ閲覧用
   * https://xxxx
   * */
  imageURIHTTP: string
  authorAddress: string
  /**
   * プレビューのURI
   * 動画・画像が入る
   * プレビューが設定されていない場合は空配列になる
   * */
  previews: { mimeType: string; url: string }[]
  networkId: 1 | 4
  /** buyerAddress にアドレスが入っている場合、Itemが「引出された」「購入された」ている */
  buyerAddress: string | null
  /** only 'fixedPrice'  ether */
  price?: number
  /** only 'auction' ether */
  currentPrice?: number // only 'auction'  ether
  /** only 'auction' */
  currentBidderAddress?: string | null
  /** only 'auction' */
  minBidPrice?: number
  /** only 'auction' */
  minBidPercentage?: number
  /** only 'auction' */
  startAt?: Date
  /** only 'auction' */
  endAt?: Date
  /** only 'auction' ether */
  initialPrice?: number
  /** @deprecated */
  signature: string | undefined // TODO: newが終わったら消す
  signatureBuyAuction: string | undefined
  signatureBidAuction: string | undefined
  signatureBuyFixedPrice: string | undefined
  chainType: 'ethereum'
  collectionId: string // uuidv4
  mintContractAddress: string
  mintShopContractAddress: string
  createdBy: string[]
  yearCreated: string
  feeRatePermill: number
}

export type MediaType = {
  uri: string //"https://ipfs.pixura.io/ipfs/QmUwxycNe7kifiX6paYY6J7mpzXedJNzKhP9eWKhpQYVZy/dcg89-8przh.gif",
  dimensions: string // "1059x864",
  size: number // "47986047"
  mimeType: string //  "image/gif"
}
