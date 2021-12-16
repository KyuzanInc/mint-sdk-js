import { ItemStock } from './types/v2/ItemStock'
import Axios from 'axios'
import * as ethers from 'ethers'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer'
import {
  SignatureType,
  DefaultApiFactory as DefaultApiFactoryV2,
  TokenERC721,
  Bid,
  WalletAddressProfile,
} from './apiClientV2/api'
import { CurrencyUnit } from './types/CurrencyUnit'
import { WrongNetworkError } from './Errors'
import { Residence } from './types/Residence'
import { Token } from './types/Token'
import {
  WalletStrategy,
  MetamaskStrategy,
  FortmaticStrategy,
  NodeStrategy,
} from './strategies'
import { BACKEND_URL, PROFILE_DOMAIN, PROFILE_TYPES } from './constants/index'
import { ItemLog } from './types/ItemLog'
import { NetworkId } from './types/NetworkId'
import { BigNumber } from './types/BigNumber'
import { WalletInfo } from './types/WalletInfo'
import { WalletSetting } from './types/WalletSetting'
import { PaymentMethod } from './types/v2/PaymentMethods'
import { ItemsType } from './types/ItemsType'
import { ItemTradeType } from './types/ItemTradeType'
import { ItemType } from './types/v2/ItemType'
import { Item } from './types/v2/Item'
import { PaymentMethodData } from './types/v2/PaymentMethodData'
import { ContractERC721 } from './types/v2/ContractERC721'

export {
  // v2
  Item,
  PaymentMethodData,
  PaymentMethod,
  ItemType,
  ItemStock,
  TokenERC721,
  Bid,
  WalletAddressProfile,
  // v1
  ItemLog,
  ItemTradeType,
  ItemsType,
  Residence,
  NetworkId,
  BigNumber,
  Token,
  WalletSetting,
  WalletInfo,
  WrongNetworkError,
  CurrencyUnit,
}

export class MintSDK {
  /**
   * ether(通常のETHと表示される価格)をBigNumberとして返す
   *
   * @param ether 通常のETHと表示されるもの
   * @returns etherをBigNumberとしてparseしたもの
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * MintSDK.parseEther('3.2') // BigNumber
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
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = await MintSDK.initialize(...)
   * await sdk.connectWallet()  // required
   * const walletInfo = await sdk.getWalletInfo()
   * MintSDK.formatEther(walletInfo.balance) // 3.2
   * ```
   */
  public static formatEther = (bg: BigNumber) => {
    return ethers.utils.formatEther(bg)
  }

  /**
   * @ignore
   */
  private apiClientV2: ReturnType<typeof DefaultApiFactoryV2>

  private walletStrategy: WalletStrategy

  /**
   *
   * @param accessToken
   * @param networkId アイテムのネットワークIDを指定
   * @param walletSetting
   */
  public constructor(
    private accessToken: string,
    walletSetting: WalletSetting,
    // for Developing SDK
    devOption?: {
      backendUrl?: string
      jsonRPCUrl?: string
    }
  ) {
    if (typeof globalThis.window === 'undefined') {
      this.walletStrategy = new NodeStrategy()
    } else if (MetamaskStrategy.checkExistsWeb3ProviderInWindow()) {
      this.walletStrategy = new MetamaskStrategy()
    } else {
      this.walletStrategy = new FortmaticStrategy(walletSetting, devOption)
    }

    const backendBaseUrl = devOption?.backendUrl ?? BACKEND_URL
    this.apiClientV2 = DefaultApiFactoryV2(undefined, backendBaseUrl)
  }

  /**
   * 有効なアカウントがあるの状態を返す
   *
   * @returns ウォレットが接続されていればtrue
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = await MintSDK.initialize(...)
   * await sdk.isWalletConnect()
   * ```
   */
  public isWalletConnect = async () => {
    return await this.walletStrategy.isWalletConnect()
  }

