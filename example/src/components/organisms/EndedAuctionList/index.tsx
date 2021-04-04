import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  CardList,
} from '../../atoms/CardList'
import { EndedCard } from '../../molecules/Card/EndedCard'

type Props = {
  items: Item[]
}

export const EndedAuctionList: React.FC<Props> = ({ items }) => {
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
