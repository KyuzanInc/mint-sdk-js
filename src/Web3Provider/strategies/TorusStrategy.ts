import Torus from '@toruslabs/torus-embed'
import { IProviderStrategy } from './interface'

export class TorusStrategy implements IProviderStrategy {
  constructor(private torus: Torus) {
    //
  }
  public async openWallet() {
    await this.torus.showWallet('home')
  }
}
