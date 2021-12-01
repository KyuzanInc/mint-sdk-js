import React from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { LoadingCard } from './loading'
import { ActiveCard } from './active'
type Props =
  | {
      loading: false
      item: Item
      onAuctionFinish?: () => void
    }
  | {
      loading: true
    }

export const Card: React.VFC<Props> = (args) => {
  if (args.loading) return <LoadingCard />

  return <ActiveCard item={args.item} onAuctionFinish={args.onAuctionFinish} />
}
