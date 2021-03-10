import { Token } from './types/Token'
import { BACKEND_URL } from './constants/index'
import Axios, { AxiosInstance } from 'axios'
import * as ethers from 'ethers'
import Fortmatic from 'fortmatic'
import { Item } from './types/Item'
import { ItemLog } from './types/ItemLog'
import { NetworkId } from './types/NetworkId'
import { BigNumber } from './types/BigNumber'
import { WalletInfo } from './types/WalletInfo'
import { WalletSetting } from './types/WalletSetting'
import { WidgetMode } from 'fortmatic/dist/cjs/src/core/sdk'

export { Item, ItemLog, NetworkId, BigNumber, Token, WalletSetting, WalletInfo }

export class AnnapurnaSDK {
  /**
   * ether(通常のETHと表示される価格)をBigNumberとして返す
   *
   * @param ether 通常のETHと表示されるもの
   * @returns etherをBigNumberとしてparseしたもの
   */
  public static parseEther = (ether: string) => {
    return ethers.utils.parseEther(ether)
  }

  /**
   * BigNumberをether(通常のETHと表示される価格)にフォーマットして返す
   *
   * @param bg
   * @returns Ether単位でパースされたstring
   */
  public static formatEther = (bg: BigNumber) => {
    return ethers.utils.formatEther(bg)
  }

  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []
  private eventDisconnectCallbacks: Array<() => any> = []
  private eventConnectCallbacks: Array<() => any> = []

