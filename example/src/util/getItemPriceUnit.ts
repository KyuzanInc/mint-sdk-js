import { ItemDetail } from '../redux/item/index'

export const getItemPriceUnit = (item: ItemDetail) => {
  if (typeof item === 'undefined') return ''
  if (item?.networkId === 1 || item?.networkId === 4) {
    return 'ETH'
  }

  if (item?.networkId === 80001 || item?.networkId === 137) {
    return 'MATIC'
  }

  throw new Error('Not implemented')
}
