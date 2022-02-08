import { CryptoCurrencyRate as APICryptoCurrencyRate } from '../../apiClient/api'
import { CryptoCurrencyType } from './CryptoCurrencyType'

export type CryptoCurrencyRate = Omit<APICryptoCurrencyRate, 'currency'> & {
  currency: CryptoCurrencyType
}
