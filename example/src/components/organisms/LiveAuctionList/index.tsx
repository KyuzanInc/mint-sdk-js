import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React, { ReactNode } from 'react'
import { color } from '../../../style'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  CardList,
} from '../../atoms/CardList'
import { ActiveCard } from '../../molecules/Card/ActiveCard'

type Props = {
  items: Item[]
  children?: ReactNode
}

export const LiveAuctionList: React.FC<Props> = ({ items }) => {
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

const ActiveStatus = styled.div`
  background: ${color.active};
  width: 17px;
  height: 17px;
  border-radius: 50%;
`
