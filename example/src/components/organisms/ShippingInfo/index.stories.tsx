import React from 'react'
import { action } from '@storybook/addon-actions'
import { Presentation } from './presentation'

export const Basic: React.VFC = () => (
  <Presentation onSubmit={action('onSubmit')} loading={false} />
)

export const Loading: React.VFC = () => (
  <Presentation onSubmit={action('onSubmit')} loading={true} />
)

export default {
  title: 'organism/ShippingInfo',
}
