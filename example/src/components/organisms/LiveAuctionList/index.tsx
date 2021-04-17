import { Item } from '@kyuzan/mint-sdk-js'
import React, { ReactNode } from 'react'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  CardList,
  ActiveStatus,
  EmptyTitle,
} from '../../atoms/CardList'
import { ActiveCard } from '../../molecules/Card/ActiveCard'

type Props = {
  items: Item[]
  children?: ReactNode
}

export const LiveAuctionList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <ListComponent>
        <ListTitle>
          <ActiveStatus />
          <Title>Live Auctions</Title>
        </ListTitle>
        <EmptyTitle>No Items</EmptyTitle>
      </ListComponent>
    )
  }
  return (
    <ListComponent>
      <ListTitle>
        <ActiveStatus />
        <Title>Live Auctions</Title>
      </ListTitle>
      <CardUL>
        {items.map((item, i) => {
          return (
            <CardList key={i}>
              <ActiveCard item={item} />
            </CardList>
          )
        })}
      </CardUL>
    </ListComponent>
  )
}
