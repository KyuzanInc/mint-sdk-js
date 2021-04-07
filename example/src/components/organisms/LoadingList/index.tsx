import React from 'react'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  ActiveStatus,
  CardList,
} from '../../atoms/CardList'
import { LoadingCard } from '../../molecules/Card/LoadingCard'

export const LoadingList: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <ListComponent>
        <ListTitle>
          <ActiveStatus />
          <Title>Live Auctions</Title>
        </ListTitle>
        <CardUL>
          <CardList>
            <LoadingCard />
          </CardList>
          <CardList>
            <LoadingCard />
          </CardList>
          <CardList>
            <LoadingCard />
          </CardList>
        </CardUL>
      </ListComponent>
      <ListComponent>
        <ListTitle>
          <Title>Ended Auctions</Title>
        </ListTitle>
        <CardUL>
          <CardList>
            <LoadingCard />
          </CardList>
          <CardList>
            <LoadingCard />
          </CardList>
          <CardList>
            <LoadingCard />
          </CardList>
        </CardUL>
      </ListComponent>
    </React.Fragment>
  )
}
