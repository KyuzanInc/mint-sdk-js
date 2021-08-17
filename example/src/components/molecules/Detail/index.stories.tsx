import React from 'react'
import { StatusDetail } from '.'
import { addDays, subDays } from 'date-fns'

export const Live: React.VFC = () => (
  <StatusDetail
    price={0.2}
    unit={'ETH'}
    endAt={addDays(new Date(), 10)}
    tradeType={'autoExtensionAuction'}
  />
)

export const LivePolygon: React.VFC = () => (
  <StatusDetail
    price={0.2}
    unit={'MATIC'}
    endAt={addDays(new Date(), 10)}
    tradeType={'autoExtensionAuction'}
  />
)

export const End: React.VFC = () => (
  <StatusDetail
    price={0.2}
    unit={'ETH'}
    endAt={subDays(new Date(), 10)}
    tradeType={'autoExtensionAuction'}
  />
)

export default {
  title: 'molecules/StatusDetail',
}
