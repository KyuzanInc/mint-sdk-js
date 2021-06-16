import { WalletStrategy } from './interface'

export class NodeStrategy implements WalletStrategy {
  constructor() { }

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

  onConnect(callback: () => any) {
    // noop
  }

  offConnect(callback?: () => any) {
    // noop
  }


  onAccountsChange(callback: (accounts: string[]) => any) {
    // noop
  }

  offAccountsChange(callback?: (accounts: string[]) => any) {
    // noop
  }


  onDisconnect(callback: () => any) {
    // noop
  }

  offDisconnect(callback?: () => any) {
    // noop
  }

  private emitAccountChange = (accounts: string[]) => {
    // noop
  }

  private emitConnect = () => {
    // noop
  }

  private emitDisconnect = () => {
    // noop
  }
}