import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  CardList,
  EmptyTitle,
} from '../../atoms/CardList'
import { EndedCard } from '../../molecules/Card/ended'

type Props = {
  items: Item[]
}

export const EndedAuctionList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <ListComponent>
        <ListTitle>
          <Title>Ended Auctions</Title>
        </ListTitle>
        <EmptyTitle>No Items</EmptyTitle>
      </ListComponent>
    )
  }
  return (
    <ListComponent>
      <ListTitle>
        <Title>Ended Auctions</Title>
      </ListTitle>
      <CardUL>
        {items.map((item, i) => {
          return (
            <CardList key={i}>
              <EndedCard item={item} />
            </CardList>
          )
        })}
      </CardUL>
    </ListComponent>
  )
}
