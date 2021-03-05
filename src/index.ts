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

  private walletProvider: ethers.providers.JsonRpcProvider | null = null
  private subscriberWalletChange: Array<(accounts: string[]) => any> = []
  private subscriberConnect: Array<() => any> = []
  private subscriberDisConnect: Array<() => any> = []

  private constructor(
    private projectId: string,
    private accessToken: string,
    private networkId: NetworkId,
    private provider: ethers.providers.JsonRpcProvider,
    private axios: AxiosInstance,
    private shopContract: {
      abi: any
      address: string
    }
  ) {}

  public static initialize = async (
    projectId: string,
    accessToken: string,
    networkId: NetworkId,
    walletSetting: WalletSetting,
    // for Developing SDK
    devOption?: {
      backendUrl?: string
      jsonRPCUrl?: string
      contractShopAbi?: any
      contractShopAddress?: string
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

    const contractShopAbi =
      devOption?.contractShopAbi ??
      (networkId === 1
        ? data.data.contract.shopContract.main.abi
        : data.data.contract.shopContract.rinkeby.abi)

    const contractShopAddress =
      devOption?.contractShopAddress ??
      (networkId === 1
        ? data.data.contract.shopContract.main.address
        : data.data.contract.shopContract.rinkeby.address)
    const sdk = new AnnapurnaSDK(
      projectId,
      accessToken,
      networkId,
      provider,
      axios,
      {
        abi: contractShopAbi,
        address: contractShopAddress,
      }
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
    //   case 'metamask':
    // await window.ethereum.enable() // only for metamask
    //
    // }

    // subscribeに通知するようにする
  }

  // TODO
  public disconnectWallet = async () => {
    console.log('TODO')
    // subscriberに通知するようにする
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

  public getItemsByBidderAddress = async (address: string) => {
    const { data } = await this.axios.get('getItemsByBidderAddress', {
      params: { address },
    })
    return data.data as Item[]
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

  public getTokensByAddress = async (address: string) => {
    const { data } = await this.axios.get('tokensByAddress', {
      params: { address },
    })
    return data.data as Token[]
  }

  public sendTxBid = async (itemId: string) => {
    // wallet connect check
    if (!this.walletProvider) {
      throw new Error('Wallet is not connected')
    }
    const item = await this.getItemById(itemId)

    const signer = this.walletProvider.getSigner()
    const shopContract = new ethers.Contract(
      this.shopContract.address,
      this.shopContract.abi,
      signer
    )
    if (item.tradeType !== 'auction') {
      throw new Error("Item's tradeType is not auction")
    }
    const price = ethers.utils
      .parseEther((item.price as number).toString())
      .toString()
    return (await shopContract.bid(
      item.tokenId,
      item.tokenURI,
      item.author,
      item.initialPrice,
      item.startAt,
      item.endAt,
      price,
      item.signature,
      {
        value: price,
      }
    )) as ethers.providers.TransactionResponse
  }

  public sendTxMakeSuccessfulBid = async (itemId: string) => {
    // wallet connect check
    if (!this.walletProvider) {
      throw new Error('Wallet is not connected')
    }
    const item = await this.getItemById(itemId)

    const signer = this.walletProvider.getSigner()
    const shopContract = new ethers.Contract(
      this.shopContract.address,
      this.shopContract.abi,
      signer
    )
    if (item.tradeType !== 'auction') {
      throw new Error("Item's tradeType is not auction")
    }
    return (await shopContract.makeSuccessfulBid(
      item.tokenId,
      item.tokenURI,
      item.author,
      item.initialPrice,
      item.startAt,
      item.endAt,
      item.signature
    )) as ethers.providers.TransactionResponse
  }

  public sendTxBuyItem = async (itemId: string) => {
    // wallet connect check
    if (!this.walletProvider) {
      throw new Error('Wallet is not connected')
    }
    const item = await this.getItemById(itemId)

    const signer = this.walletProvider.getSigner()
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
    return (await shopContract.buy(
      item.tokenId,
      item.tokenURI,
      item.author,
      price,
      item.signature,
      {
        value: price,
      }
    )) as ethers.providers.TransactionResponse
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
