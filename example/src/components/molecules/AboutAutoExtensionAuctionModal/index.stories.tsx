import { action } from '@storybook/addon-actions'
import React from 'react'
import { AboutAutoExtensionAuctionModal } from '.'

export const Basic: React.VFC = () => (
  <AboutAutoExtensionAuctionModal isOpen={true} closeModal={action('close')} />
)

export default {
  title: 'molecules/AboutAutoExtensionAuctionModal',
}
