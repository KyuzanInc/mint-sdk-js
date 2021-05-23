import React, { useCallback } from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { Card } from '.'
import { useAppDispatch } from '../../../redux/getStore'
import { getItemsActionCreator } from '../../../redux/items'
import { AuctionInfo } from '../AuctionInfo'

type Props = {
  item: Item
}

export const ActiveCard: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch()
  const getItems = useCallback(() => {
    dispatch(getItemsActionCreator() as any)
  }, [])
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
        onComplete={getItems}
      />
    </Card>
  )
}
