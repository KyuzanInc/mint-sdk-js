import { Item as APIItem } from '../../apiClient/api'
import { CryptoCurrencyRate } from './CryptoCurrencyRate'
import { ItemType } from './ItemType'
import { PaymentMethodData } from './PaymentMethodData'

export type Item = Omit<
  APIItem,
  'paymentMethodData' | 'type' | 'cryptoCurrencyRate'
> & {
  type: ItemType
  paymentMethodData: PaymentMethodData
  cryptoCurrencyRate: CryptoCurrencyRate
}
