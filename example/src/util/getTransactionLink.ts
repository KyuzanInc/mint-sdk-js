import { NetworkId } from '@kyuzan/mint-sdk-js'

export const getTransactionLink = (hash: string, networkId: NetworkId) => {
  if (networkId === 1) {
    return `https://etherscan.io/tx/${hash}`
  }

  if (networkId === 4) {
    return `https://rinkeby.etherscan.io/tx/${hash}`
  }

  if (networkId === 137) {
    return `https://explorer-mainnet.maticvigil.com/tx/${hash}`
  }

  if (networkId === 80001) {
    return `https://explorer-mumbai.maticvigil.com/tx/${hash}`
  }

  return ''
}
