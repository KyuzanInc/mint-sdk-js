import React from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { CardBase } from './base'
import { SaleInfo } from '../SaleInfo'

type Props = {
  item: Item
  onAuctionFinish?: () => void
}

export const ActiveCard: React.FC<Props> = ({ item, onAuctionFinish }) => {
  return (
    <CardBase
      href={`/items/${item.itemId}`}
      title={item.name}
      media={item.imageURIHTTP}
      withPhysicalProduct={item.type === 'nftWithPhysicalProduct'}
    >
      <SaleInfo
        startAt={item.startAt}
        endAt={item.endAt}
        tradeType={item.tradeType}
        networkId={item.networkId}
        initialPrice={item.initialPrice}
        currentPrice={item.currentPrice ?? item.price}
        onComplete={onAuctionFinish}
        hasBought={typeof item.buyerAddress === 'string'}
      />
    </CardBase>
  )
}
