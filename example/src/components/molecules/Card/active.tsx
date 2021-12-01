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
  // TODO: Itemに在庫数入れる
  const soldOut = false
  return (
    <CardBase
      href={`/items/${item.id}`}
      title={item.name}
      media={item.previews[0]}
      withPhysicalProduct={item.type === 'with-physical-item'}
    >
      <SaleInfo
        startAt={new Date(item.startAt)}
        endAt={new Date(item.endAt)}
        tradeType={item.paymentMethodData.paymentMethod}
        networkId={item.paymentMethodData.contractDataERC721Shop.networkId}
        price={item.price}
        onComplete={onAuctionFinish}
        // TODO: もうちょい便利に生やすか、util用意
        hasBought={soldOut}
      />
    </CardBase>
  )
}
