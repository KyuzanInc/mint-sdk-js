import { Item } from '@kyuzan/mint-sdk-js'
import React, { ReactNode, useCallback } from 'react'
import { useAppDispatch } from '../../../redux/getStore'
import { getItemsActionCreator } from '../../../redux/items'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  CardList,
  ActiveStatus,
  EmptyTitle,
} from '../../atoms/CardList'
import { Card } from '../../molecules/Card'

type Props = {
  items: Item[]
  children?: ReactNode
}

export const LiveAuctionList: React.FC<Props> = ({ items }) => {
  const dispatch = useAppDispatch()
  const getItems = useCallback(() => {
    dispatch(getItemsActionCreator() as any)
  }, [])
  if (items.length === 0) {
    return (
      <ListComponent>
        <ListTitle>
          <ActiveStatus />
          <Title>On Sale</Title>
        </ListTitle>
        <EmptyTitle>No Items</EmptyTitle>
      </ListComponent>
    )
  }
  return (
    <ListComponent>
      <ListTitle>
        <ActiveStatus />
        <Title>On Sale</Title>
      </ListTitle>
      <CardUL>
        {items.map((item, i) => {
          return (
            <CardList key={i}>
              <Card loading={false} onAuctionFinish={getItems} item={item} />
            </CardList>
          )
        })}
      </CardUL>
    </ListComponent>
  )
}
