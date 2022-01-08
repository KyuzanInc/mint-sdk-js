import React from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { CardBase } from './base'
import { SaleInfo } from '../SaleInfo'

type Props = {
  item: Item
  onAuctionFinish?: () => void
}

export const ActiveCard: React.FC<Props> = ({ item, onAuctionFinish }) => {
  if (item.paymentMethodData.paymentMethod === 'credit-card-stripe-fixed-price')
    throw new Error('not implemented')
  const soldOut = item.availableStockNum === 0
  return (
    <CardBase
      href={`/items/${item.id}`}
      title={item.name}
      media={item.previews[0]}
      availableStockNum={item.availableStockNum}
      totalStockNum={item.itemStockIds.length}
      withPhysicalProduct={item.type === 'with-physical-item'}
    >
      <SaleInfo
        startAt={new Date(item.startAt)}
        endAt={new Date(item.endAt)}
        tradeType={item.paymentMethodData.paymentMethod}
        networkId={item.paymentMethodData.contractDataERC721Shop.networkId}
        price={item.price}
        onComplete={onAuctionFinish}
        hasBought={soldOut}
      />
    </CardBase>
  )
}
