import { BigNumber } from './BigNumber'
import { CurrencyUnit } from './CurrencyUnit'

export type WalletInfo = {
  address: string
  balance: BigNumber
  unit: CurrencyUnit
}
