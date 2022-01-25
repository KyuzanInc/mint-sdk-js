import { ethers } from 'ethers'
import Web3Modal, { IProviderOptions } from 'web3modal'
// eslint-disable-next-line import/no-unresolved
import { IFortmaticConnectorOptions } from 'web3modal/dist/providers/connectors/fortmatic'
import { WalletInfo, WalletSetting } from '.'

// // ここで、connectしたProviderごとに対応したmethodを呼ぶ
export class Web3Provider implements IWeb3Provider {
  private web3Modal: Web3Modal | null
  private ethersProvider: ethers.providers.Web3Provider | null

  private eventConnectCallbacks: Array<(info: { chainId: number }) => any> = []
  private eventDisconnectCallbacks: Array<
    (error: { code: number; message: string }) => any
  > = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []
  private eventChainChangeCallbacks: Array<(chainId: number) => any> = []

  constructor(private walletSetting: WalletSetting) {
    this.ethersProvider = null
    this.web3Modal = null
  }

  public async connectWallet() {
    const { default: Fortmatic } = await import('fortmatic')
    const { default: Torus } = await import('@toruslabs/torus-embed')
    const providerOptions: IProviderOptions = {
      torus: this.walletSetting.providers
        ? {
            package: Torus, // required
            display: this.walletSetting.providers.torus.display,
            options: this.walletSetting.providers.torus.options,
          }
        : { package: Torus },
    }

    if (this.walletSetting.providers.fortmatic) {
      providerOptions['fortmatic'] = {
        package: Fortmatic,
        options: {
          key: this.walletSetting.providers.fortmatic?.key, // required
        } as IFortmaticConnectorOptions,
      }
    }

    this.web3Modal = new Web3Modal({
      providerOptions,
      cacheProvider:
        this.walletSetting.selectWalletModal?.cacheProvider ?? false,
      theme: this.walletSetting.selectWalletModal?.theme ?? 'light',
    })
    const provider = await this.web3Modal.connect()
    // TODO: Providerごとの特殊な操作（Walletのモーダル開く）についてどうするか
    // Note: A Fortmatic instance is available on the provider as provider.fm

    // Events compatible with EIP-1193 standard.
    // Subscribe to accounts change
    provider.on('accountsChanged', this.emitAccountChange)
    // Subscribe to chainId change
    provider.on('chainChanged', (chainId: number) => {
      console.log(chainId)
      this.emitChainChange(chainId)
    })
    // Subscribe to provider connection
    provider.on('connect', this.emitConnect)
    // Subscribe to provider disconnection
    provider.on('disconnect', this.emitDisconnect)

    this.ethersProvider = new ethers.providers.Web3Provider(provider)

    const network = await this.ethersProvider.getNetwork()
    this.emitConnect({ chainId: network.chainId })
  }

  public async openWallet() {
    // TODO
  }

  public async isWalletConnect() {
    if (this.ethersProvider === null) return false

    const accounts = await this.ethersProvider.listAccounts()
    if (accounts && accounts.length > 0) {
      return true
    } else {
      return false
    }
  }

  public async getWalletInfo() {
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

  public getProvider() {
    if (this.ethersProvider === null) throw Error('not wallet connect')
    return this.ethersProvider
  }

  public async getConnectedNetworkId() {
    const provider = this.ethersProvider
    if (provider === null) throw Error('not wallet connect')
    const network = await provider.getNetwork()
    return network.chainId
  }

  public onConnect(callback: (info: { chainId: number }) => any) {
    this.eventConnectCallbacks.push(callback)
  }

  public offConnect(callback?: (info: { chainId: number }) => any) {
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

  public onAccountsChange(callback: (accounts: string[]) => any) {
    this.eventAccountsChangeCallbacks.push(callback)
  }

  public offAccountsChange(callback?: (accounts: string[]) => any) {
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

  public onChainChange(callback: (chainId: number) => any) {
    this.eventChainChangeCallbacks.push(callback)
  }

  public offChainChange(callback?: (chainId: number) => any) {
    if (callback) {
      this.eventChainChangeCallbacks.forEach((f, index) => {
        if (f === callback) {
          this.eventChainChangeCallbacks.splice(index, 1)
        }
      })
    } else {
      this.eventChainChangeCallbacks = []
    }
  }

  public onDisconnect(
    callback: (error: { code: number; message: string }) => any
  ) {
    this.eventDisconnectCallbacks.push(callback)
  }

  public offDisconnect(
    callback?: (error: { code: number; message: string }) => any
  ) {
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

  private emitConnect = (info: { chainId: number }) => {
    this.eventConnectCallbacks.forEach((f) => f(info))
  }

  private emitDisconnect = (error: { code: number; message: string }) => {
    this.eventDisconnectCallbacks.forEach((f) => f(error))
  }

  private emitChainChange = (chainId: number) => {
    this.eventChainChangeCallbacks.forEach((f) => f(chainId))
  }
}

export interface IWeb3Provider {
  isWalletConnect(): Promise<boolean>
  connectWallet(): Promise<void>
  getConnectedNetworkId(): Promise<number>
  getWalletInfo(): Promise<WalletInfo>
  getProvider(): ethers.providers.Web3Provider

  // TODO: OpenWallet: 抽象化れたもの。torus.showWallet();などがあれば
  // 接続されたproviderによって判断
  openWallet(): Promise<void>

  onAccountsChange(callback: (accounts: string[]) => any): void
  offAccountsChange(callback?: (accounts: string[]) => any): void

  onConnect(callback: (info: { chainId: number }) => any): void
  offConnect(callback?: (info: { chainId: number }) => any): void

  onDisconnect(
    callback: (error: { code: number; message: string }) => any
  ): void
  offDisconnect(
    callback?: (error: { code: number; message: string }) => any
  ): void

  onChainChange(callback: (chainId: number) => any): void
  offChainChange(callback?: (chainId: number) => any): void
}
