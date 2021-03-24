import { CurrencyUnit } from './CurrencyUnit'
import { BigNumber } from './BigNumber'

export type WalletInfo = {
  address: string
  balance: BigNumber
  unit: CurrencyUnit
}
