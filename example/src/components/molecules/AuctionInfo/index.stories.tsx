import { action } from '@storybook/addon-actions'
import { addDays, subDays } from 'date-fns'
import React from 'react'
import { AuctionInfo } from '.'

export const Live: React.VFC = () => (
  <AuctionInfo
    tradeType={'auction'}
    startAt={new Date()}
    endAt={addDays(new Date(), 10)}
    networkId={1}
    initialPrice={1}
    currentPrice={21.1}
    onComplete={action('onComplete')}
  />
)
export const End: React.VFC = () => (
  <AuctionInfo
    tradeType={'auction'}
    startAt={new Date()}
    endAt={subDays(new Date(), 10)}
    networkId={1}
    initialPrice={1}
    currentPrice={21.1}
    onComplete={action('onComplete')}
  />
)

export default {
  title: 'molecules/AuctionInfo',
}
