import { Item as APIItem } from '../../apiClient/api'
import { CryptoCurrencyRate } from './CryptoCurrencyRate'
import { ItemType } from './ItemType'
import { PaymentMethodData } from './PaymentMethodData'

export type Item = Omit<
  APIItem,
  'paymentMethodData' | 'type' | 'cryptoCurrency'
> & {
  type: ItemType
  paymentMethodData: PaymentMethodData
  cryptoCurrency: CryptoCurrencyRate
}
