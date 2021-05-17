export const itemsTradeTypes = ['fixedPrice', 'auction'] as const
export type ItemTradeType = typeof itemsTradeTypes[number]
