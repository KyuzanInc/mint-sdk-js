export type NetworkId = 1 | 4 | 5 | 80001 | 137 | 31337
export const networkIdMapLabel: Record<NetworkId, string> = {
  1: 'main',
  4: 'rinkeby',
  5: 'goerli',
  137: 'maticMain',
  80001: 'maticMumbai',
  31337: 'hardhat for test',
}
