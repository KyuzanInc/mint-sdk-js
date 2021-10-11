import { WalletStrategy } from './interface'
import * as ethers from 'ethers'
import { NetworkId } from 'index'

export class MetamaskStrategy implements WalletStrategy {
  private metamaskProvider: ethers.providers.Web3Provider
  private networkIds: NetworkId[]
  private eventConnectCallbacks: Array<() => any> = []
  private eventDisconnectCallbacks: Array<() => any> = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []

  public static checkExistsWeb3ProviderInWindow() {
    return !!(window as any).ethereum
  }

  constructor(networkIds: NetworkId[]) {
    this.networkIds = networkIds
    this.metamaskProvider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    )
    this.metamaskProvider.on('network', (_, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })
    ;(window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      this.emitAccountChange(accounts)
      if (accounts.length === 0) {
        this.emitDisconnect()
      }
    })
  }

  async connectWallet() {
    await this.metamaskProvider.provider.request!({
      method: 'eth_requestAccounts',
    })
    this.emitConnect()
  }

  async getConnectedNetworkId() {
    return parseInt((window as any).ethereum.networkVersion, 10)
  }

  async getWalletInfo() {
    const networkId = await this.getConnectedNetworkId()
    const unit: 'MATIC' | 'ETH' =
      networkId === 137 || networkId === 80001 ? 'MATIC' : 'ETH'
    const accounts = await this.metamaskProvider.listAccounts()
    const address = accounts[0]
    const balance = await this.metamaskProvider.getBalance(address)
    return {
      address,
      balance,
      unit,
    }
  }

  getProvider() {
    return this.metamaskProvider
  }

  async isWalletConnect() {
    const accounts = await this.metamaskProvider.listAccounts()
    return accounts.length > 0 && !!this.metamaskProvider.provider.request
  }

  async disconnectWallet() {
    await Promise.resolve()
    this.emitDisconnect()
  }

  onAccountsChange(callback: (accounts: string[]) => any) {
    this.eventAccountsChangeCallbacks.push(callback)
  }

  offAccountsChange(callback?: (accounts: string[]) => any) {
    if (callback) {
      this.eventAccountsChangeCallbacks.forEach((f, index) => {
        if (f === callback) {
          this.eventAccountsChangeCallbacks.splice(index, 1)
        }
      })
    } else {
      this.eventAccountsChangeCallbacks = []
    }
  }

  onConnect(callback: () => any) {
    this.eventConnectCallbacks.push(callback)
  }

  offConnect(callback?: () => any) {
    if (callback) {
      this.eventConnectCallbacks.forEach((f, index) => {
        if (f === callback) {
          this.eventConnectCallbacks.splice(index, 1)
        }
      })
    } else {
      this.eventConnectCallbacks = []
    }
  }

  onDisconnect(callback: () => any) {
    this.eventDisconnectCallbacks.push(callback)
  }

  offDisconnect(callback?: () => any) {
    if (callback) {
      this.eventDisconnectCallbacks.forEach((f, index) => {
        if (f === callback) {
          this.eventDisconnectCallbacks.splice(index, 1)
        }
      })
    } else {
      this.eventDisconnectCallbacks = []
    }
  }

  changeNetwork = () => {
    console.log('hoge');
  };

  private emitAccountChange = (accounts: string[]) => {
    this.eventAccountsChangeCallbacks.forEach((f) => f(accounts))
  }

  private emitConnect = () => {
    this.eventConnectCallbacks.forEach((f) => f())
  }

  private emitDisconnect = () => {
    this.eventDisconnectCallbacks.forEach((f) => f())
  }
}
