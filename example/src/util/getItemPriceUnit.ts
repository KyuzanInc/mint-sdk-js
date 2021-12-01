import { NetworkId } from '@kyuzan/mint-sdk-js'

export const getItemPriceUnit = (item: any) => {
  if (typeof item === 'undefined') return ''
  if (
    item?.networkId === 1 ||
    item?.networkId === 4 ||
    item?.networkId === 31337
  ) {
    return 'ETH'
  }

  if (item?.networkId === 80001 || item?.networkId === 137) {
    return 'MATIC'
  }
  return ''
}

export const getPriceUnit = (networkId: NetworkId) => {
  if (networkId === 1 || networkId === 4 || networkId === 31337) {
    return 'ETH'
  }

  if (networkId === 80001 || networkId === 137) {
    return 'MATIC'
  }

  return ''
}
