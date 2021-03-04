import * as ethers from 'ethers'
type NetworkId = 1 | 4

type WalletSetting = {
  fortmatic?: {
    key: string
  }
}

class AnnapurnaSDK {
  /**
   * ether(通常のETHと表示される価格)をBigNumberとして返す
   *
   * @param ether 通常のETHと表示されるもの
   * @returns etherをBigNumberとしてparseしたもの
   */
  public static parseEther = (ether: string) => {
    return ethers.utils.parseEther(ether)
  }

  private constructor(
    private projectId: string,
    private accessToken: string,
    private networkId: NetworkId
  ) {}

  public initialize = async (
    projectId: string,
    accessToken: string,
    networkId: NetworkId,
    walletSetting: WalletSetting
  ) => {
    const sdk = new AnnapurnaSDK(projectId, accessToken, networkId)
    // functionsからABIとAddressをFetch(RinkebyとMainどちらもあるとする)
    console.log(walletSetting)
    return sdk
  }
}

export default AnnapurnaSDK
