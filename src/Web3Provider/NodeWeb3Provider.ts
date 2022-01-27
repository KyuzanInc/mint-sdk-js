import { IWeb3Provider } from './IWeb3Provider'

export class NodeWeb3Provider implements IWeb3Provider {
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

  async openWallet() {
    throw new Error('this method should not call in node context')
    return null as never
  }

  onConnect(_callback: (info: { chainId: number }) => any) {
    // noop
  }

  offConnect(_callback?: (info: { chainId: number }) => any) {
    // noop
  }

  onAccountsChange(_callback: (accounts: string[]) => any) {
    // noop
  }

  offAccountsChange(_callback?: (accounts: string[]) => any) {
    // noop
  }

  onDisconnect(_callback: (error: { code: number; message: string }) => any) {
    // noop
  }

  offDisconnect(_callback?: (error: { code: number; message: string }) => any) {
    // noop
  }

  onChainChange(_callback: (chainId: number) => any) {
    // noop
  }

  offChainChange(_callback: (chainId: number) => any) {
    // noop
  }
}
