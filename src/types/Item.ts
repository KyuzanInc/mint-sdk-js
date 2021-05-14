import { NetworkId } from './NetworkId'
import { ItemsPhysicalOrderStatus } from './ItemsPhysicalOrderStatus'
import { ItemsType } from './ItemsType'

/**
 * Itemはマスターデータ
 * Itemが購買・引出されてERC721トークンとなったものが{@link Token}
 * */
export type Item = {
  itemId: string
  /**
   * nftWithPhysicalProduct === 物理アイテム付きアイテム
   * typeがないものは、ノーマルなNFTアイテム
   */
  type?: ItemsType
  /**
   * type === 'nftWithPhysicalProduct'だけ値が入る
   * addressIsBlank: エンドユーザーからの住所登録待ち
   * wip: Mint管理者側の配送アクション待ち
   * shipped: 出荷済み
   */
  physicalOrderStatus?: ItemsPhysicalOrderStatus
  tradeType: 'fixedPrice' | 'auction'
  /**
   * `Item`に対応するERC721準拠した tokenId
   * `Item`が買われた時などに、生成されるTokenの tokenId
   * */
  tokenId: number
  /**
   * アイテムの名前
   * IPFSにあるアイテムデータの`name`値
   * */
  name: string
  /**
   * アイテムの詳細
   * IPFSにあるアイテムデータの`description`値
   * */
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
  imageURIHTTP: { url: string; mimeType: string }
  /**
   * Itemの作成者ウォレットアドレス
   * */
  authorAddress: string
  /**
   * プレビューのURI
   * 動画・画像が入る
   * プレビューが設定されていない場合は空配列になる
   * */
  previews: { mimeType: string; url: string }[]

  /**
   * Itemが所属するネットワーク
   * 1 === Ethereum メインネットワーク
   * 4 === Ethereum Rinkebyネットワーク
   * 137 ===  Polygon メインネットワーク
   * 80001 === Matic Mumbaiネットワーク
   */
  networkId: NetworkId
  /**
   * 購入者のウォレットアドレス
   * アドレスが null でない場合、Itemが「引出された」「購入された」た状態を表す
   * */
  buyerAddress: string | null
  /**
   * アイテムの販売価格。単位は`ether`。
   * tradeType === 'fixedPrice` の時だけ値が入る
   * */
  price?: number
  /**
   * アイテムの現在の入札価格。単位は`ether`。
   * tradeType === 'auction` の時だけ値が入る
   * */
  currentPrice?: number // only 'auction'  ether
  /**
   * アイテムの最新の入札者ウォレットアドレス。
   * tradeType === 'auction` の時だけ値が入る
   * */
  currentBidderAddress?: string | null
  /**
   * アイテムの最新の最低入札価格
   * tradeType === 'auction` の時だけ値が入る
   * */
  minBidPrice?: number
  /**
   * アイテムの最低入札価格比
   * `currentPrice * minBidPercentage`でminBidPriceが求められる
   * tradeType === 'auction` の時だけ値が入る
   * */
  minBidPercentage?: number
  /**
   * オークション開始日時
   * tradeType === 'auction` の時だけ値が入る
   * */
  startAt?: Date
  /**
   * オークション終了日時
   * tradeType === 'auction` の時だけ値が入る
   * */
  endAt?: Date
  /**
   * オークション開始価格
   * tradeType === 'auction` の時だけ値が入る
   * */
  initialPrice?: number
  /**
   * @ignore
   */
  signatureBuyAuction: string | undefined
  /**
   * @ignore
   */
  signatureBidAuction: string | undefined
  /**
   * @ignore
   */
  signatureBuyFixedPrice: string | undefined
  chainType: 'ethereum'
  collectionId: string // uuidv4
  mintContractAddress: string
  mintShopContractAddress: string
  /**
   * アイテムの作成者
   * IPFSにあるアイテムデータの`createdBy`値
   * */
  createdBy: string[]
  /**
   * アイテムの制作年
   * IPFSにあるアイテムデータの`yearCreated`値
   * */
  yearCreated: string
  feeRatePermill: number
}

export type MediaType = {
  uri: string //"https://ipfs.pixura.io/ipfs/QmUwxycNe7kifiX6paYY6J7mpzXedJNzKhP9eWKhpQYVZy/dcg89-8przh.gif",
  dimensions: string // "1059x864",
  size: number // "47986047"
  mimeType: string //  "image/gif"
}
