import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'
import {
  BidderDetail,
  BidderId,
  BidPrice,
  BidTime,
  HistoryContainer,
  Icon,
} from '.'

type Props = {
  children?: ReactNode
}

export const LoadingHistoryCard: React.FC<Props> = () => {
  return (
    <HistoryContainer>
      <Avatar>
        <Skeleton circle={true} height={44} width={44} />
      </Avatar>
      <BidderDetail>
        <BidderId>
          <Skeleton />
          <Skeleton width={150} />
        </BidderId>
        <BidTime>
          <Skeleton width={100} />
        </BidTime>
      </BidderDetail>
      <BidPrice>
        <Skeleton width={60} />
        <Icon />
      </BidPrice>
    </HistoryContainer>
  )
}

const Avatar = styled.div`
  margin: 4.5px 16px 4.5px 0;
`
