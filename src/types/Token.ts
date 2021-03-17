import { Item } from './Item'

/**
 * TokenはERC721を表現している
 * Item:Token = 1:1
 * */
export type Token = {
  contractAddress: string
  tokenId: number
  name: string
  description: string
  /** https://ipfs.io/ipfs/xxxx */
  imageURI: string // https://ipfs.io/ipfs/xxxx
  /** https://ipfs.io/ipfs/xxxx */
  tokenURI: string // https://ipfs.io/ipfs/'QmStCJksdYHLE1xmsC7ny3U8QAMBXt7SozajWd3sWRMAxt/metadata.json',
  authorAddress: string
  /**
   * プレビューのURI
   * 動画・画像が入る
   * プレビューが設定されていない場合は空配列になる
   * */
  previews: { mimeType: string; url: string }[]
  /**
   * Tokenの元になったItemが入る
   */
  item: Item
}
