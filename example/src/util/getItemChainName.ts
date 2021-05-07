import { ItemDetail } from '../redux/item/index'

export const getItemChainName = (item: ItemDetail) => {
  if (typeof item === 'undefined') return ''

  if (item?.networkId === 1 || item?.networkId === 4) {
    return 'ETHEREUM'
  }

  if (item?.networkId === 80001 || item?.networkId === 137) {
    return 'POLYGON'
  }

  throw new Error('Not implemented')
}