  private constructor(
    private accessToken: string,
    private networkId: NetworkId,
    private axios: AxiosInstance,
    private fortmatic: WidgetMode,
    private metamaskProvider: ethers.providers.Web3Provider | null,
    private shopContract: {
      abi: any
      address: string
    }
  ) {
    if (metamaskProvider) {
      metamaskProvider.on('network', (_, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload()
        }
      })

      metamaskProvider.on('accountsChanged', (accounts: string[]) => {
        this.emitAccountChange(accounts)
      })

      metamaskProvider.on('connect', (_: { chainId: number }) => {
        this.emitConnect()
      })

      metamaskProvider.on(
        'disconnect',
        (_: { code: number; message: string }) => {
          this.emitDisconnect()
        }
      )
    }
  }

  /**
   * sdkのイニシャライズ
   *
   * @param accessToken
   * @param networkId
   * @param walletSetting
   * @returns sdkのインスタンス
   */
  public static initialize = async (
    accessToken: string,
    networkId: NetworkId,
    walletSetting: WalletSetting,
    // for Developing SDK
    devOption?: {
      backendUrl?: string
      jsonRPCUrl?: string
      contractMintAbi?: any
      contractMintShopAddress?: string
    }
  ) => {
    const backendBaseUrl = devOption?.backendUrl ?? BACKEND_URL
    const axios = Axios.create({
      baseURL: backendBaseUrl,
      headers: {
        'annapurna-access-token': accessToken,
      },
    })

    const { data } = await axios.get('/projectConfig')

    const fortmatic = new Fortmatic(
      walletSetting.fortmatic.key,
      devOption?.jsonRPCUrl
        ? {
            rpcUrl: devOption.jsonRPCUrl,
          }
        : undefined
    )

    const metamaskProvider = (window as any).ethereum
      ? new ethers.providers.Web3Provider((window as any).ethereum, 'any')
      : null

    const contractShopAbi =
      devOption?.contractMintAbi ??
      (networkId === 1
        ? data.data.contract.mintShopContract.main.abi
        : data.data.contract.mintShopContract.rinkeby.abi)
    const contractShopAddress =
      devOption?.contractMintShopAddress ??
      (networkId === 1
        ? data.data.contract.mintShopContract.main.address
        : data.data.contract.mintShopContract.rinkeby.address)

    const sdk = new AnnapurnaSDK(
      accessToken,
      networkId,
      axios,
      fortmatic,
      metamaskProvider,
      {
        abi: contractShopAbi,
        address: contractShopAddress,
      }
    )
    return sdk
  }

  public isWalletConnect = async () => {
    if (this.metamaskProvider && this.metamaskProvider.provider.request) {
      const accounts = await this.metamaskProvider.listAccounts()
      return accounts.length > 0
    } else {
      return await this.fortmatic.user.isLoggedIn()
    }
  }

  public connectWallet = async () => {
    if (this.metamaskProvider && this.metamaskProvider.provider.request) {
      await this.metamaskProvider.provider.request({
        method: 'eth_requestAccounts',
      })
    } else {
      await this.fortmatic.getProvider().enable()
      this.emitConnect()
    }
  }

  public disconnectWallet = async () => {
    await this.fortmatic.user.logout()
    this.emitDisconnect()
  }

  public getWalletInfo: () => Promise<WalletInfo> = async () => {
    if (!(await this.isWalletConnect())) {
      throw new Error('not LoggedId')
    }

    if (this.metamaskProvider) {
      const accounts = await this.metamaskProvider.listAccounts()
      const address = accounts[0]
      const balance = await this.metamaskProvider.getBalance(address)
      return {
        address,
        balance,
      }
    } else {
      const accounts = (await this.fortmatic
        .getProvider()
        .send('eth_accounts')) as string[]
      const address = accounts[0]
      const balance = await new ethers.providers.Web3Provider(
        this.fortmatic.getProvider() as any
      ).getBalance(address)
      return {
        address,
        balance,
      }
    }
  }

  public waitForTransaction = async (txHash: string) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }
    const wallet = await this.getProvider()
    await wallet.waitForTransaction(txHash)
  }

  public getItems = async () => {
    const { data } = await this.axios.get('/items')
    const items = data.data as Item[]
    const formatItems = items.map(this.formatItem)
    return formatItems
  }

  public getItemsByBidderAddress = async (address: string) => {
    const { data } = await this.axios.get('getItemsByBidderAddress', {
      params: {
        address,
        networkId: this.networkId,
      },
    })
    const items = data.data as Item[]
    return items.map(this.formatItem)
  }

  public getItemById = async (itemId: string) => {
    const { data } = await this.axios.get('item', { params: { itemId } })
    const item = data.data as Item
    return this.formatItem(item)
  }

  public getItemLogs = async (itemId: string) => {
    const { data } = await this.axios.get<{
      data: {
        type: 'bought' | 'bid'
        accountAddress: string
        price: number // only 'bid' and 'bought'
        createAt: Date
        transactionHash: string
      }[]
    }>('itemLogs', { params: { itemId } })
    const logs = data.data
    return logs.map((l) => ({
      ...l,
      createAt: new Date(l.createAt),
    })) as ItemLog[]
  }

  public getTokensByAddress = async (address: string) => {
    const { data } = await this.axios.get('tokensByAddress', {
      params: { address, networkId: this.networkId },
    })
    return data.data as Token[]
  }

  public sendTxBid = async (itemId: string, bidPrice: number) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const item = await this.getItemById(itemId)
    const wallet = await this.getProvider()
    const signer = wallet.getSigner()

    const shopContract = new ethers.Contract(
      this.shopContract.address,
      this.shopContract.abi,
      signer
    )
    if (item.tradeType !== 'auction') {
      throw new Error("Item's tradeType is not auction")
    }
    const initialPrice = ethers.utils
      .parseEther(String(item.initialPrice))
      .toString()
    const price = ethers.utils.parseEther(String(bidPrice)).toString()
    const startAt = item.startAt!.getTime() / 1000
    const endAt = item.endAt!.getTime() / 1000
    return (await shopContract.bidAuction(
      item.tokenId,
      item.tokenURI,
      item.authorAddress,
      initialPrice,
      startAt,
      endAt,
      price,
      item.signature,
      {
        value: price,
      }
    )) as ethers.providers.TransactionResponse
  }

  public sendTxMakeSuccessfulBid = async (itemId: string) => {
    // wallet connect check
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }
    const item = await this.getItemById(itemId)
    const wallet = await this.getProvider()
    const signer = wallet.getSigner()
    const initialPrice = ethers.utils
      .parseEther(String(item.initialPrice))
      .toString()
    const shopContract = new ethers.Contract(
      this.shopContract.address,
      this.shopContract.abi,
      signer
    )
    if (item.tradeType !== 'auction') {
      throw new Error("Item's tradeType is not auction")
    }
    return (await shopContract.buyAuction(
      item.tokenId,
      item.tokenURI,
      item.authorAddress,
      initialPrice,
      item.startAt,
      item.endAt,
      item.signature
    )) as ethers.providers.TransactionResponse
  }

  public sendTxBuyItem = async (itemId: string) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }
    const item = await this.getItemById(itemId)
    const wallet = await this.getProvider()
    const signer = wallet.getSigner()
    const shopContract = new ethers.Contract(
      this.shopContract.address,
      this.shopContract.abi,
      signer
    )
    if (item.tradeType !== 'fixedPrice') {
      throw new Error("Item's tradeType is not fixedPrice")
    }

    const price = ethers.utils
      .parseEther((item.price as number).toString())
      .toString()
    return (await shopContract.buyFixedPrice(
      item.tokenId,
      item.tokenURI,
      item.authorAddress,
      price,
      item.signature,
      {
        value: price,
      }
    )) as ethers.providers.TransactionResponse
  }

  public onAccountsChange = (callback: (accounts: string[]) => any) => {
    this.eventAccountsChangeCallbacks.push(callback)
  }

  public offAccountsChange = (callback?: (accounts: string[]) => any) => {
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

  public onConnect = (callback: () => any) => {
    this.eventConnectCallbacks.push(callback)
  }

  public offConnect = (callback?: () => any) => {
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

  public onDisconnect = (callback: () => any) => {
    this.eventDisconnectCallbacks.push(callback)
  }

  public offDisconnect = (callback?: () => any) => {
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

  private getProvider = () => {
    if (this.metamaskProvider) {
      return this.metamaskProvider
    } else {
      const provider = this.fortmatic.getProvider()
      return new ethers.providers.Web3Provider(provider as any)
    }
  }

  private formatItem = (item: Item) => {
    return {
      ...item,
      startAt: item.startAt ? new Date(item.startAt) : undefined,
      endAt: item.endAt ? new Date(item.endAt) : undefined,
    }
  }

  private emitAccountChange = (accounts: string[]) => {
    this.eventAccountsChangeCallbacks.forEach((f) => f(accounts))
  }

  private emitDisconnect = () => {
    this.eventDisconnectCallbacks.forEach((f) => f())
  }

  private emitConnect = () => {
    this.eventConnectCallbacks.forEach((f) => f())
  }
}
