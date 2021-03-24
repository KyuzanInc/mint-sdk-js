export type NetworkId = 1 | 4 | 80001 | 137
export const networkIdMapLabel: Record<NetworkId, string> = {
  1: 'main',
  4: 'rinkeby',
  137: 'maticMain',
  80001: 'maticMumbai',
}
