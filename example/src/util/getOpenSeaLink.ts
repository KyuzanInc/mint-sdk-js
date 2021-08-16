import { ItemDetail } from './../redux/item/index'
export const getOpenSeaLink = (item: ItemDetail) => {
  const networkId = item?.networkId
  const contactAddress = item?.mintContractAddress
  const tokenId = item?.tokenId
  if (networkId === 1) {
    return `https://opensea.io/assets/${contactAddress}/${tokenId}`
  }

  if (networkId === 4) {
    return `https://testnets.opensea.io/assets/${contactAddress}/${tokenId}`
  }

  if (networkId === 137) {
    return `https://opensea.io/assets/matic/${contactAddress}/${tokenId}`
  }

  if (networkId === 80001) {
    return `https://testnets.opensea.io/assets/matic/${contactAddress}/${tokenId}`
  }

  return ''
}
