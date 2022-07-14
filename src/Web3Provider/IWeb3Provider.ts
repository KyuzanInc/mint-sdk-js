import { ethers } from 'ethers'
import { WalletInfo } from '../types/WalletInfo'

export interface IWeb3Provider {
  isWalletConnect(): Promise<boolean>
  connectWallet(): Promise<void>
  getConnectedNetworkId(): Promise<number>
  getWalletInfo(): Promise<WalletInfo>
  getProvider(): ethers.providers.Web3Provider
  openWallet(): Promise<void>
  switchNetwork(networkId: number): Promise<any>

  onAccountsChange(callback: (accounts: string[]) => any): void
  offAccountsChange(callback?: (accounts: string[]) => any): void

  onConnect(callback: (info: { chainId: number }) => any): void
  offConnect(callback?: (info: { chainId: number }) => any): void

  onDisconnect(
    callback: (error: { code: number; message: string }) => any
  ): void
  offDisconnect(
    callback?: (error: { code: number; message: string }) => any
  ): void

  onChainChange(callback: (chainId: number) => any): void
  offChainChange(callback?: (chainId: number) => any): void
}
