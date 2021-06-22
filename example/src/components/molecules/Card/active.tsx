import React from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { Card } from '.'
import { AuctionInfo } from '../AuctionInfo'

type Props = {
  item: Item
  onAuctionFinish?: () => void
}

export const ActiveCard: React.FC<Props> = ({ item, onAuctionFinish }) => {
  return (
    <Card
      href={`/items/${item.itemId}`}
      title={item.name}
      media={item.imageURIHTTP}
      withPhysicalProduct={item.type === 'nftWithPhysicalProduct'}
    >
      <AuctionInfo
        startAt={item.startAt}
        endAt={item.endAt}
        tradeType={item.tradeType}
        networkId={item.networkId}
        initialPrice={item.initialPrice}
        currentPrice={item.currentPrice}
        onComplete={onAuctionFinish}
      />
    </Card>
  )
}
