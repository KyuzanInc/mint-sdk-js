export const itemsTypes = [
  'nft', // プレーンなNFT
  'nftWithPhysicalProduct', // フィジカルアイテム付きNFT（住所入力などのアクションを起こせる）
] as const
export type ItemsType = typeof itemsTypes[number]