  /**
   * ウォレットに接続
   * MetamaskがインストールされているブラウザではMetamaskが、されていない場合はFortmaticに接続を行う
   * ウォレットが接続されるとResolveされる
   * ウォレット接続をキャンセルした場合は、Rejectされる
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * await sdk.isWalletConnect() // false
   * await sdk.connectWallet()
   * await sdk.isWalletConnect()  // true
   * ```
   */
  public connectWallet = async () => {
    await this.walletStrategy.connectWallet()
  }

  /**
   * ウォレットから切断
   * Fortmaticの場合、切断される
   * **MetaMaskが接続されている場合は何も実行されない**
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = await MintSDK.initialize(...)
   * await sdk.disconnectWallet()
   * ```
   */
  public disconnectWallet = async () => {
    await this.walletStrategy.disconnectWallet()
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
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * await sdk.connectWallet()  // required
   * await sdk.getWalletInfo()
   * ```
   */
  public getWalletInfo: () => Promise<WalletInfo> = async () => {
    return await this.walletStrategy.getWalletInfo()
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
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
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
    const wallet = this.walletStrategy.getProvider()
    await wallet.waitForTransaction(txHash)
  }

  /**
   * 公開中の商品を取得
   * ステータスの変更は管理画面から行えます。
   *
   * #### 制限事項
   *
   * @param paging
   * @param tags , 区切りで指定
   * @returns
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   *
   * const items = await sdk.getItems(...)
   * ```
   */
  public getItems = async ({
    page,
    perPage,
    tags,
    sort,
    saleStatus,
    paymentMethod,
    onlyAvailableStock,
  }: {
    page: number
    perPage: number
    tags?: string
    saleStatus?: 'beforeStart' | 'beforeEnd' | 'afterEnd'
    paymentMethod?: PaymentMethod
    onlyAvailableStock?: boolean
    sort?: {
      sortBy: 'price'
      sortDirection: 'asc' | 'desc'
    }
  }) => {
    const { data } = await this.apiClientV2.getItems(
      this.accessToken,
      page.toString(),
      perPage.toString(),
      saleStatus,
      typeof onlyAvailableStock === 'undefined'
        ? undefined
        : onlyAvailableStock
        ? 'true'
        : 'false',
      paymentMethod,
      tags,
      sort?.sortBy,
      sort?.sortDirection
    )
    return data.data as Item[]
  }

  /**
   * ItemStockを取得する
   *
   * #### 制限事項
   * - Itemが公開されていない場合は400
   *
   * @param walletAddress
   * @returns
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   *
   * const items = await sdk.getItemStockById(...)
   * ```
   */
  public getItemStockById = async (arg: { itemStockId: string }) => {
    const { data } = await this.apiClientV2.getItemStockById(
      this.accessToken,
      arg.itemStockId
    )
    return data.data as ItemStock
  }

  /**
   * 指定したwalletAddressで購入または落札したItemStockを取得する
   *
   * #### 制限事項
   *
   * @param walletAddress
   * @returns
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   *
   * const items = await sdk.getBoughtItemStocksByWalletAddress(...)
   * ```
   */
  public getBoughtItemStocksByWalletAddress = async (arg: {
    walletAddress: string
    page: number
    perPage: number
    sort?: {
      sortBy: 'price' | 'createAt'
      sortDirection: 'asc' | 'desc'
    }
  }) => {
    const { data } = await this.apiClientV2.getBoughtItemStocksByWalletAddress(
      this.accessToken,
      arg.walletAddress,
      arg.page.toString(),
      arg.perPage.toString(),
      arg.sort?.sortBy ?? undefined,
      arg.sort?.sortDirection ?? undefined
    )
    return data.data.itemStocks as ItemStock[]
  }

  /**
   * 指定したアドレスがBidしたItemの一覧を取得
   *
   * @param address ウォレットのアドレス
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * const item = await sdk.getItemsByBidderAddress('0x1111......')
   * ```
   */
  public getItemStocksByBidderAddress = async (arg: {
    walletAddress: string
    page: number
    perPage: number
    onlyBeforeEnd?: boolean
    sort?: {
      sortBy: 'price' | 'endAt'
      sortDirection: 'asc' | 'desc'
    }
  }) => {
    const { data } = await this.apiClientV2.getBiddedItemStocksByWalletAddress(
      this.accessToken,
      arg.walletAddress,
      arg.page.toString(),
      arg.perPage.toString(),
      typeof arg.onlyBeforeEnd === 'undefined'
        ? undefined
        : arg.onlyBeforeEnd
        ? 'true'
        : 'false',
      arg.sort?.sortBy ?? undefined,
      arg.sort?.sortDirection ?? undefined
    )
    const itemStocks = data.data
    return itemStocks as ItemStock[]
  }

  /**
   * 商品をid指定でアイテムを取得
   *
   * @param itemId {@link ResponseItem}の`id`
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * const item = await sdk.getItemById('item.id')
   * ```
   */
  public getItemById = async (itemId: string) => {
    const { data } = await this.apiClientV2.getItemById(
      this.accessToken,
      itemId
    )
    return data.data as Item
  }

  /**
   * id指定で製品を取得
   *
   * @param id
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * const item = await sdk.getProductERC721ById('id')
   * ```
   */
  public getProductERC721ById = async (id: string) => {
    const { data } = await this.apiClientV2.getProductERC721ById(
      this.accessToken,
      id
    )
    return data.data
  }

  /**
   * 指定したアドレスが所持しているMINT経由で獲得したトークンを取得
   *
   * @param address Walletのアドレス
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...
   * const tokens = await sdk.getTokensByAddress('0x11111...')
   * ```
   */
  public getTokensByAddress = async (arg: {
    walletAddress: string
    page: number
    perPage: number
  }) => {
    const { data } = await this.apiClientV2.getTokenERC721sByWalletAddress(
      this.accessToken,
      arg.walletAddress,
      arg.page.toString(),
      arg.perPage.toString()
    )
    return data.data
  }

  /**
   * ContractERC721を取得する
   *
   * @param contractId
   * @returns
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   *
   * const items = await sdk.getContractERC721ById(...)
   * ```
   */
  public getContractERC721ById = async (arg: { contractId: string }) => {
    const { data } = await this.apiClientV2.getContractERC721ById(
      this.accessToken,
      arg.contractId
    )
    return data.data as ContractERC721
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
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
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
    const resItem = await this.getItemById(itemId)
    if (
      resItem.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-auction'
    ) {
      return
    }

    await this.validateNetworkForItem(resItem)
    const wallet = this.walletStrategy.getProvider()
    const signer = wallet.getSigner()
    const shopContract = new ethers.Contract(
      resItem.paymentMethodData.contractDataERC721Shop.contractAddress,
      JSON.parse(resItem.paymentMethodData.contractDataERC721Shop.abi),
      signer
    )

    // sign
    const {
      data: {
        data: { itemStockId },
      },
    } = await this.apiClientV2.getSellableItemStockERC721Id(
      this.accessToken,
      itemId
    )
    const {
      data: {
        data: { signature, contractMethodArg },
      },
    } = await this.apiClientV2.getSignByItemStockId(
      this.accessToken,
      itemStockId,
      SignatureType.AuctionBid
    )
    const price = ethers.utils.parseEther(String(bidPrice)).toString()
    return (await shopContract.bidAuction(
      contractMethodArg[0],
      contractMethodArg[1],
      contractMethodArg[2],
      contractMethodArg[3],
      contractMethodArg[4],
      price,
      signature,
      {
        value: price,
      }
    )) as ethers.providers.TransactionResponse
  }

  /**
   * オークションで勝利したアイテムを引き出すトランザクションを発行
   * ユーザーの居住地を問うUIを合わせて実装必要です。居住地を設定することで消費税に関する会計処理などがスムーズに行えます
   *
   * **Required**
   * - ウォレットに接続していること
   * - **自動延長オークションは、`withdrawableAt`以降に引き出し可能です**
   *
   * @param itemId {@link Item}のitemId
   * @param userResidence {@link Residence} 購入者の居住地を指定する
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * await sdk.connectWallet() // required
   * try {
   *  const tx = await sdk.sendTxMakeSuccessfulBid('item.itemId', 'jp')
   *  // show loading
   *  await tx.wait()
   *  // success transaction
   * } catch (err) {
   *  // display error message
   * }
   * ```
   */
  public sendTxMakeSuccessfulBid = async (
    itemId: string,
    residence: Residence = 'unknown'
  ) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const resItem = await this.getItemById(itemId)
    if (
      resItem.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-auction'
    ) {
      return
    }

    await this.validateNetworkForItem(resItem)
    const wallet = this.walletStrategy.getProvider()
    const signer = wallet.getSigner()
    const {
      data: {
        data: { contractMethodArg },
      },
    } = await this.apiClientV2.getSignByItemStockId(
      this.accessToken,
      resItem.itemStockIds[0],
      SignatureType.AuctionWithdraw,
      await signer.getAddress(),
      residence
    )

    const shopContract = new ethers.Contract(
      resItem.paymentMethodData.contractDataERC721Shop.contractAddress,
      JSON.parse(resItem.paymentMethodData.contractDataERC721Shop.abi),
      signer
    )
    const tx = (await shopContract.buyAuction(
      ...contractMethodArg
    )) as ethers.providers.TransactionResponse
    return tx
  }

