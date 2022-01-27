import { IProviderStrategy } from './interface'

export class MetamaskStrategy implements IProviderStrategy {
  public async openWallet() {
    // noop
    return
  }
}
