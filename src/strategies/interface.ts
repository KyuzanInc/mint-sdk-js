import { WalletInfo } from '../types/WalletInfo'
import { ethers } from 'ethers';

export interface WalletStrategy {
  isWalletConnect(): Promise<boolean>  
  connectWallet(): Promise<void>
  getConnectedNetworkId(): Promise<number> 
  getWalletInfo(): Promise<WalletInfo>
  getProvider(): ethers.providers.Web3Provider
  disconnectWallet(): Promise<void>
  onAccountsChange(callback: (accounts: string[]) => any): void
  offAccountsChange(callback?: (accounts: string[]) => any): void
  onConnect(callback: () => any): void
  offConnect(callback?: () => any): void
  onDisconnect(callback: () => any): void
  offDisconnect(callback?: () => any): void
}