import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import Axios from 'axios'
import { recoverTypedSignature_v4 } from 'eth-sig-util'
import * as ethers from 'ethers'
import {
  Bid,
  DefaultApiFactory as DefaultApiFactoryV2,
  SignatureType,
  TokenERC721,
  WalletAddressProfile,
  InlineObject1UserResidenceEnum,
} from './apiClient/api'
import { BACKEND_URL, PROFILE_DOMAIN, PROFILE_TYPES } from './constants/index'
import { WrongNetworkError } from './Errors'
import {
  FortmaticStrategy,
  MetamaskStrategy,
  NodeStrategy,
  WalletStrategy,
} from './strategies'
import { BigNumber } from './types/BigNumber'
import { CurrencyUnit } from './types/CurrencyUnit'
import { ItemLog } from './types/ItemLog'
import { ItemsType } from './types/ItemsType'
import { ItemTradeType } from './types/ItemTradeType'
import { NetworkId } from './types/NetworkId'
import { Residence } from './types/Residence'
import { Token } from './types/Token'
import { ContractERC721 } from './types/v2/ContractERC721'
import { Item } from './types/v2/Item'
import { ItemStock } from './types/v2/ItemStock'
import { ItemType } from './types/v2/ItemType'
import { PaymentMethodData } from './types/v2/PaymentMethodData'
import { PaymentMethod } from './types/v2/PaymentMethods'
import { WalletInfo } from './types/WalletInfo'
import { WalletSetting } from './types/WalletSetting'

