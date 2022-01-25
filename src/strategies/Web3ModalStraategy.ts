// import { ethers } from 'ethers'
// import Fortmatic from 'fortmatic'
// import Web3Modal, { IProviderOptions, ThemeColors } from 'web3modal'
// // eslint-disable-next-line import/no-unresolved
// import { IFortmaticConnectorOptions } from 'web3modal/dist/providers/connectors/fortmatic'
// // eslint-disable-next-line import/no-unresolved
// import { ITorusConnectorOptions } from 'web3modal/dist/providers/connectors/torus'
// import { WalletSetting } from '../types/WalletSetting'
// import { WalletStrategy } from './interface'

// export class Web3ModalStrategy implements WalletStrategy {
//   private web3Modal: Web3Modal | null
//   private ethersProvider: ethers.providers.Web3Provider | null
//   private eventConnectCallbacks: Array<(info: { chainId: number }) => any> = []
//   private eventDisconnectCallbacks: Array<
//     (error: { code: number; message: string }) => any
//   > = []
//   private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []
//   private eventChainChangeCallbacks: Array<(chainId: number) => any> = []

//   constructor(private walletSetting: WalletSetting) {
//     this.ethersProvider = null
//     this.web3Modal = null
//   }

//   async isWalletConnect() {
//     if (this.ethersProvider === null) return false

//     const accounts = await this.ethersProvider.listAccounts()
//     if (accounts && accounts.length > 0) {
//       return true
//     } else {
//       return false
//     }
//   }

//   async getWalletInfo() {
//     const networkId = await this.getConnectedNetworkId()
//     const unit: 'MATIC' | 'ETH' =
//       networkId === 137 || networkId === 80001 ? 'MATIC' : 'ETH'
//     const provider = this.ethersProvider
//     if (provider === null) throw Error('not wallet connect')
//     const accounts = await provider.listAccounts()
//     const address = accounts[0]
//     const balance = await provider.getBalance(address)
//     return {
//       address,
//       balance,
//       unit,
//     }
//   }

//   getProvider() {
//     if (this.ethersProvider === null) throw Error('not wallet connect')
//     return this.ethersProvider
//   }

//   async connectWallet() {
//     const providerSelectModalTheme: ThemeColors | 'light' | 'dark' = {
//       background: 'rgb(39, 49, 56)',
//       main: 'rgb(199, 199, 199)',
//       secondary: 'rgb(136, 136, 136)',
//       border: 'rgba(195, 195, 195, 0.14)',
//       hover: 'rgb(16, 26, 32)',
//     }
//     this.web3Modal = new Web3Modal({
//       providerOptions: await this.getProviderOptions(),
//       cacheProvider: false,
//       theme: providerSelectModalTheme,
//     })
//     const provider = await this.web3Modal.connect()
//     // TODO: テーミング
//     // TODO: Providerごとの特殊な操作（Walletのモーダル開くとか）についてどうするか
//     // TODO: Fortmaticのネットワークチェンジ
//     // TODO: Fortmaticをオプショナルにする（使うなら自分で取ってきてね）
//     // TODO: Torusのテーミング
//     // Note: A Fortmatic instance is available on the provider as provider.fm

//     // events compatible with EIP-1193 standard.
//     // Subscribe to accounts change
//     provider.on('accountsChanged', this.emitAccountChange)
//     // Subscribe to chainId change
//     provider.on('chainChanged', (chainId: number) => {
//       console.log(chainId)
//       this.emitChainChange(chainId)
//     })
//     // Subscribe to provider connection
//     provider.on('connect', this.emitConnect)
//     // Subscribe to provider disconnection
//     provider.on('disconnect', this.emitDisconnect)

//     this.ethersProvider = new ethers.providers.Web3Provider(provider)

//     // await window.ethereum.request({
//     //   method: 'wallet_switchEthereumChain',
//     //   params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
//     // })
//     const network = await this.ethersProvider.getNetwork()
//     this.emitConnect({ chainId: network.chainId })
//   }

//   async getConnectedNetworkId() {
//     const provider = this.ethersProvider
//     if (provider === null) throw Error('not wallet connect')
//     const network = await provider.getNetwork()
//     return network.chainId
//   }

//   onConnect(callback: () => any) {
//     this.eventConnectCallbacks.push(callback)
//   }

//   offConnect(callback?: () => any) {
//     if (callback) {
//       this.eventConnectCallbacks.forEach((f, index) => {
//         if (f === callback) {
//           this.eventConnectCallbacks.splice(index, 1)
//         }
//       })
//     } else {
//       this.eventConnectCallbacks = []
//     }
//   }

//   onAccountsChange(callback: (accounts: string[]) => any) {
//     this.eventAccountsChangeCallbacks.push(callback)
//   }

//   offAccountsChange(callback?: (accounts: string[]) => any) {
//     if (callback) {
//       this.eventAccountsChangeCallbacks.forEach((f, index) => {
//         if (f === callback) {
//           this.eventAccountsChangeCallbacks.splice(index, 1)
//         }
//       })
//     } else {
//       this.eventAccountsChangeCallbacks = []
//     }
//   }

//   onDisconnect(callback: () => any) {
//     this.eventDisconnectCallbacks.push(callback)
//   }

//   offDisconnect(callback?: () => any) {
//     if (callback) {
//       this.eventDisconnectCallbacks.forEach((f, index) => {
//         if (f === callback) {
//           this.eventDisconnectCallbacks.splice(index, 1)
//         }
//       })
//     } else {
//       this.eventDisconnectCallbacks = []
//     }
//   }

//   private getProviderOptions = async () => {
//     // torusをdefault。Fortmaticなどは引数に応じてオプションにしよう
//     const { default: Torus } = await import('@toruslabs/torus-embed')
//     const providerOptions = {
//       torus: {
//         package: Torus, // required
//         display: { description: 'description desu' }, // OptionでModalをカスタマイズできる
//         options: {
//           config: {
//             buttonPosition: 'bottom-left',
//             showTorusButton: true,
//             loginConfig: {
//               google: {
//                 typeOfLogin: 'google',
//               },
//             },
//             whiteLabel: {
//               theme: {
//                 isDark: false,
//                 colors: {
//                   torusBrand1: '#282c34',
//                 },
//               },
//               logoDark: 'https://tkey.surge.sh/images/Device.svg', // Dark logo for light background
//               logoLight: 'https://tkey.surge.sh/images/Device.svg', // Light logo for dark background
//               topupHide: false,
//               featuredBillboardHide: true,
//               disclaimerHide: true,
//               defaultLanguage: 'ja',
//             },
//           },
//           network: '',
//         } as ITorusConnectorOptions,
//         fortmatic: {
//           package: Fortmatic, // required
//           options: {
//             key: this.walletSetting.fortmatic.key, // required
//           } as IFortmaticConnectorOptions,
//         },
//       },
//     } as IProviderOptions
//     return providerOptions
//   }

//   private emitAccountChange = (accounts: string[]) => {
//     this.eventAccountsChangeCallbacks.forEach((f) => f(accounts))
//   }

//   private emitConnect = (info: { chainId: number }) => {
//     this.eventConnectCallbacks.forEach((f) => f(info))
//   }

//   private emitDisconnect = (error: { code: number; message: string }) => {
//     this.eventDisconnectCallbacks.forEach((f) => f(error))
//   }

//   private emitChainChange = (chainId: number) => {
//     this.eventChainChangeCallbacks.forEach((f) => f(chainId))
//   }
// }
