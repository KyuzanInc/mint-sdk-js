import { IProviderDisplay, ThemeColors } from 'web3modal'
// eslint-disable-next-line import/no-unresolved
import { IOptions } from 'web3modal/dist/providers/connectors/torus'
import { IWalletConnectConnectorOptions } from 'web3modal/dist/providers/connectors/walletconnect'

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
    },
    walletconnect?: {
      options: Omit<IWalletConnectConnectorOptions, 'infuraId'> & { infuraId: string }
    }
  }
}
