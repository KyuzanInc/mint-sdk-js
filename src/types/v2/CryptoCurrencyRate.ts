import { CryptoCurrencyRate as APICryptoCurrencyRate } from '../../apiClientV2/api'
import { CryptoCurrencyType } from './CryptoCurrencyType'

export type CryptoCurrencyRate = Omit<APICryptoCurrencyRate, 'currency'> & {
  currency: CryptoCurrencyType
}
