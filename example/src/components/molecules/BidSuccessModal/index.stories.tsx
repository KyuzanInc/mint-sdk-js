import React from 'react'
import { action } from '@storybook/addon-actions'
import { BidSuccessModal } from '.'
import { addDays } from 'date-fns'

export const Basic: React.VFC = () => (
  <BidSuccessModal
    closeModal={action('closeModal')}
    itemName={'TEST'}
    itemNetworkId={1}
    endAt={addDays(new Date(), 10)}
    price={21.1}
    media={{
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    }}
    isOpen={true}
    unit={'ETH'}
    bidHash={''}
  />
)

export default {
  title: 'molecules/BidSuccessModal',
}
