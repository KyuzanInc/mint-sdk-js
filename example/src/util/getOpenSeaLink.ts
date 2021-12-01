import { NetworkId } from '@kyuzan/mint-sdk-js'

export const getOpenSeaLink = ({
  networkId,
  contractAddress,
  tokenId,
}: {
  networkId: NetworkId
  contractAddress: string
  tokenId: number
}) => {
  if (networkId === 1) {
    return `https://opensea.io/assets/${contractAddress}/${tokenId}`
  }

  if (networkId === 4) {
    return `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`
  }

  if (networkId === 137) {
    return `https://opensea.io/assets/matic/${contractAddress}/${tokenId}`
  }

  if (networkId === 80001) {
    return `https://testnets.opensea.io/assets/matic/${contractAddress}/${tokenId}`
  }

  return ''
}