  /**
   * FixedPriceのアイテムを購入するトランザクションを発行
   * ユーザーの居住地を問うUIを合わせて実装必要
   * 消費税に関する会計処理などがスムーズに行えます
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @param itemId {@link Item}のitemId
   * @param userResidence {@link Residence} 購入者の居住地を指定する
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * await sdk.connectWallet() // required
   * try {
   *  const tx = await sdk.sendTxBuyItem('item.itemId', 'jp')
   *  // show loading
   *  await tx.wait()
   *  // success transaction
   * } catch (err) {
   *  // display error message
   * }
   * ```
   */
  public sendTxBuyItem = async (
    itemId: string,
    residence: Residence = 'unknown'
  ) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const item = await this.getItemById(itemId)
    await this.validateNetworkForItem(item)
    const wallet = this.walletStrategy.getProvider()
    const resItem = await this.getItemById(itemId)
    if (
      resItem.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-fixed-price'
    ) {
      throw new Error(
        `PaymentMethod is not ethereum-contract-erc721-shop-fixed-price: ${resItem.paymentMethodData.paymentMethod}`
      )
    }
    const signer = wallet.getSigner()
    const shopContract = new ethers.Contract(
      resItem.paymentMethodData.contractDataERC721Shop.contractAddress,
      JSON.parse(resItem.paymentMethodData.contractDataERC721Shop.abi),
      signer
    )
    // sign
    const {
      data: {
        data: { itemStockId },
      },
    } = await this.apiClientV2.getSellableItemStockERC721Id(
      this.accessToken,
      itemId
    )
    const {
      data: {
        data: { contractMethodArg },
      },
    } = await this.apiClientV2.getSignByItemStockId(
      this.accessToken,
      itemStockId,
      SignatureType.FixedPrice,
      await signer.getAddress(),
      residence
    )
    const price = ethers.utils.parseEther(item.price.toString()).toString()
    const tx = (await shopContract.buyFixedPrice(...contractMethodArg, {
      value: price,
    })) as ethers.providers.TransactionResponse
    return tx
  }

  /**
   * アカウントが変更された際に呼び出される関数を設定できる
   *
   * @param callback
   * @returns void
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * sdk.onAccountsChange((accounts: string[]) => {
   *    // some thing
   * })
   * ```
   */
  public onAccountsChange = (callback: (accounts: string[]) => any) => {
    this.walletStrategy.onAccountsChange(callback)
  }

  /**
   * @ignore
   */
  public offAccountsChange = (callback?: (accounts: string[]) => any) => {
    this.walletStrategy.offAccountsChange(callback)
  }

  /**
   * ウォレットに接続した際に呼び出される関数を設定できる
   *
   * @param callback
   * @returns void
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * sdk.onConnect(() => {
   *    // some thing
   * })
   * ```
   */
  public onConnect = (callback: () => any) => {
    this.walletStrategy.onConnect(callback)
  }

  /**
   * @ignore
   */
  public offConnect = (callback?: () => any) => {
    this.walletStrategy.offConnect(callback)
  }

  /**
   * ウォレットから切断した際に呼び出される関数を設定できる
   *
   * @param callback
   * @returns void
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * sdk.onDisconnect(() => {
   *    // some thing
   * })
   * ```
   */
  public onDisconnect = (callback: () => any) => {
    this.walletStrategy.onDisconnect(callback)
  }

  /**
   * @ignore
   */
  public offDisconnect = (callback?: () => any) => {
    this.walletStrategy.offDisconnect(callback)
  }

  /**
   * サーバーのUnixタイムを取得
   *
   * @returns unix time (ms)
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * await sdk.connectWallet()
   * await sdk.getServerUnixTime()  // ex) 1615444120104
   * ```
   */
  // public getServerUnixTime = async () => {
  //   const { data } = await this.axios.get<AxiosBody<number>>('serverSideTime')
  //   return data.data
  // }

  /**
   * MetaMaskかどうかを判定
   *
   * @returns trueならばMetaMask
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * await sdk.isInjectedWallet() // true
   * ```
   */
  public isInjectedWallet = () => {
    return typeof (window as any).ethereum !== 'undefined'
  }

  /**
   * 接続中のネットワークIDを返す
   *
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * await sdk.connectWallet()
   * await sdk.getConnectedNetworkId()
   * ```
   */
  public getConnectedNetworkId = async () => {
    return await this.walletStrategy.getConnectedNetworkId()
  }

  /**
   * @ignore
   */
  private signData = async (arg: { msgParams: any }) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }
    return new Promise<string>((resolve, reject) => {
      const msgParams = JSON.stringify(arg.msgParams)
      const wallet = this.walletStrategy.getProvider()
      wallet
        .getSigner()
        .getAddress()
        .then((from) => {
          const params = [from, msgParams]
          const method = 'eth_signTypedData_v4'
          wallet.provider.sendAsync!(
            {
              method,
              params,
            },
            (error, result) => {
              if (error) {
                reject(error)
              }
              resolve(result.result)
            }
          )
        })
        .catch(reject)
    })
  }

  /**
   * EIP-712仕様で与えられたデータを署名します。
   *
   * **Required**
   * - ウォレットに接続していること
   *
   * @param arg
   * @returns
   * ``` typesctipt
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * const arg = {
   *  domain: {name: "Member"},
   *  types: {Person: [ { name: 'name', type: 'string'}]},
   *  value: { Man: { name: 'Tom'}}
   * }
   * const { data, sig } = await sdk.signTypedData(arg)
   * ```
   */

  public signTypedData = async (arg: {
    domain: TypedDataDomain
    types: Record<string, Array<TypedDataField>>
    value: Record<string, any>
  }) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const wallet = await this.walletStrategy.getProvider()

    const signature = await wallet
      .getSigner()
      ._signTypedData(arg.domain, arg.types, arg.value)
    const signData = JSON.stringify(
      ethers.utils._TypedDataEncoder.getPayload(
        arg.domain,
        arg.types,
        arg.value
      )
    )

    return {
      data: signData,
      sig: signature,
    }
  }

  /**
   * 署名されたデータを復号してウォレットアドレスを返します。
   * 返される文字列は小文字で返ってきます。
   * @param arg
   * @returns
   * ``` typesctipt
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * const { address } = await this.getWalletInfo()
   * const { data, sig } = await sdk.signTypedData(arg)
   * const recoverdAddress = MintSDK.recoverdSignData({data, sig})
   *
   * if(address.toLowerCase() === recoverdAddress){
   *  console.log("success")
   * }
   * ```
   */

  public static recoverySignData = (arg: { data: string; sig: string }) => {
    const recoveredAddress = recoverTypedSignature_v4({
      data: JSON.parse(arg.data),
      sig: arg.sig,
    })
    return recoveredAddress
  }

  /**
   * signedUrlを用いてFileをアップロード
   * @ignore
   */
  private uploadData = async (arg: { signedUrl: string; file: File }) => {
    const axios = Axios.create({
      headers: { 'Content-Type': 'application/octet-stream' },
    })
    await axios.put(arg.signedUrl, arg.file)
  }

  /**
   * 指定したネットワークをウォレットに追加する
   * 137 => Polygon本番ネットワーク
   * 80001 => Polygonテストネットワーク
   *
   * **Required**
   * sdk.isInjectedWallet() => trueの場合のみ（MetaMaskのみ使える）
   *
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * await sdk.connectWallet()
   * await sdk.addEthereumChain(137)
   * ```
   */
  public addEthereumChain = async (networkId: 137 | 80001) => {
    type AddEthereumChainParameter = {
      chainId: string // A 0x-prefixed hexadecimal string
      chainName: string
      nativeCurrency: {
        name: string
        symbol: string // 2-6 characters long
        decimals: 18
      }
      rpcUrls: string[]
      blockExplorerUrls?: string[]
      iconUrls?: string[] // Currently ignored.
    }
    const NETWORK_ID_MAP_CHAIN_PARAMETER: Record<
      137 | 80001,
      AddEthereumChainParameter
    > = {
      137: {
        chainId: '0x89',
        chainName: 'Matic Network',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
        blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com/'],
      },
      80001: {
        chainId: '0x13881',
        chainName: 'Mumbai',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://rpc-mumbai.matic.today'],
        blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
      },
    }
    // TODO: Fortmaticだとシカとか、適切なエラーを投げてやればいい
    await (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [NETWORK_ID_MAP_CHAIN_PARAMETER[networkId]], // you must have access to the specified account
    })
  }

  /**
   * @ignore
   */
  private validateNetworkForItem = async (item: Item) => {
    const currentNetwork = await this.getConnectedNetworkId()
    if (
      item.paymentMethodData.paymentMethod === 'credit-card-stripe-fixed-price'
    ) {
      return
    }
    if (
      currentNetwork !== item.paymentMethodData.contractDataERC721Shop.networkId
    ) {
      throw new WrongNetworkError('Network is not correct')
    }
  }

  public updateAccountInfo = async (arg: {
    avatarImageId: string
    displayName: string
    bio: string
    twitterAccountName: string
    instagramAccountName: string
    homepageUrl: string
  }) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }
    const wallet = this.walletStrategy.getProvider()
    const signer = await wallet.getSigner()
    const profile = {
      walletAddress: await signer.getAddress(),
      avatarImageId: arg.avatarImageId,
      displayName: arg.displayName,
      bio: arg.bio,
      twitterAccountName: arg.twitterAccountName,
      instagramAccountName: arg.instagramAccountName,
      homepageUrl: arg.homepageUrl,
    }
    const signature = await signer._signTypedData(
      PROFILE_DOMAIN,
      PROFILE_TYPES,
      profile
    )
    await this.apiClientV2.updateProfile(this.accessToken, {
      profile: profile,
      signature: signature,
    })
  }

  public uploadAccountInfoAvatar = async (arg: { file: File }) => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const response = await this.apiClientV2.getAvatar(this.accessToken)
    if (!response.data.data) {
      return
    }
    await this.uploadData({
      signedUrl: response.data.data.uploadSignedUrl,
      file: arg.file,
    })
    return {
      imgId: response.data.data.imageId,
      uploadedImgUrl: response.data.data.readSignedUrl,
    }
  }

  public getAccountInfo = async (arg: { walletAddress: string }) => {
    const response = await this.apiClientV2.getProfile(
      this.accessToken,
      arg.walletAddress
    )
    if (response.data.data === null) {
      return null
    }

    return {
      profile: response.data.data.profile,
      avatarImageUrl: response.data.data.avatarImageUrl,
    }
  }
}
