import { BACKEND_URL } from './constants/index'
import Axios, { AxiosInstance } from 'axios'
import * as ethers from 'ethers'

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
    private infuraProvider: ethers.providers.JsonRpcProvider,
    private axios: AxiosInstance
  ) {}

  public static initialize = async (
    projectId: string,
    accessToken: string,
    networkId: NetworkId,
    walletSetting: WalletSetting,
    devOption?: {
      backendUrl: string
    }
  ) => {
    // infuraのURLはSDKからか
    // functionsからABIとAddressをFetch(RinkebyとMainどちらもあるとする)
    const backendBaseUrl = devOption?.backendUrl ?? BACKEND_URL
    const axios = Axios.create({
      baseURL: backendBaseUrl,
      headers: {
        annapruna_access_token: accessToken,
      },
    })
    const { data } = await axios.get('/projectConfig')
    const infuraURL: string =
      networkId === 1
        ? data.data.infuraURL.main.wss
        : data.data.infuraURL.rinkeby.wss
    const infuraProvider = new ethers.providers.JsonRpcProvider(infuraURL)

    // TODO: Signerをどうするか
    //

    const sdk = new AnnapurnaSDK(
      projectId,
      accessToken,
      networkId,
      infuraProvider,
      axios
    )
    return sdk
  }

  public waitForTransaction = async (txHash: string) => {
    await this.infuraProvider.waitForTransaction(txHash)
  }

  public getBidItems = async () => {
    // TODO
    const { data } = await this.axios.get('/getItems')
    console.log(data)
  }
}

export default AnnapurnaSDK
