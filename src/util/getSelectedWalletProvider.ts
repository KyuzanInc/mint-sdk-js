import { IProviderOptions } from 'web3modal'
import { WalletSetting } from '../types/WalletSetting'

export const getSelectedWalletProvider = (providerOptions: IProviderOptions, walletSetting: WalletSetting | null, defaultProvider: IProviderOptions):IProviderOptions => {
  const options = { ...providerOptions }

  if (!walletSetting || !walletSetting.providers || Object.keys(walletSetting.providers).length <= 0) {
    return defaultProvider
  }

  const selectedProviders = Object.keys(walletSetting.providers)
  Object.keys(options).filter(key => !selectedProviders.includes(key)).forEach(provider => delete options[provider])
  return options
}
