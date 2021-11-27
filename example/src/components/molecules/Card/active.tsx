import React from 'react'
import {
  ItemWithPhysicalItemType,
  Item,
  ItemStockStatus,
} from '@kyuzan/mint-sdk-js'
import { CardBase } from './base'
import { SaleInfo } from '../SaleInfo'

type Props = {
  item: Item
  onAuctionFinish?: () => void
}

export const ActiveCard: React.FC<Props> = ({ item, onAuctionFinish }) => {
  const soldOut =
    typeof item.itemStocks.find(
      (stock) => stock.status === ItemStockStatus.Created
    ) === 'undefined'
  return (
    <CardBase
      href={`/items/${item.item.id}`}
      title={item.item.name}
      media={item.item.previews[0]}
      withPhysicalProduct={
        item.item.type === ItemWithPhysicalItemType.WithPhysicalItem
      }
    >
      <SaleInfo
        startAt={new Date(item.item.startAt)}
        endAt={new Date(item.item.endAt)}
        // TODO
        tradeType={
          item.item.paymentMethodData.paymentMethod ===
          'ethereum-contract-erc721-shop-auction'
            ? 'autoExtensionAuction'
            : 'fixedPrice'
        }
        // TODO
        networkId={31337}
        price={item.item.price}
        onComplete={onAuctionFinish}
        // TODO: もうちょい便利に生やすか、util用意
        hasBought={soldOut}
      />
    </CardBase>
  )
}