export {
  Item,
  PaymentMethodData,
  PaymentMethod,
  ItemType,
  ItemStock,
  TokenERC721,
  Bid,
  WalletAddressProfile,
  Stripe,
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
   * Returns the ether price as a BigNumber.
   *
   * @param ether 通常のETHと表示されるもの
   * @returns etherをBigNumberとしてparseしたもの
   * @returns Returns a BigNumber format of the ether price
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
   * Returns an BigNumber that is formatted as an ether.
   *
   * @param bg
   * @returns Ether単位でパースされたstring
   * @returns Returns a ether from the parsed BigNumber
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

  /**
   * @ignore
   */
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
   * Returns if an account is valid.
   *
   * @returns ウォレットが接続されていればtrue
   * @returns If a wallet is connected, returns true
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
   * Connects to a wallet.
   * If Metamask is installed in the default browser, it will utilize Metamask, otherwise will use Fortmatic.
   * If a wallet is connected, it will return Resolve, otherwise will return Reject.
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
   * Disconnects the wallet.
   * When utilizing Fortmatic, it disconnects from the service.
   * When utilizing Metamask, **nothing will happen**.
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
   * Can get the transactional history and other account information.
   *
   * **Required**
   * - ウォレットに接続していること
   * - Requires the wallet to be connected.
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
   * When the transaction is successful, it returns a Resolve.
   *
   * **Required**
   * - Requires a wallet to be connected.
   * - ウォレットに接続していること
   *
   * @param txHash {@link ethers.providers.TransactionResponse}のhashプロパティ
   * The hash property of @param txHash {@link ethers.providers.TransactionResponse}
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
   * Returns the Items with the flag `Items.openStatus === 'open'`
   * The status of the items can be changed from the admin panel
   *
   * #### 制限事項 / Restrictions
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
   * Returns the ItemStock
   *
   * #### 制限事項 / Restrictions
   * - Itemが公開されていない場合は400
   * - If the Item is not public, it returns as 400
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
   * Returns the ItemStock that was sold to a certain wallet address
   *
   * #### 制限事項  / Restrictions
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
   * Returns all the bidded items ( as ItemStock ) that a certain address has done
   *
   * @param address ウォレットのアドレス / wallet address
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
   * Returns the Item from the specified itemId.
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
   * Returns the ProductERC721 by the ID
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
   * Returns the Tokens (NFT) that a certain address is holding through MINT
   *
   * @param address Walletのアドレス / Wallet address
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
   * Get the ContractERC721
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
   * Creates a transaction from the specified bid price.
   * The total amount of the bid is passed through the `bidPrice` argument.
   *
   * **Required**
   * - ウォレットに接続していること
   * - Requires the wallet to be connected
   *
   * @param itemId {@link Item}のitemId
   * @param bidPrice 単位はether / Unit is in ether
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
   * Transaction to get the winnning item after a successful auction
   * Requires a UI that asks for the users residence for accommodating for consumption tax purposes.
   *
   * **Required**
   * - ウォレットに接続していること
   * - Requires a wallet to be connected.
   * - **自動延長オークションは、`withdrawableAt`以降に引き出し可能です**
   * - **If automatic extension for the auction is enabled, withdrawing is only avaliable after `withdrawableAt`.**
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
   * Creates a transaction for buying an Item at a fixed price.
   * Requires a UI that asks for the users residence for accommodating for consumption tax purposes.
   *
   * **Required**
   * - ウォレットに接続していること
   * - Requires a wallet to be connected.
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
   * 指定したItemをtoAddressが購入する処理を行う
   * この関数は、Stripeの[PaymentIntent](https://stripe.com/docs/api/payment_intents/object)を初期化するための `clientSecret` と、
   * Mintバックエンドと対応するAPIキーで初期化された{@link Stripe}を返す。
   * {@link Stripe}を使いユーザーにクレカ情報入力UIを実装し表示する
   *
   * @param itemId 購入する{@link Item}のitemId
   * @param toAddress
   * @param userResidence {@link Residence} 購入者の居住地を指定する
   * @returns
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   * const sdk = await MintSDK.initialize(...)
   * await sdk.connectWallet() // required
   * const {
   *  paymentIntentClientSecret,
   *  stripe,
   * } = await sdk.createStripePaymentIntent({itemId: 'item.itemId', toAddress: '0x000', residence: 'jp'})
   *
   * // Implement UI
   */
  public createStripePaymentIntent = async (arg: {
    itemId: string
    toAddress: string
    residence: Residence
  }) => {
    // keyをKyuzanで発行管理したものを使いたいので内部でStripeのインスタンスを生成している
    const { data } = await this.apiClientV2.createStripePaymentIntent(
      this.accessToken,
      {
        itemId: arg.itemId,
        toAddress: arg.toAddress,
        userResidence:
          arg.residence === 'jp'
            ? InlineObject1UserResidenceEnum.Jp
            : InlineObject1UserResidenceEnum.Unknown,
      }
    )
    const stripe =  await loadStripe(data.publishableKey)
    return {
      paymentIntentClientSecret: data.secret,
      stripe,
    }
  }

  /**
   * アカウントが変更された際に呼び出される関数を設定できる
   * Set a callback when the account has been changed.
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
   * Set a callback when the wallet is connected.
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
   * Set a callback when the wallet is disconnected.
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
   * Validates if utilizing MetaMask.
   *
   * @returns trueならばMetaMask / Returns true if utilizing MetaMask.
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
   * Returns the connected network id.
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
   * Sign the data, formatted as EIP-712
   *
   * **Required**
   * - ウォレットに接続していること
   * - Requires a wallet to be connected.
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
   * Decrypts the signed data and returns the wallet address.
   * The string returned will be in lowercase.
   *
   *
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
   * upload the File using the signedURL
   *
   * @ignore
   */
  private uploadData = async (arg: { signedUrl: string; file: File }) => {
    const axios = Axios.create({
      headers: { 'Content-Type': 'application/octet-stream' },
    })
    await axios.put(arg.signedUrl, arg.file)
  }

  /**
   *
   * 指定したネットワークをウォレットに追加する
   * 137 => Polygon本番ネットワーク
   * 80001 => Polygonテストネットワーク
   *
   * Adds a specified network to the wallet.
   * 137 => Polygon production network
   * 80001 => Polygon development / test network
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
  /**
   * Returns the account information pertaining to the wallet such as display name or profile picture.
   * If there is nothing set, will return a blank string.
   *
   * #### Parameters:
   * | Name                | Type     |
   * | :------------------ | :------- |
   * | `arg`               | _object_ |
   * | `arg.walletAddress` | _string_ |
   *
   * Returns {@link AccountInfo}
   *
   * ```typescript
   * import { MintSDK } from '@kyuzan/mint-sdk-js'
   *
   * const sdk = MintSDK.initialize(...)
   * await sdk.connectWallet()
   * const accountInfo = await sdk.getAccountInfo({ walletAddress: '0xxxxxxxx' })
   * ```
   * */
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
