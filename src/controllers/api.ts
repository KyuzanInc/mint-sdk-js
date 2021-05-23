import Axios, { AxiosInstance } from 'axios'
import {
  DefaultApiFactory,
  TradeType,
  Item as APIItem,
  RegisterItemShippingInfoRequestBody,
} from '../apiClient/api'
import { NetworkId, networkIdMapLabel } from '../types/NetworkId'
import { ItemsType } from '../types/ItemsType'
import { ItemTradeType } from '../types/ItemTradeType'
import { Item } from '../types/Item'
import { ItemLog } from '../types/ItemLog'
import { Token } from '../types/Token'
import { Residence } from '../types/Residence'
import { AxiosBody } from '../types/AxiosBody'
import { BACKEND_URL } from '../constants/index'

type ValueOf<T> = T[keyof T]

type GetItemsArgs = {
  /**
   * 1ページあたりのアイテム数。
   * デフォルトは30。
   */
  perPage: number
  /**
   * ページ数。
   */
  page: number
  /**
   * `'endAt','startAt'`はオークションの場合に有効で、オークションの終了・開始時間でsortを行います。`price`は固定価格販売の場合のみ有効です。
   */
  sort?: {
    sortBy?: 'endAt' | 'startAt' | 'price' | undefined
    order?: 'asc' | 'desc' | undefined
  }
  /**
   * 指定しなければ、コンストラクターの値が使われます
   */
  networkId?: NetworkId[]
  itemType?: ItemsType
  tradeType?: ItemTradeType | TradeType
  /**
   *
   */
  onSale?: boolean
}

type APIItemLog = {
  type: 'bought' | 'bid'
  accountAddress: string
  price: number // only 'bid' and 'bought'
  createAt: Date
  transactionHash: string
}

export class APIController {
  private axios: AxiosInstance
  private openAPIClient: ReturnType<typeof DefaultApiFactory>
  private networkIds: NetworkId[]
  private accessToken: string

  constructor(
    accessToken: string,
    networkIds: NetworkId[],
    devOptions?: Partial<{ backendURL: string }>
  ) {
    const backendBaseURL = devOptions?.backendURL ?? BACKEND_URL
    this.axios = Axios.create({
      baseURL: backendBaseURL,
      headers: {
        'annapurna-access-token': accessToken,
      },
    })

    this.networkIds = networkIds
    this.accessToken = accessToken
    this.openAPIClient = DefaultApiFactory(
      undefined,
      backendBaseURL,
      this.axios
    )
  }

  public async getItems({
    perPage,
    page,
    networkId = undefined,
    itemType = undefined,
    tradeType = undefined,
    onSale = undefined,
    sort = {
      sortBy: undefined,
      order: undefined,
    },
  }: GetItemsArgs) {
    const nid = networkId
      ? networkId.map((id) => id.toString())
      : this.networkIds.map((id) => id.toString())
    const resp = await this.openAPIClient.getItemList(
      this.accessToken,
      nid,
      // @ts-ignore
      itemType,
      tradeType,
      onSale,
      perPage.toString(),
      page.toString(),
      sort.sortBy,
      sort.order
    )
    const formatItems = resp.data.data.map(this.formatItem)
    return formatItems
  }

  public async getItemsByBidderAddress(address: string) {
    const resp = await this.axios.get<AxiosBody<APIItem[]>>(
      'v3_getItemsByBidderAddress',
      {
        params: {
          address,
          networkIds: this.networkIds,
        },
      }
    )
    return resp.data.data.map(this.formatItem)
  }

  public async getItemById(itemId: string) {
    const resp = await this.axios.get<AxiosBody<APIItem>>('v2_item', {
      params: { itemId },
    })
    return this.formatItem(resp.data.data)
  }

  public async getItemByToken(token: Token) {
    const resp = await this.axios.get<AxiosBody<APIItem>>('v2_itemByToken', {
      params: {
        tokenId: token.tokenId,
        networkId: token.item.networkId,
        tokenAddress: token.contractAddress,
        mintContractAddress: token.contractAddress,
      },
    })
    return this.formatItem(resp.data.data)
  }

  public async getItemLogs(
    itemId: string,
    paging = {
      perPage: 30,
      page: 1,
    }
  ): Promise<ItemLog[]> {
    const params = { itemId, page: paging.page, perPage: paging.perPage }
    const resp = await this.axios.get<AxiosBody<APIItemLog[]>>('v2_itemLogs', {
      params,
    })
    const logs = resp.data.data
    return logs.map((l) => ({
      ...l,
      createAt: new Date(l.createAt),
    }))
  }

  public async getTokensByAddress(address: string) {
    const params = { address, networkIds: this.networkIds }
    const resp = await this.axios.get<AxiosBody<Token[]>>(
      'v3_tokensByAddress',
      { params }
    )
    return resp.data.data
  }

  public async getItemShippingInfo(
    annapurnaAccessToken: string,
    itemId: string,
    walletAddress: string,
    signedData: string,
    options?: any
  ) {
    return await this.openAPIClient.getItemShippingInfo(
      annapurnaAccessToken,
      itemId,
      walletAddress,
      signedData,
      options
    )
  }

  public async getServerUnixTime(): Promise<number> {
    const resp = await this.axios.get<AxiosBody<number>>('serverSideTime')
    return resp.data.data
  }

  public async getMintShopContractInfo(networkId: NetworkId) {
    const resp = await this.axios.get<
      AxiosBody<{
        contract: {
          mintShopContract: {
            [k in typeof networkIdMapLabel[keyof typeof networkIdMapLabel]]: {
              abi: string
              address: string
            }
          }
        }
      }>
    >('/v2_projectConfig')
    // @ts-ignore
    const networkLabel = networkIdMapLabel[networkId]
    const abi: string =
      // @ts-ignore
      resp.data.data.contract.mintShopContract[networkLabel].abi
    const address: string =
      // @ts-ignore
      resp.data.data.contract.mintShopContract[networkLabel].address
    return {
      abi,
      address,
    }
  }

  public async registerTransactionRecepit(
    txHash: string,
    itemId: string,
    residence: Residence
  ): Promise<void> {
    await this.axios.post('/v2_registerTransactionReceiptsApp', {
      txHash,
      itemId,
      residence,
    })
  }

  public async registerItemShoppingInfo(
    annapurnaAccessToken: string,
    itemId: string,
    registerItemShippingInfoRequestBody?: RegisterItemShippingInfoRequestBody,
    options?: any
  ) {
    return this.openAPIClient.registerItemShippingInfo(
      annapurnaAccessToken,
      itemId,
      registerItemShippingInfoRequestBody,
      options
    )
  }

  private formatItem(item: APIItem): Item {
    return {
      ...item,
      // FIXME: openAPI の networkID の定義と types の networkID の 定義が異なる
      networkId: item.networkId as Item['networkId'],
      buyerAddress: item.buyerAddress ?? null,
      signatureBuyAuction: item.signatureBuyAuction,
      signatureBidAuction: item.signatureBidAuction,
      signatureBuyFixedPrice: item.signatureBuyFixedPrice,
      startAt: item.startAt && new Date(item.startAt),
      endAt: item.endAt && new Date(item.endAt),
    }
  }
}
