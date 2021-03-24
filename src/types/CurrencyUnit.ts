const currencys = ['MATIC', 'ETH'] as const

export type CurrencyUnit = typeof currencys[number]
