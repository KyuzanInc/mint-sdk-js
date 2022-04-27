import { IProviderDisplay, ThemeColors } from 'web3modal'
// eslint-disable-next-line import/no-unresolved
import { IOptions } from 'web3modal/dist/providers/connectors/torus'

type WalletConnectConnectorOptions = {
  infuraId: string
  rpc?: {
    [chainId: number]: string
  }
  bridge?: string
  qrcode?: boolean
  qrcodeModalOptions?: {
    mobileLinks?: string[]
  }
}

export type WalletSetting = {
  selectWalletModal?: {
    theme?: string | ThemeColors
    cacheProvider?: boolean
  }

  providers?: {
    torus?: {
      // Enable to customize the display in Modal.
      display?: Partial<IProviderDisplay>
      options?: IOptions
    }
    walletconnect?: {
      options: WalletConnectConnectorOptions
    }
  }
}
