import { Token } from './types/Token'
import { BACKEND_URL } from './constants/index'
import Axios, { AxiosInstance } from 'axios'
import * as ethers from 'ethers'
import { Item } from './types/Item'
import { ItemLog } from './types/ItemLog'
import { NetworkId } from './types/NetworkId'
import { BigNumber } from './types/BigNumber'

type WalletSetting = {
  fortmatic?: {
    key: string
  }
}

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

  private walletProvider: ethers.providers.Provider | null = null
  private subscriberWalletChange: Array<(accounts: string[]) => any> = []
  private subscriberConnect: Array<() => any> = []
  private subscriberDisConnect: Array<() => any> = []

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
    const provider = new ethers.providers.JsonRpcProvider(providerURL)
    const sdk = new AnnapurnaSDK(
      projectId,
      accessToken,
      networkId,
      provider,
      axios
    )
    return sdk
  }

  // TODO
  public isWalletConnect = () => {
    console.log(true)
  }

  // TODO
  public connectWallet = async (wallet?: 'metamask' | 'fortmatic') => {
    console.log(wallet)
    // switch (wallet) {
    //   case 'fortmatic':

    // }
  }

  // TODO
  public disconnectWallet = async () => {
    console.log('TODO')
  }

  // TODO
  public getWalletInfo = async () => {
    console.log('TODO')
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

  public getItemLogs = async (itemId: string) => {
    const { data } = await this.axios.get('itemLogs', { params: { itemId } })
    const logs = data.data as ItemLog
    return logs
  }

  // TODO
  public getBidItems = async (address: string) => {
    console.log(address)
  }

  public getTokensByAddress = async (address: string) => {
    const { data } = await this.axios.get('tokensByAddress', {
      params: { address },
    })
    return data.data as Token[]
  }

  // TODO
  public sendTxBid = async () => {
    console.log('TODO')
  }

  // TODO
  public sendTxMakeSuccessfulBid = async () => {
    console.log('TODO')
  }

  // TODO
  public sendTxBuyItem = async () => {
    console.log('TODO')
  }

  public subscribeWalletChange = (callback: (accounts: string[]) => any) => {
    this.subscriberWalletChange.push(callback)
  }

  public subscribeConnect = (callback: () => any) => {
    this.subscriberConnect.push(callback)
  }

  public subscribeDisConnect = (callback: () => any) => {
    this.subscriberDisConnect.push(callback)
  }
}

export default AnnapurnaSDK
