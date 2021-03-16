import { AxiosBody } from './types/AxiosBody'
import { Token } from './types/Token'
import { BACKEND_URL } from './constants/index'
import Axios, { AxiosInstance } from 'axios'
import * as Agent from 'agentkeepalive'

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
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * AnnapurnaSDK.parseEther('3.2') // BigNumber
   * ```
   */
  public static parseEther = (ether: string) => {
    return ethers.utils.parseEther(ether)
  }

  /**
   * BigNumberをether(通常のETHと表示される価格)にフォーマットして返す
   *
   * @param bg
   * @returns Ether単位でパースされたstring
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.connectWallet()  // required
   * const walletInfo = await sdk.getWalletInfo()
   * AnnapurnaSDK.formatEther(walletInfo.balance) // 3.2
   * ```
   */
  public static formatEther = (bg: BigNumber) => {
    return ethers.utils.formatEther(bg)
  }

  /**
   * @ignore
   */
  private eventAccountsChangeCallbacks: Array<(accounts: string[]) => any> = []

  /**
   * @ignore
   */
  private eventDisconnectCallbacks: Array<() => any> = []

  /**
   * @ignore
   */
  private eventConnectCallbacks: Array<() => any> = []

  /**
   * @ignore
   */
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
      ;(window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        this.emitAccountChange(accounts)
        if (accounts.length === 0) {
          this.emitDisconnect()
        }
      })
    }
  }

  /**
   * sdkのイシャライズ
   *
   * @param accessToken
   * @param networkId
   * @param walletSetting
   * @returns sdkのインスタンス
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * await AnnapurnaSDK.initialize(YOUR PROJECT ID, YOUR ACCESS TOKEN, { fortmatic: { token: YOUR FORTMATIC TOKEN } })
   * ```
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
    const keepAliveAgent = new Agent.HttpsAgent({
      maxSockets: 100,
      maxFreeSockets: 10,
      timeout: 60000, // active socket keepalive for 60 seconds
      freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    })
    const axios = Axios.create({
      httpsAgent: keepAliveAgent,
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

  /**
   * 有効なアカウントがあるの状態を返す
   *
   * @returns ウォレットが接続されていればtrue
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.isWalletConnect()
   * ```
   */
  public isWalletConnect = async () => {
    if (this.metamaskProvider && this.metamaskProvider.provider.request) {
      const accounts = await this.metamaskProvider.listAccounts()
      return accounts.length > 0
    } else {
      return await this.fortmatic.user.isLoggedIn()
    }
  }

  /**
   * ウォレットに接続
   * MetamaskがインストールされているブラウザではMetamaskが、されていない場合はFortmaticに接続を行う
   * ウォレットが接続されるとResolveされる
   * ウォレット接続をキャンセルした場合は、Rejectされる
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.isWalletConnect() // false
   * await sdk.connectWallet()
   * await sdk.isWalletConnect()  // true
   * ```
   */
  public connectWallet = async () => {
    if (this.metamaskProvider && this.metamaskProvider.provider.request) {
      await this.metamaskProvider.provider.request({
        method: 'eth_requestAccounts',
      })
      this.emitConnect()
    } else {
      await this.fortmatic.getProvider().enable()
      this.emitConnect()
    }
  }

  /**
   * ウォレットから切断
   * Fortmaticの場合、切断される
   * **MetaMaskが接続されている場合は何も実行されない**
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.disconnectWallet()
   * ```
   */
  public disconnectWallet = async () => {
    await this.fortmatic.user.logout()
    this.emitDisconnect()
  }

  /**
   * ウォレットのアカウントと残高情報などの情報が取得できる
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.connectWallet()  // required
   * await sdk.getWalletInfo()
   * ```
   */
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

  /**
   * Transactionが成功するとResolveするPromiseを返します
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @param txHash {@link ethers.providers.TransactionResponse}のhashプロパティ
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.connectWallet() // required
   * try {
   *  const tx = await sdk.sendTxBuyItem('item.itemId')
   *  await tx.wait()
   *  // success transaction
   * } catch (err) {
   *  // display error message
   * }
   * ```
   */
  public waitForTransaction = async (txHash: string) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }
    const wallet = await this.getProvider()
    await wallet.waitForTransaction(txHash)
  }

  /**
   * 公開中のアイテムを取得
   *
   * @param paging
   * @returns
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = await AnnapurnaSDK.initialize(...)
   * const items = await sdk.getItems()
   * ```
   */
  public getItems = async (
    {
      perPage,
      page,
    }: {
      perPage: number
      page: number
    } = {
      perPage: 30,
      page: 1,
    }
  ) => {
    const { data } = await this.axios.get('/v1_items', {
      params: { networkId: this.networkId, perPage, page },
    })
    const items = data.data as Item[]
    const formatItems = items.map(this.formatItem)
    return formatItems
  }

  /**
   * 指定したアドレスがBidしたItemの一覧を取得
   *
   * @param address ウォレットのアドレス
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * const item = await sdk.getItemsByBidderAddress('0x1111......')
   * ```
   */
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

  /**
   * ItemのitemId指定でアイテムを取得
   *
   * @param itemId {@link Item}のitemId
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * const item = await sdk.getItemById('item.itemId')
   * ```
   */
  public getItemById = async (itemId: string) => {
    const { data } = await this.axios.get('item', { params: { itemId } })
    const item = data.data as Item
    return this.formatItem(item)
  }

  /**
   * Tokenに紐づいたItemを取得
   * @param token
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * const item = await sdk.getItemByToken(token)
   * ```
   */
  public getItemByToken = async (token: Token) => {
    const { data } = await this.axios.get<AxiosBody<Item>>('v1_itemByToken', {
      params: {
        tokenId: token.tokenId,
        networkId: this.networkId,
        tokenAddress: token.contractAddress,
      },
    })
    const item = data.data
    return this.formatItem(item)
  }

  /**
   * アイテムの履歴(bidされた、買われた)の取得
   * 最新の物から返される
   *
   * @param itemId {@link Item}のitemId
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = await AnnapurnaSDK.initialize(...)
   * const item = await sdk.getItemLogs('Item.itemId')
   * ```
   */
  public getItemLogs = async (
    itemId: string,
    paging = {
      perPage: 30,
      page: 1,
    }
  ) => {
    const { data } = await this.axios.get<{
      data: {
        type: 'bought' | 'bid'
        accountAddress: string
        price: number // only 'bid' and 'bought'
        createAt: Date
        transactionHash: string
      }[]
    }>('v1_itemLogs', {
      params: { itemId, page: paging.page, perPage: paging.perPage },
    })
    const logs = data.data
    return logs.map((l) => ({
      ...l,
      createAt: new Date(l.createAt),
    })) as ItemLog[]
  }

  /**
   * 指定したアドレスが所持しているMINT経由で獲得したトークンを取得
   *
   * @param address Walletのアドレス
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...
   * const tokens = await sdk.getTokensByAddress('0x11111...')
   * ```
   */
  public getTokensByAddress = async (address: string) => {
    const { data } = await this.axios.get('tokensByAddress', {
      params: { address, networkId: this.networkId },
    })
    return data.data as Token[]
  }

  /**
   * 指定した金額でBidするトランザクションを発行
   * Bidする謹賀具の総額を`bidPrice`に指定する
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @param itemId {@link Item}のitemId
   * @param bidPrice 単位はether
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.connectWallet() // required
   * try {
   *  const tx = await sdk.sendTxBid('item.itemId', 2)
   *  // show loading
   *  await tx.wait()
   *  // success transaction
   * } catch (err) {
   *  // display error message
   * }
   * ```
   */
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
      // TODO
      item.tokenURI.replace('https://ipfs.io/ipfs/', ''),
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

  /**
   * オークションで勝利したアイテムを引き出すトランザクションを発行
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @param itemId {@link Item}のitemId
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.connectWallet() // required
   * try {
   *  const tx = await sdk.sendTxMakeSuccessfulBid('item.itemId')
   *  // show loading
   *  await tx.wait()
   *  // success transaction
   * } catch (err) {
   *  // display error message
   * }
   * ```
   */
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
      // TODO
      item.tokenURI.replace('https://ipfs.io/ipfs/', ''),
      item.authorAddress,
      initialPrice,
      item.startAt!.getTime() / 1000,
      item.endAt!.getTime() / 1000,
      item.signature
    )) as ethers.providers.TransactionResponse
  }

  /**
   * FixedPriceのアイテムを購入するトランザクションを発行
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @param itemId {@link Item}のitemId
   * @returns
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * await sdk.connectWallet() // required
   * try {
   *  const tx = await sdk.sendTxBuyItem('item.itemId')
   *  // show loading
   *  await tx.wait()
   *  // success transaction
   * } catch (err) {
   *  // display error message
   * }
   * ```
   */
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
      // TODO
      item.tokenURI.replace('https://ipfs.io/ipfs/', ''),
      item.authorAddress,
      price,
      item.signature,
      {
        value: price,
      }
    )) as ethers.providers.TransactionResponse
  }

  /**
   * アカウントが変更された際に呼び出される関数を設定できる
   *
   * @param callback
   * @returns void
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * sdk.onAccountsChange((accounts: string[]) => {
   *    // some thing
   * })
   * ```
   */
  public onAccountsChange = (callback: (accounts: string[]) => any) => {
    this.eventAccountsChangeCallbacks.push(callback)
  }

  /**
   * @ignore
   */
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

  /**
   * ウォレットに接続した際に呼び出される関数を設定できる
   *
   * @param callback
   * @returns void
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * sdk.onConnect(() => {
   *    // some thing
   * })
   * ```
   */
  public onConnect = (callback: () => any) => {
    this.eventConnectCallbacks.push(callback)
  }

  /**
   * @ignore
   */
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

  /**
   * ウォレットから切断した際に呼び出される関数を設定できる
   *
   * @param callback
   * @returns void
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   * const sdk = await AnnapurnaSDK.initialize(...)
   * sdk.onDisconnect(() => {
   *    // some thing
   * })
   * ```
   */
  public onDisconnect = (callback: () => any) => {
    this.eventDisconnectCallbacks.push(callback)
  }

  /**
   * @ignore
   */
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

  /**
   * サーバーのUnixタイムを取得
   *
   * @returns unix time (ms)
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = AnnapurnaSDK.initialize(...)
   * await	sdk.connectWallet()
   * await sdk.getServerUnixTime()  // ex) 1615444120104
   * ```
   */
  public getServerUnixTime = async () => {
    const { data } = await this.axios.get('serverSideTime')
    return data.data
  }

  /**
   * MetaMaskかどうかを判定
   *
   * @returns trueならばMetaMask
   *
   * ```typescript
   * import { AnnapurnaSDK } from '@kyuzan/annapurna'
   *
   * const sdk = AnnapurnaSDK.initialize(...)
   * await sdk.isInjectedWallet() // true
   * ```
   */
  public isInjectedWallet = () => {
    return typeof (window as any).ethereum !== 'undefined'
  }

  /**
   * @ignore
   */
  private getProvider = () => {
    if (this.metamaskProvider) {
      return this.metamaskProvider
    } else {
      const provider = this.fortmatic.getProvider()
      return new ethers.providers.Web3Provider(provider as any)
    }
  }

  /**
   * @ignore
   */
  private formatItem = (item: Item) => {
    return {
      ...item,
      startAt: item.startAt ? new Date(item.startAt) : undefined,
      endAt: item.endAt ? new Date(item.endAt) : undefined,
    } as Item
  }

  /**
   * @ignore
   */
  private emitAccountChange = (accounts: string[]) => {
    this.eventAccountsChangeCallbacks.forEach((f) => f(accounts))
  }

  /**
   * @ignore
   */
  private emitDisconnect = () => {
    this.eventDisconnectCallbacks.forEach((f) => f())
  }

  /**
   * @ignore
   */
  private emitConnect = () => {
    this.eventConnectCallbacks.forEach((f) => f())
  }
}
