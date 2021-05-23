import Axios, { AxiosInstance } from 'axios'
import { DefaultApiFactory, TradeType, Item as APIItem } from '../apiClient/api'
import { NetworkId, networkIdMapLabel } from '../types/NetworkId'
import { ItemsType } from '../types/ItemsType'
import { ItemTradeType } from '../types/ItemTradeType'
import { Item } from '../types/Item'
import { BACKEND_URL } from '../constants/index'

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
    const resp = await this.axios.get('v3_getItemsByBidderAddress', {
      params: {
        address,
        networkIds: this.networkIds,
      },
    })
    return resp.data.data.map(this.formatItem)
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
