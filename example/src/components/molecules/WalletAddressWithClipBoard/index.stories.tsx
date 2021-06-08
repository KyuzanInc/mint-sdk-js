import React from 'react'
import { WalletAddressWithClipBoard } from '.'

export const Basic: React.VFC = () => (
  <WalletAddressWithClipBoard
    walletAddress={'0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B'}
  />
)

export default {
  title: 'molecules/WalletAddressWithClipBoard',
}
