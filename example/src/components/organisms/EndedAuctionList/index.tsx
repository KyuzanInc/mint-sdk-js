import React from 'react'
import { ListComponent, ListTitle, Title, CardUL, CardList } from '../../atoms/CardList'
import { EndedCard } from '../../molecules/Card/EndedCard'

type Props = {
}

export const EndedAuctionList: React.FC<Props> = ({
}) => {
  return (
    <ListComponent>
      <ListTitle>
        <Title>
          Ended Auctions
        </Title>
      </ListTitle>
      <CardUL>
        <CardList>
          <EndedCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
        <CardList>
          <EndedCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
        <CardList>
          <EndedCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
        <CardList>
          <EndedCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
      </CardUL>
    </ListComponent>
  )
}
