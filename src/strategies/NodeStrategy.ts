import { WalletStrategy } from './interface'

export class NodeStrategy implements WalletStrategy {
  constructor() {
    // noop
  }

  async isWalletConnect() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  async getWalletInfo() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  getProvider() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  async connectWallet() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  async getConnectedNetworkId() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  async disconnectWallet() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  onConnect(_callback: () => any) {
    // noop
  }

  offConnect(_callback?: () => any) {
    // noop
  }

  onAccountsChange(_callback: (accounts: string[]) => any) {
    // noop
  }

  offAccountsChange(_callback?: (accounts: string[]) => any) {
    // noop
  }

  onDisconnect(_callback: () => any) {
    // noop
  }

  offDisconnect(_callback?: () => any) {
    // noop
  }
}
