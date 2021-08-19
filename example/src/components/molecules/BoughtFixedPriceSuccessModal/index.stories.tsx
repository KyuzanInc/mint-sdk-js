import React from 'react'
import { action } from '@storybook/addon-actions'
import { BoughtFixedPriceSuccessModal } from '.'
import { addDays } from 'date-fns'

export const Basic: React.VFC = () => (
  <BoughtFixedPriceSuccessModal
    closeModal={action('close Modal')}
    endAt={addDays(new Date(), 10)}
    price={21.1}
    media={{
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    }}
    itemName={'TEST'}
    isOpen={true}
    unit={'ETH'}
    itemNetworkId={4}
    txHash={''}
  />
)

export default {
  title: 'molecules/BoughtFixedPriceSuccessModal',
}
