import Axios, { AxiosInstance } from 'axios'
import * as Agent from 'agentkeepalive'
import * as ethers from 'ethers'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer'
import {
  ResponseItemTypeEnum,
  Item,
  ResponseItem,
  ItemStockStatus,
  SignatureType,
  DefaultApiFactory as DefaultApiFactoryV2,
  ResponseTokenERC721,
} from './apiClientV2/api'
import { CurrencyUnit } from './types/CurrencyUnit'
import { WrongNetworkError } from './Errors'
import { Residence } from './types/Residence'
import { AxiosBody } from './types/AxiosBody'
import { Token } from './types/Token'
import {
  WalletStrategy,
  MetamaskStrategy,
  FortmaticStrategy,
  NodeStrategy,
} from './strategies'
import { BACKEND_URL } from './constants/index'
import { ItemLog } from './types/ItemLog'
import { NetworkId } from './types/NetworkId'
import { BigNumber } from './types/BigNumber'
import { WalletInfo } from './types/WalletInfo'
import { WalletSetting } from './types/WalletSetting'
import { ItemsType } from './types/ItemsType'
import { ItemTradeType } from './types/ItemTradeType'

export {
  Item,
  ResponseTokenERC721,
  ResponseItem,
  ResponseItemTypeEnum as ItemWithPhysicalItemType,
  ItemStockStatus,
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
  private axios: AxiosInstance

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
    const keepAliveAgent = new Agent.HttpsAgent({
      keepAlive: true,
    })
    this.axios = Axios.create({
      httpsAgent: keepAliveAgent,
      baseURL: backendBaseUrl,
      headers: {
        'annapurna-access-token': accessToken,
      },
    })
    this.apiClientV2 = DefaultApiFactoryV2(
      undefined,
      backendBaseUrl,
      this.axios
    )
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
   * @returns
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   *
   * const items = await sdk.getItems(...)
   * ```
   */

  public getItems = async () => {
    const { data } = await this.apiClientV2.getItems(this.accessToken)
    return data.data
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
  public getBoughtItemStocksByWalletAddress = async (walletAddress: string) => {
    const { data } = await this.apiClientV2.getBoughtItemStocksByWalletAddress(
      this.accessToken,
      walletAddress
    )
    return data.data
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
  public getItemsByBidderAddress = async (address: string) => {
    const { data } = await this.apiClientV2.getBiddedItemsByWalletAddress(
      this.accessToken,
      address
    )
    const items = data.data
    return items.items
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
    return data.data
  }

  // /**
  //  * Tokenに紐づいたItemを取得
  //  * @param token
  //  * @returns
  //  *
  //  * ```typescript
  //  * import { MintSDK } from '@kyuzan/mint-sdk-js'
  //  * const sdk = await MintSDK.initialize(...)
  //  * const item = await sdk.getItemByToken(token)
  //  * ```
  //  */
  // public getItemByToken = async (token: Token) => {
  //   const { data } = await this.axios.get<AxiosBody<Item>>('v2_itemByToken', {
  //     params: {
  //       tokenId: token.tokenId,
  //       networkId: token.item.networkId,
  //       tokenAddress: token.contractAddress,
  //       mintContractAddress: token.contractAddress,
  //     },
  //   })
  //   const item = data.data
  //   return this.formatItem(item)
  // }

  // /**
  //  * アイテムの履歴(bidされた、買われた)の取得
  //  * 最新の物から返される
  //  *
  //  * @param itemId {@link Item}のitemId
  //  * @returns
  //  *
  //  * ```typescript
  //  * import { MintSDK } from '@kyuzan/mint-sdk-js'
  //  *
  //  * const sdk = await MintSDK.initialize(...)
  //  * const item = await sdk.getItemLogs('Item.itemId')
  //  * ```
  //  */
  // public getItemLogs = async (
  //   itemId: string,
  //   paging = {
  //     perPage: 30,
  //     page: 1,
  //   }
  // ) => {
  //   const { data } = await this.apiClient.getItemLogs(
  //     this.accessToken,
  //     itemId,
  //     paging.perPage.toString(),
  //     paging.page.toString()
  //   )
  //   const logs = data.data
  //   return logs.map((l) => ({
  //     ...l,
  //     createAt: new Date(l.createAt),
  //   }))
  // }

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
  public getTokensByAddress = async (address: string) => {
    const { data } = await this.apiClientV2.getTokenERC721sByWalletAddress(
      this.accessToken,
      address
    )
    return data.data
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
      resItem.item.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-auction'
    ) {
      return
    }
    const { data } = await this.apiClientV2.getItemStockDetailERC721Shop(
      this.accessToken,
      itemId
    )
    // TODO
    // await this.validateNetworkForItem(item)
    const wallet = this.walletStrategy.getProvider()
    const signer = wallet.getSigner()
    const shopContract = new ethers.Contract(
      resItem.item.paymentMethodData.contractDataERC721Shop.contractAddress,
      JSON.parse(resItem.item.paymentMethodData.contractDataERC721Shop.abi),
      signer
    )

    // sign
    const {
      data: {
        data: { signature, contractMethodArg },
      },
    } = await this.apiClientV2.getSignByItemStockId(
      this.accessToken,
      data.data.itemStock.id,
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
    _: Residence = 'unknown'
  ) => {
    // wallet connect check
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const resItem = await this.getItemById(itemId)
    if (
      resItem.item.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-auction'
    ) {
      return
    }

    const { data } = await this.apiClientV2.getItemStockDetailERC721Shop(
      this.accessToken,
      resItem.itemStocks[0].id
    )

    const {
      data: {
        data: { contractMethodArg },
      },
    } = await this.apiClientV2.getSignByItemStockId(
      this.accessToken,
      data.data.itemStock.id,
      SignatureType.AuctionWithdraw
    )

    // TOOD
    // await this.validateNetworkForItem(item)
    const wallet = this.walletStrategy.getProvider()
    const signer = wallet.getSigner()
    const shopContract = new ethers.Contract(
      resItem.item.paymentMethodData.contractDataERC721Shop.contractAddress,
      JSON.parse(resItem.item.paymentMethodData.contractDataERC721Shop.abi),
      signer
    )
    const tx = (await shopContract.buyAuction(
      ...contractMethodArg
    )) as ethers.providers.TransactionResponse

    // const hash = tx.hash
    // TODO
    // await this.axios.post('/v2_registerTransactionReceiptsApp', {
    //   txHash: hash,
    //   itemId,
    //   residence: userResidence,
    // })
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
  public sendTxBuyItem = async (itemId: string, _: Residence = 'unknown') => {
    if (!(await this.isWalletConnect())) {
      throw new Error('Wallet is not connected')
    }

    const item = await this.getItemById(itemId)
    // TODO
    // await this.validateNetworkForItem(item)
    const wallet = this.walletStrategy.getProvider()
    const resItem = await this.getItemById(itemId)
    if (
      resItem.item.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-fixed-price'
    ) {
      return
    }
    const signer = wallet.getSigner()
    const shopContract = new ethers.Contract(
      resItem.item.paymentMethodData.contractDataERC721Shop.contractAddress,
      JSON.parse(resItem.item.paymentMethodData.contractDataERC721Shop.abi),
      signer
    )
    // TODO
    // if (item.tradeType !== 'fixedPrice') {
    //   throw new Error("Item's tradeType is not fixedPrice")
    // }

    const data = await this.apiClientV2.getItemStockDetailERC721Shop(
      this.accessToken,
      itemId
    )

    // sign
    const {
      data: {
        data: { contractMethodArg },
      },
    } = await this.apiClientV2.getSignByItemStockId(
      this.accessToken,
      data.data.data.itemStock.id,
      SignatureType.FixedPrice
    )
    const price = ethers.utils.parseEther(item.item.price.toString()).toString()
    const tx = (await shopContract.buyFixedPrice(...contractMethodArg, {
      value: price,
    })) as ethers.providers.TransactionResponse
    // TODO
    // await this.axios.post('/v2_registerTransactionReceiptsApp', {
    //   txHash: tx.hash,
    //   itemId,
    //   residence: userResidence,
    // })
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
  public getServerUnixTime = async () => {
    const { data } = await this.axios.get<AxiosBody<number>>('serverSideTime')
    return data.data
  }

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

  // /**
  //  * 適切なネットワークかを判定
  //  *
  //  * @returns trueならば適切なネットワーク
  //  *
  //  * ```typescript
  //  * import { MintSDK } from '@kyuzan/mint-sdk-js'
  //  *
  //  * const sdk = MintSDK.initialize(...)
  //  * await sdk.isCorrectNetwork() // true
  //  * ```
  //  */
  // public isCorrectNetwork = async () => {
  //   if (this.isInjectedWallet()) {
  //     return this.networkIds.includes(
  //       parseInt((window as any).ethereum.networkVersion, 10) as any
  //     )
  //   } else {
  //     const network = await this.walletStrategy.getProvider().getNetwork()
  //     return this.networkIds.includes(network.chainId as any)
  //   }
  // }a

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
  // private validateNetworkForItem = async (item: ItemStock) => {
  //   // TODO: ItemStock？でバリデーションやな？
  //   const currentNetwork = await this.getConnectedNetworkId()
  //   if (currentNetwork !== item.itemStocks) {
  //     throw new WrongNetworkError('Network is not correct')
  //   }
  // }

  // /**
  //  * @ignore
  //  */
  // private getMintShopContractInfo = async (networkId: NetworkId) => {
  //   const { data } = await this.axios.get('/v2_projectConfig')
  //   const networkLabel = networkIdMapLabel[networkId]
  //   const abi = data.data.contract.mintShopContract[networkLabel].abi
  //   const address = data.data.contract.mintShopContract[networkLabel].address
  //   return {
  //     abi,
  //     address,
  //   }
  // }

  // /**
  //  * @ignore
  //  */
  // private formatItem = (item: Item) => {
  //   return {
  //     ...item,
  //     startAt: item.startAt ? new Date(item.startAt) : undefined,
  //     endAt: item.endAt ? new Date(item.endAt) : undefined,
  //     defaultEndAt: item.defaultEndAt ? new Date(item.defaultEndAt) : undefined,
  //     withdrawableAt: item.withdrawableAt
  //       ? new Date(item.withdrawableAt)
  //       : undefined,
  //   } as Item
  // }
}
