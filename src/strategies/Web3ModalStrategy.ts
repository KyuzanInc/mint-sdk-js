import { WalletStrategy } from './interface'
import { WalletSetting } from '../types/WalletSetting'
import { NetworkId } from 'index'
import { ethers } from 'ethers'
import { WidgetMode } from 'fortmatic/dist/cjs/src/core/sdk'
import Web3Modal from 'web3modal'
import Fortmatic from 'fortmatic'
// import Torus from '@toruslabs/torus-embed'

export class Web3ModalStrategy implements WalletStrategy {
  private fortmatic: WidgetMode
  // private networkIds: NetworkId[]
  private web3Modal: Web3Modal
  private eventConnectCallbacks: Array<() => any> = []
  private eventDisconnectCallbacks: Array<() => any> = []
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []

  constructor(
    private networkIds: NetworkId[],
    private walletSetting: WalletSetting,
    private devOption?: { backendUrl?: string; jsonRPCUrl?: string }
  ) {
      this.web3Modal = new Web3Modal({
        // network: this.getConnectedNetworkId(),
        // cacheProvider: true,
        providerOptions: this.getProviderOptions()
      })
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

  getProvider() {
    const provider = this.fortmatic.getProvider()
    return new ethers.providers.Web3Provider(provider as any)
  }

  async connectWallet() {
    // await this.fortmatic.getProvider().enable()
    const provider = await this.web3Modal.connect()
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

  changeNetwork = () => {
    console.log('hoge');
  };

  getProviderOptions = () => {
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
      }
      // torus: {
      //   package: Torus // required
      //   // package: Torus, // required
      //   // options: {
      //   //   // networkParams: {
      //   //   //   host: "https://localhost:8545", // optional
      //   //   //   chainId: 1337, // optional
      //   //   //   networkId: 1337 // optional
      //   //   // },
      //   //   // config: {
      //   //   //   buildEnv: "development" // optional
      //   //   // }
      //   // }
      // }
    };
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
