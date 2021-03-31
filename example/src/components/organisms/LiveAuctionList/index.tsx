import styled from '@emotion/styled'
import React from 'react'
import { color } from '../../../style'
import { ListComponent, ListTitle, Title, CardUL, CardList } from '../../atoms/CardList'
import { ActiveCard } from '../../molecules/Card/ActiveCard'

type Props = {
}

export const LiveAuctionList: React.FC<Props> = ({
}) => {
  return (
    <ListComponent>
      <ListTitle>
        <ActiveStatus />
        <Title>
          Live Auctions
        </Title>
      </ListTitle>
      <CardUL>
        <CardList>
          <ActiveCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
        <CardList>
          <ActiveCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
        <CardList>
          <ActiveCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
        <CardList>
          <ActiveCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
        </CardList>
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
