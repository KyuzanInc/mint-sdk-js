import { Token } from './types/Token'
import { BACKEND_URL } from './constants/index'
import Axios, { AxiosInstance } from 'axios'
import * as ethers from 'ethers'
import { Item } from './types/Item'

type NetworkId = 1 | 4

type WalletSetting = {
  fortmatic?: {
    key: string
  }
}

type BigNumber = ethers.BigNumber

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

  private constructor(
    private projectId: string,
    private accessToken: string,
    private networkId: NetworkId,
    private provider: ethers.providers.JsonRpcProvider,
    private axios: AxiosInstance
  ) {}

  public static initialize = async (
    projectId: string,
    accessToken: string,
    networkId: NetworkId,
    walletSetting: WalletSetting,
    // for Developing SDK
    devOption?: {
      backendUrl: string
      jsonRPCUrl: string
    }
  ) => {
    // infuraのURLはSDKからか
    // functionsからABIとAddressをFetch(RinkebyとMainどちらもあるとする)
    const backendBaseUrl = devOption?.backendUrl ?? BACKEND_URL
    const axios = Axios.create({
      baseURL: backendBaseUrl,
      headers: {
        'annapurna-access-token': accessToken,
      },
    })
    const { data } = await axios.get('/projectConfig')
    const providerURL: string =
      devOption?.jsonRPCUrl ??
      (networkId === 1
        ? data.data.infuraURL.main.wss
        : data.data.infuraURL.rinkeby.wss)
    console.log(providerURL)
    const provider = new ethers.providers.JsonRpcProvider(providerURL)

    // TODO: Signerをどうするか
    //

    const sdk = new AnnapurnaSDK(
      projectId,
      accessToken,
      networkId,
      provider,
      axios
    )
    return sdk
  }

  public waitForTransaction = async (txHash: string) => {
    await this.provider.waitForTransaction(txHash)
  }

  public getItems = async (option: {
    onlyOnSale: boolean
    onlyNoOnSale: boolean
  }) => {
    const { data } = await this.axios.get('/items')
    console.log(option)
    const items = data.data
    return items as Item[]
  }

  public getItemById = async (itemId: string) => {
    const { data } = await this.axios.get('item', { params: { itemId } })
    const item = data.data as Item
    return item
  }

  public getItemsByAddress = async (address: string) => {
    const { data } = await this.axios.get('tokensByAddress', {
      params: { address },
    })
    return data.data as Token[]
  }
}

export default AnnapurnaSDK
