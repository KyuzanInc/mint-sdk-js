import React from 'react'
import { StatusDetail } from '.'
import { addDays, addMinutes, subDays } from 'date-fns'
import { action } from '@storybook/addon-actions'

export const Live: React.VFC = () => (
  <StatusDetail
    price={0.2}
    unit={'ETH'}
    endAt={addMinutes(new Date(), 5)}
    tradeType={'ethereum-contract-erc721-shop-auction'}
    onTick={action('onTick')}
  />
)

export const LivePolygon: React.VFC = () => (
  <StatusDetail
    price={0.2}
    unit={'MATIC'}
    endAt={addDays(new Date(), 10)}
    tradeType={'ethereum-contract-erc721-shop-auction'}
    onTick={action('onTick')}
  />
)

export const End: React.VFC = () => (
  <StatusDetail
    price={0.2}
    unit={'ETH'}
    endAt={subDays(new Date(), 10)}
    tradeType={'ethereum-contract-erc721-shop-auction'}
    onTick={action('onTick')}
  />
)

export default {
  title: 'molecules/StatusDetail',
}
