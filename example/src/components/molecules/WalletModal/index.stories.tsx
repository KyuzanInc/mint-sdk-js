import React from 'react'
import { WalletModal } from '.'
import { action } from '@storybook/addon-actions'

export const Basic: React.VFC = () => (
  <WalletModal
    closeModal={action('close modal')}
    connectWallet={action('connect wallet')}
    isOpen={true}
    loading={false}
  />
)

export const Loading: React.VFC = () => (
  <WalletModal
    closeModal={action('close modal')}
    connectWallet={action('connect wallet')}
    isOpen={true}
    loading={true}
  />
)

export default {
  title: 'molecules/WalletModal',
}
