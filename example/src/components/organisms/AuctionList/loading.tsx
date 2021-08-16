import React from 'react'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  ActiveStatus,
  CardList,
} from '../../atoms/CardList'
import { Card } from '../../molecules/Card'

export const LoadingList: React.FC = () => {
  return (
    <>
      <ListComponent>
        <ListTitle>
          <ActiveStatus />
          <Title>Live Auctions</Title>
        </ListTitle>
        <CardUL>
          <CardList>
            <Card loading={true} />
          </CardList>
          <CardList>
            <Card loading={true} />
          </CardList>
          <CardList>
            <Card loading={true} />
          </CardList>
        </CardUL>
      </ListComponent>
      <ListComponent>
        <ListTitle>
          <Title>Ended Auctions</Title>
        </ListTitle>
        <CardUL>
          <CardList>
            <Card loading={true} />
          </CardList>
          <CardList>
            <Card loading={true} />
          </CardList>
          <CardList>
            <Card loading={true} />
          </CardList>
        </CardUL>
      </ListComponent>
    </>
  )
}
