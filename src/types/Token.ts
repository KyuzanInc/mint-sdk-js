import { Item } from './Item'
/**
 * Token is implemented as ERC721.
 * TokenはERC721を表現している
 * Item:Token = 1:1
 * */
export type Token = {
  contractAddress: string
  tokenId: number
  name: string
  description: string
  /**
   * ipfs://xxxx
   * */
  tokenURI: string
  /**
   * Preview for tokenURI
   * tokenURIのブラウザ閲覧用
   * https://xxxx
   * */
  tokenURIHTTP: string
  /** ipfs:// */
  imageURI: string
  /**
   * Preview url for imageURI
   * imageURIのブラウザ閲覧用
   * https://xxxx
   * */
  imageURIHTTP: { url: string; mimeType: string } // https://
  /** https://ipfs.io/ipfs/xxxx */
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
   * The original item associated with the Token
   * Tokenの元になったItemが入る
   */
  item: Item
}
