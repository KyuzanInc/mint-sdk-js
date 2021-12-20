import { WalletStrategy } from './interface'
import { WalletSetting } from '../types/WalletSetting'
import { ethers } from 'ethers'
import { WidgetMode } from 'fortmatic/dist/cjs/src/core/sdk'
const Fortmatic = require('fortmatic')

export class FortmaticStrategy implements WalletStrategy {
  private fortmatic: WidgetMode
  private eventConnectCallbacks: Array<() => any> = []
  private eventDisconnectCallbacks: Array<() => any> = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []

  constructor(
    walletSetting: WalletSetting,
    devOption?: { backendUrl?: string; jsonRPCUrl?: string }
  ) {
    this.fortmatic = new Fortmatic(
      walletSetting.fortmatic.key,
      devOption?.jsonRPCUrl
        ? {
            rpcUrl: devOption.jsonRPCUrl,
          }
        : undefined
    )
  }

  async isWalletConnect() {
    return await this.fortmatic.user.isLoggedIn()
  }

  async getWalletInfo() {
    const networkId = await this.getConnectedNetworkId()
    const unit: 'MATIC' | 'ETH' =
      networkId === 137 || networkId === 80001 ? 'MATIC' : 'ETH'
    const provider = this.fortmatic.getProvider()
    const accounts = (await provider.send('eth_accounts')) as string[]
    const address = accounts[0]
    const balance = await new ethers.providers.Web3Provider(
      provider as any
    ).getBalance(address)
    return {
      address,
      balance,
      unit,
    }
  }

  async openSettings() {
    return this.fortmatic.user.settings()
  }

  getProvider() {
    const provider = this.fortmatic.getProvider()
    return new ethers.providers.Web3Provider(provider as any)
  }

  async connectWallet() {
    await this.fortmatic.getProvider().enable()
    this.emitConnect()
  }

  async getConnectedNetworkId() {
    const provider = new ethers.providers.Web3Provider(
      this.fortmatic.getProvider() as any
    )
    const network = await provider.getNetwork()
    return network.chainId
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

  async disconnectWallet() {
    await this.fortmatic.user.logout()
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
