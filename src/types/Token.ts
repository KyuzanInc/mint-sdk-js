import { Item } from '@kyuzan/mint-sdk-js'
/**
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
   * tokenURIのブラウザ閲覧用
   * https://xxxx
   * */
  tokenURIHTTP: string
  /** ipfs:// */
  imageURI: string
  /**
   * imageURIのブラウザ閲覧用
   * https://xxxx
   * */
  imageURIHTTP: { url: string; mimeType: string } // https://
  /** https://ipfs.io/ipfs/xxxx */
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
