// eslint-disable-next-line import/no-unresolved
import { WidgetMode } from 'fortmatic/dist/cjs/src/core/sdk'
import { IProviderStrategy } from './interface'

export class FortmaticStrategy implements IProviderStrategy {
  constructor(private fm: WidgetMode) {
    //
  }

  public async openWallet() {
    await this.fm.user.settings()
  }
}
