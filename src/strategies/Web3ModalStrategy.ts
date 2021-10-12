import { WalletStrategy } from './interface'
import { WalletSetting } from '../types/WalletSetting'
import { NetworkId } from 'index'
import { ethers } from 'ethers'
import { WidgetMode } from 'fortmatic/dist/cjs/src/core/sdk'
import Web3Modal from 'web3modal'
import Fortmatic from 'fortmatic'

export class Web3ModalStrategy implements WalletStrategy {
  // private fortmatic: WidgetMode
  // private networkIds: NetworkId[]
  private web3Modal: Web3Modal | null
  private ethersProvider: ethers.providers.Web3Provider | null
  private eventConnectCallbacks: Array<() => any> = []
  private eventDisconnectCallbacks: Array<() => any> = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []

  constructor(
    private networkIds: NetworkId[],
    private walletSetting: WalletSetting,
    private devOption?: { backendUrl?: string; jsonRPCUrl?: string }
  ) {
    this.ethersProvider = null
    this.web3Modal = null
      // this.fortmatic = new Fortmatic(
      //   walletSetting.fortmatic.key,
      //   devOption?.jsonRPCUrl
      //     ? {
      //         rpcUrl: devOption.jsonRPCUrl,
      //       }
      //     : undefined
      // )
  }

  async isWalletConnect() {
    if (this.ethersProvider === null) return false

    const accounts =  await this.ethersProvider.listAccounts()
    console.log(accounts)
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
    const accounts =  await provider.listAccounts()
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
      disableInjectedProvider: true,
      cacheProvider: true,
      providerOptions: await this.getProviderOptions()
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
    console.log('hoge');
  };

  private getProviderOptions = async () => {
    const { default: Torus } = await import('@toruslabs/torus-embed')
    console.log(Fortmatic)
    const providerOptions = {
      injected: {
        display: {
          logo: "data:image/gif;base64,INSERT_BASE64_STRING",
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: this.walletSetting.fortmatic.key // required
        }
      },
      torus: {
        package: Torus // required
        // package: Torus, // required
        // options: {
        //   // networkParams: {
        //   //   host: "https://localhost:8545", // optional
        //   //   chainId: 1337, // optional
        //   //   networkId: 1337 // optional
        //   // },
        //   // config: {
        //   //   buildEnv: "development" // optional
        //   // }
        // }
      }
    };
    console.log(providerOptions)
    return providerOptions;
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
