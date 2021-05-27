export const itemsTradeTypes = [
  'fixedPrice',
  'auction',
  'autoExtensionAuction',
] as const
export type ItemTradeType = typeof itemsTradeTypes[number]
