import { ethers } from 'ethers'
import Fortmatic from 'fortmatic'
import Web3Modal from 'web3modal'
import { WalletSetting } from '../types/WalletSetting'
import { WalletStrategy } from './interface'

export class Web3ModalStrategy implements WalletStrategy {
  private web3Modal: Web3Modal | null
  private ethersProvider: ethers.providers.Web3Provider | null
  private eventConnectCallbacks: Array<() => any> = []
  private eventDisconnectCallbacks: Array<() => any> = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []

  constructor(private walletSetting: WalletSetting) {
    this.ethersProvider = null
    this.web3Modal = null
  }

  async isWalletConnect() {
    if (this.ethersProvider === null) return false

    const accounts = await this.ethersProvider.listAccounts()
    if (accounts && accounts.length > 0) {
      return true
    } else {
      return false
    }
  }

  async getWalletInfo() {
    const networkId = await this.getConnectedNetworkId()
    const unit: 'MATIC' | 'ETH' =
      networkId === 137 || networkId === 80001 ? 'MATIC' : 'ETH'
    const provider = this.ethersProvider
    if (provider === null) throw Error('not wallet connect')
    const accounts = await provider.listAccounts()
    const address = accounts[0]
    const balance = await provider.getBalance(address)
    return {
      address,
      balance,
      unit,
    }
  }

  getProvider() {
    if (this.ethersProvider === null) throw Error('not wallet connect')
    return this.ethersProvider
  }

  async connectWallet() {
    this.web3Modal = new Web3Modal({
      providerOptions: await this.getProviderOptions(),
    })
    const provider = await this.web3Modal.connect()
    this.ethersProvider = new ethers.providers.Web3Provider(provider)
    this.emitConnect()
  }

  async getConnectedNetworkId() {
    const provider = this.ethersProvider
    if (provider === null) throw Error('not wallet connect')
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
    // TODO:
    // await this.fortmatic.user.logout()
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

  changeNetwork = () => {
    console.log('hoge')
  }

  private getProviderOptions = async () => {
    const { default: Torus } = await import('@toruslabs/torus-embed')
    const providerOptions = {
      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: this.walletSetting.fortmatic.key, // required
        },
      },
      torus: {
        package: Torus, // required
        // options: {
        // networkParams: {
        // chainId: 137, // optional
        // networkId: 4, // optional
        // },
        // },
      },
    }
    return providerOptions
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
