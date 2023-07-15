import { ethers } from 'ethers'
import Web3Modal, {
  IProviderOptions,
  providers as web3modalProviders,
} from 'web3modal'
import { WalletSetting } from '..'
import { IWeb3Provider } from './IWeb3Provider'
import {
  IProviderStrategy,
  MetamaskStrategy,
  TorusStrategy,
  WalletConnectStrategy,
  WalletConnectV2Strategy,
  walletConnectV2Connector,
} from './strategies'

const WALLET_CONNECT_DISPLAY = web3modalProviders.WALLETCONNECT

export class BrowserWeb3Provider implements IWeb3Provider {
  private web3Modal: Web3Modal | null
  private ethersProvider: ethers.providers.Web3Provider | null
  private providerStrategy: IProviderStrategy | null
  private currentAccountAddress: string | null
  private currentNetworkId: number | null

  private eventConnectCallbacks: Array<
    (info: { chainId: number | string }) => any
  > = []
  private eventDisconnectCallbacks: Array<
    (error: { code: number; message: string }) => any
  > = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []
  private eventChainChangeCallbacks: Array<(chainId: number) => any> = []

  constructor(private walletSetting: WalletSetting | null) {
    this.ethersProvider = null
    this.web3Modal = null
    this.providerStrategy = null
    this.currentAccountAddress = null
    this.currentNetworkId = null
  }

  public async connectWallet() {
    const { default: Torus } = await import('@toruslabs/torus-embed')
    const { default: WalletConnectProvider } = await import(
      '@walletconnect/web3-provider'
    )
    const { default: WalletConnectV2Provider } = await import(
      '@walletconnect/ethereum-provider'
    )
    const hideTorus = !!this.walletSetting?.params?.hideTorus

    const providerOptions: IProviderOptions = {
      ...(!hideTorus && {
        torus: {
          package: Torus,
        },
      }),
    }
    if (this.walletSetting?.providers?.torus && !hideTorus) {
      providerOptions['torus'] = {
        package: Torus,
        display: this.walletSetting?.providers?.torus?.display,
        options: {
          config: this.walletSetting?.providers?.torus?.options,
        },
      }
    }
    if (this.walletSetting?.providers?.walletconnect) {
      providerOptions['walletconnect'] = {
        package: WalletConnectProvider,
        options: {
          ...this.walletSetting?.providers?.walletconnect?.options,
        },
      }
    }
    if (this.walletSetting?.providers?.walletconnectV2) {
      // This is a custom provider, for WalletConnectV2
      providerOptions['custom-walletconnectv2'] = {
        display: {
          logo: WALLET_CONNECT_DISPLAY.logo,
          name: WALLET_CONNECT_DISPLAY.name,
          description: WALLET_CONNECT_DISPLAY.description,
        },
        package: WalletConnectV2Provider,
        options: {
          ...this.walletSetting?.providers?.walletconnectV2?.options,
        },
        connector: walletConnectV2Connector,
      }
    }

    this.web3Modal = new Web3Modal({
      cacheProvider:
        this.walletSetting?.selectWalletModal?.cacheProvider ?? false,
      theme: this.walletSetting?.selectWalletModal?.theme ?? 'light',
      providerOptions: providerOptions,
    })
    const provider = await this.web3Modal.connect()
    if (provider.torus) {
      // Selected Torus
      // ref: https://github.com/Web3Modal/web3modal/blob/master/docs/providers/torus.md
      this.providerStrategy = new TorusStrategy(provider.torus)
    } else if (provider.wc) {
      this.providerStrategy = new WalletConnectStrategy(provider.wc)
    } else if (provider.wcV2) {
      // For WalletConnectV2
      this.providerStrategy = new WalletConnectV2Strategy(provider.wcV2)
    } else {
      // Selected Injected
      this.providerStrategy = new MetamaskStrategy()
    }

    // Events compatible with EIP-1193 standard.
    // Subscribe to accounts change
    provider.on('accountsChanged', this.emitAccountChange)
    // Subscribe to chainId change
    provider.on('chainChanged', this.emitChainChange)
    // Subscribe to provider connection
    provider.on('connect', this.emitConnect)
    // Subscribe to provider disconnection
    provider.on('disconnect', this.emitDisconnect)

    // ref: https://github.com/ethers-io/ethers.js/issues/866
    this.ethersProvider = new ethers.providers.Web3Provider(provider, 'any')

    const network = await this.ethersProvider.getNetwork()
    const accounts = await this.ethersProvider.listAccounts()
    this.currentAccountAddress = accounts[0]
    this.currentNetworkId = network.chainId
    this.emitConnect({ chainId: network.chainId })
  }

  public async openWallet() {
    await this.providerStrategy?.openWallet()
  }

  public async isWalletConnect() {
    if (this.ethersProvider === null) return false

    try {
      const accounts = await this.ethersProvider.listAccounts()
      if (accounts && accounts.length > 0) {
        return true
      } else {
        return false
      }
    } catch (err) {
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
    const address = this.currentAccountAddress ?? accounts[0]
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

  public onConnect(callback: (info: { chainId: number | string }) => any) {
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
    const address = accounts[0]

    if (address === this.currentAccountAddress) {
      return
    }

    this.eventAccountsChangeCallbacks.forEach((f) => f(accounts))
    this.currentAccountAddress = address
  }

  private emitConnect = (info: { chainId: number | string }) => {
    this.eventConnectCallbacks.forEach((f) => f(info))
  }

  private emitDisconnect = (error: { code: number; message: string }) => {
    // Prevent metamask error when changing network
    if (
      this.providerStrategy instanceof MetamaskStrategy &&
      error instanceof Error
    ) {
      return
    }

    this.eventDisconnectCallbacks.forEach((f) => f(error))
  }

  private emitChainChange = (chainId: string) => {
    const networkId = parseInt(chainId)

    if (networkId === this.currentNetworkId) {
      return
    }

    this.eventChainChangeCallbacks.forEach((f) => f(networkId))
    this.currentNetworkId = networkId
  }
}
