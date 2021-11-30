import React from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { CardBase } from './base'
import { SaleInfo } from '../SaleInfo'

type Props = {
  item: Item
  onAuctionFinish?: () => void
}

export const ActiveCard: React.FC<Props> = ({ item, onAuctionFinish }) => {
  if (
    item.itemDetail.paymentMethodData.paymentMethod ===
    'credit-card-stripe-fixed-price'
  )
    throw new Error('not implemented')
  const soldOut =
    typeof item.itemStocks.find((stock) => stock.status === 'created') ===
    'undefined'
  return (
    <CardBase
      href={`/items/${item.itemDetail.id}`}
      title={item.itemDetail.name}
      media={item.itemDetail.previews[0]}
      withPhysicalProduct={item.itemDetail.type === 'with-physical-item'}
    >
      <SaleInfo
        startAt={new Date(item.itemDetail.startAt)}
        endAt={new Date(item.itemDetail.endAt)}
        tradeType={item.itemDetail.paymentMethodData.paymentMethod}
        networkId={
          item.itemDetail.paymentMethodData.contractDataERC721Shop.networkId
        }
        price={item.itemDetail.price}
        onComplete={onAuctionFinish}
        // TODO: もうちょい便利に生やすか、util用意
        hasBought={soldOut}
      />
    </CardBase>
  )
}
