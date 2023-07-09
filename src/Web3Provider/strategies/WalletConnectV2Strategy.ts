import WalletConnectV2 from '@walletconnect/ethereum-provider'
import { WalletConnectV2Options } from '../../types/WalletSetting'
import { IProviderStrategy } from './interface'

export class WalletConnectV2Strategy implements IProviderStrategy {
  constructor(private wc: WalletConnectV2) {
    //
  }
  public async openWallet() {
    await this.wc.enable()
  }
}

export const walletConnectV2Connector = async (
  WalletConnectV2Provider: typeof WalletConnectV2,
  options: WalletConnectV2Options
) => {
  try {
    const provider = (await WalletConnectV2Provider.init({
      ...options,
    })) as WalletConnectV2 & { wcV2?: WalletConnectV2 }
    await provider.enable()

    provider.wcV2 = provider
    removeModalElements()

    return provider
  } catch (err) {
    removeModalElements()
    throw err
  }
}

const removeModalElements = () => {
  const els = document.getElementsByTagName('wcm-modal')

  for (let x = 0; x < els.length; x++) {
    const item = els.item(x)
    item?.remove()
  }
}
