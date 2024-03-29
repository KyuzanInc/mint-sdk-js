export type NetworkId =
  | 1
  | 4
  | 5
  | 80001
  | 80002
  | 137
  | 31337
  | 11155111
  | 1101
  | 1442
export const networkIdMapLabel: Record<NetworkId, string> = {
  1: 'main',
  4: 'rinkeby',
  5: 'goerli',
  137: 'maticMain',
  1101: 'Polygon zkEVM',
  1442: 'Polygon zkEVM (testnet)',
  80001: 'maticMumbai',
  80002: 'maticAmoy',
  31337: 'hardhat for test',
  11155111: 'sepolia',
}
