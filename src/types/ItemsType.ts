export const itemsTypes = [
  /* 
  Plain NFT
  プレーンなNFT
  */
  'nft', //
  /* 
  NFT associated with a physical item
  フィジカルアイテム付きNFT（住所入力などのアクションを起こせる）
  */
  'nftWithPhysicalProduct',
] as const
export type ItemsType = typeof itemsTypes[number]
