export const itemsTradeTypes = ['fixedPrice', 'autoExtensionAuction'] as const
export type ItemTradeType = typeof itemsTradeTypes[number]
