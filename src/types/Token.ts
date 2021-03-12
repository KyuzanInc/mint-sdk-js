/**
 * TokenはERC721を表現している
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
}
