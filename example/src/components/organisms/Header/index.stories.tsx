import React from 'react'
import { action } from '@storybook/addon-actions'
import { Presentation } from './presentation'

export const Basic: React.VFC = () => (
  <Presentation
    loading={false}
    isLogin={true}
    accountAvatarImgUrl={undefined}
    walletAddress={'0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B'}
    walletBalance={'12.2ETH'}
    connectWalletLoading={false}
    onClickConnectWallet={action('onClickConnectWallet')}
  />
)

export const AvatarImg: React.VFC = () => (
  <Presentation
    loading={false}
    isLogin={true}
    accountAvatarImgUrl={'https://place-hold.it/350x350'}
    walletAddress={'0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B'}
    walletBalance={'12.2ETH'}
    connectWalletLoading={false}
    onClickConnectWallet={action('onClickConnectWallet')}
  />
)

export const Loading: React.VFC = () => (
  <Presentation
    loading={true}
    isLogin={false}
    accountAvatarImgUrl={undefined}
    walletAddress={''}
    walletBalance={''}
    connectWalletLoading={false}
    onClickConnectWallet={action('onClickConnectWallet')}
  />
)

export const NoLogin: React.VFC = () => (
  <Presentation
    loading={false}
    isLogin={false}
    accountAvatarImgUrl={undefined}
    walletAddress={''}
    walletBalance={''}
    connectWalletLoading={false}
    onClickConnectWallet={action('onClickConnectWallet')}
  />
)

export const ConnectingWallet: React.VFC = () => (
  <Presentation
    loading={false}
    isLogin={false}
    accountAvatarImgUrl={undefined}
    walletAddress={''}
    walletBalance={''}
    connectWalletLoading={true}
    onClickConnectWallet={action('onClickConnectWallet')}
  />
)

export default {
  title: 'organism/Header',
}
