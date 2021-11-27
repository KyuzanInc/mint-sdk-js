import React from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { LoadingCard } from './loading'
import { ActiveCard } from './active'
type Props = {
  loading: boolean
  item: Item
  onAuctionFinish?: () => void
}

export const Card: React.VFC<Props> = ({ loading, item, onAuctionFinish }) => {
  if (loading) return <LoadingCard />
  if (!item) return <LoadingCard />

  return <ActiveCard item={item} onAuctionFinish={onAuctionFinish} />
}
