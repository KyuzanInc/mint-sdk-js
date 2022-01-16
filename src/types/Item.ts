import { ItemsPhysicalOrderStatus } from './ItemsPhysicalOrderStatus'
import { ItemsType } from './ItemsType'
import { ItemTradeType } from './ItemTradeType'
import { NetworkId } from './NetworkId'

/**
 * Item is the master data
 * When an item is bought or auctioned, it becomes an ERC721, which is {@link Token}
 * Itemはマスターデータ
 * Itemが購買・引出されてERC721トークンとなったものが{@link Token}
 * */
export type Item = {
  itemId: string
  /**
   * defaults to a normal NFT.
   * Otherwise, can be an NFT associated with a physical product
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
  tradeType: ItemTradeType
  /**
   * `Item`に対応するERC721準拠した tokenId
   * `Item`が買われた時などに、生成されるTokenの tokenId
   * */
  tokenId: number
  /**
   * Name of the item
   * Same as the IPFS property `name`
   * アイテムの名前
   * IPFSにあるアイテムデータの`name`値
   * */
  name: string
  /**
   * Description of the item
   * Same as the IPFS property `description`
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
   * Preview for tokenURI
   *
   * https://xxxx
   * */
  tokenURIHTTP: string
  /**
   * ipfs://xxxx
   * */
  imageURI: string
  /**
   * imageURIのブラウザ閲覧用
   * Preview url for imageURI
   * https://xxxx
   * */
  imageURIHTTP: { url: string; mimeType: string }
  /**
   * Itemの作成者ウォレットアドレス
   * The wallet address of the author of the Item
   * */
  authorAddress: string
  /**
   * Preview for URI
   * Can insert image or video, defaults to empty array when nothing is set.
   * プレビューのURI
   * 動画・画像が入る
   * プレビューが設定されていない場合は空配列になる
   * */
  previews: { mimeType: string; url: string }[]

  /**
   * The network that the Item belongs to
   * 1 === Ethereum Main Network
   * 4 === Ethereum Rinkeby Network
   * 137 ===  Polygon Main Network
   * 80001 === Matic Mumbai Network
   *
   * Itemが所属するネットワーク
   * 1 === Ethereum メインネットワーク
   * 4 === Ethereum Rinkebyネットワーク
   * 137 ===  Polygon メインネットワーク
   * 80001 === Matic Mumbaiネットワーク
   */
  networkId: NetworkId
  /**
   * Wallet address of the buyer
   * If the buyer address is not null, it means that the Item has been sold.
   * 購入者のウォレットアドレス
   * アドレスが null でない場合、Itemが「引出された」「購入された」た状態を表す
   * */
  buyerAddress: string | null
  /**
   * Price of the item in `ether` unit.
   * Only returns when tradeType === 'fixedPrice`
   *
   * アイテムの販売価格。単位は`ether`。
   * tradeType === 'fixedPrice` の時だけ値が入る
   * */
  price?: number
  /**
   * Current bidding price in `ether` unit.
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * アイテムの現在の入札価格。単位は`ether`。
   * tradeType === 'auction or autoExtensionAuction` の時だけ値が入る
   * */
  currentPrice?: number
  /**
   * Address of the current highest bidder
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * アイテムの最新の入札者ウォレットアドレス。
   * tradeType === 'auction or autoExtensionAuction` の時だけ値が入る
   * */
  currentBidderAddress?: string | null
  /**
   * Lowest bid against the item
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * アイテムの最新の最低入札価格
   * tradeType === 'auction or autoExtensionAuction` の時だけ値が入る
   * */
  minBidPrice?: number
  /**
   * Bid difference between the highest bid and lowest bid
   * `minBidPrice` can be calculated by `currentPrice * minBidPercentage`
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * アイテムの最低入札価格比
   * `currentPrice * minBidPercentage`でminBidPriceが求められる
   * tradeType === 'auction or autoExtensionAuction` の時だけ値が入る
   * */
  minBidPercentage?: number
  /**
   * Auction starting time
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * オークション開始日時
   * tradeType === 'auction or autoExtensionAuction' の時だけ値が入る
   * */
  startAt?: Date
  /**
   * Auction ending time
   * When `autoExtensionAuction` is set, will automatically extend.
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * オークション終了日時
   * autoExtensionAuctionの場合は更新される
   * tradeType === 'auction or autoExtensionAuction` の時だけ値が入る
   * */
  endAt?: Date
  /**
   * The default end date of the auction
   * Only returns when tradeType === 'auction or autoExtensionAuction`
   *
   * オークション初期終了日時
   * tradeType === 'auction or autoExtensionAuction` の時だけ値が入る
   * */
  defaultEndAt?: Date // only 'autoExtensionAuction'
  /**
   * Date when the auctioned item can be exchanged to the user. The Token can be exchanged using the `sendTxMakeSuccessfulBid` method.
   * Only returns when tradeType === 'autoExtensionAuction`
   *
   *
   * 引き出し可能日時。この日時以降、`sendTxMakeSuccessfulBid`を呼ぶことでToken引き出すことができる
   * tradeType === 'autoExtensionAuction` の時だけ値が入る
   * */
  withdrawableAt?: Date // only 'autoExtensionAuction'
  /**
   * Auction starting price
   *  Only returns when tradeType === 'auction`
   *
   * オークション開始価格
   * tradeType === 'auction` の時だけ値が入る
   * */
  initialPrice?: number
  chainType: 'ethereum'
  collectionId: string // uuidv4
  mintContractAddress: string
  mintShopContractAddress: string
  /**
   * Creator of the Item
   * IPFS value of `createdBy`
   *
   * アイテムの作成者
   * IPFSにあるアイテムデータの`createdBy`値
   * */
  createdBy: string[]
  /**
   * Created year of the Item
   * IPFS value of `yearCreated`
   *
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
