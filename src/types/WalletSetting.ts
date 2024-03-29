import { IProviderDisplay, ThemeColors } from 'web3modal'
// eslint-disable-next-line import/no-unresolved
import { IOptions } from 'web3modal/dist/providers/connectors/torus'
// eslint-disable-next-line import/no-unresolved
import { IWalletConnectConnectorOptions } from 'web3modal/dist/providers/connectors/walletconnect'
import type WalletConnectV2 from '@walletconnect/ethereum-provider'

export type WalletConnectV2Options = Parameters<typeof WalletConnectV2.init>[0]

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
      // network is not required
      options: Omit<IWalletConnectConnectorOptions, 'network'>
    }
    walletconnectV2?: {
      options: WalletConnectV2Options
    }
  }

  params?: {
    hideTorus?: boolean
  }
}
