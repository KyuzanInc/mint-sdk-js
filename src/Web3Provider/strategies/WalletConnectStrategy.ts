import WalletConnect from '@walletconnect/web3-provider'
import { IProviderStrategy } from './interface'

export class WalletConnectStrategy implements IProviderStrategy {
  constructor(private wc: WalletConnect) {
    //
  }
  public async openWallet() {
    await this.wc.enable()
  }
}
