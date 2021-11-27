// TODO
import { NetworkId } from '@kyuzan/mint-sdk-js'

export const getItemPriceUnit = (item: any) => {
  if (typeof item === 'undefined') return ''
  if (item?.networkId === 1 || item?.networkId === 4) {
    return 'ETH'
  }

  if (item?.networkId === 80001 || item?.networkId === 137) {
    return 'MATIC'
  }
  return ''

  //   throw new Error('Not implemented')
}

export const getPriceUnit = (networkId: NetworkId) => {
  if (networkId === 1 || networkId === 4) {
    return 'ETH'
  }

  if (networkId === 80001 || networkId === 137) {
    return 'MATIC'
  }

  if (networkId === 31337) return 'HARDHAT'

  return ''
  //   throw new Error('Not implemented')
}
