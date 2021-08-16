import { NetworkId } from '@kyuzan/mint-sdk-js'
export const getNetworkIdLabel = (id: NetworkId) => {
  switch (id) {
    case 1:
      return 'Ethereumメインネットワーク'
    case 4:
      return 'Rinkebyネットワーク'
    case 137:
      return 'Polygonメインネットワーク'
    case 80001:
      return 'Mumbaiネットワーク'
  }
}
