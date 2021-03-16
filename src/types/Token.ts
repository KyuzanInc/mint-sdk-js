/**
 * TokenはERC721を表現している
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
  imageURIHTTP: string
  /** https://ipfs.io/ipfs/xxxx */
  authorAddress: string
  /**
   * プレビューのURI
   * 動画・画像が入る
   * プレビューが設定されていない場合は空配列になる
   * */
  previews: { mimeType: string, url: string }[]
}
