import React from 'react'
import styled from '@emotion/styled'
import { ItemLog } from '@kyuzan/mint-sdk-js'
import { format } from 'date-fns'
import { color, font } from '../../../style'

type Props = {
  log: ItemLog
}

export const HistoryCard: React.FC<Props> = ({ log }) => {
  const price = log.price
  const date = format(log.createAt, 'yyyy/MM/dd HH:mm')
  return (
    <HistoryContainer>
      <Avatar src={'/images/avatar.png'} />
      <BidderDetail>
        <BidderId>{log.accountAddress}</BidderId>
        <BidTime>{date}</BidTime>
      </BidderDetail>
      <BidPrice>
        {price} ETH
        <Icon src={'/images/external-link.svg'} />
      </BidPrice>
    </HistoryContainer>
  )
}

const HistoryContainer = styled.div`
  width: 426px;
  height: 70px;
  padding: 8px 16px 8px 16px;
  justify: space-between;
  display: flex;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  margin: 4.5px 16px 4.5px 0;
  object-fit: cover;
  border-radius: 50%;
`

const BidderDetail = styled.div`
  width: 200px;
  overflow-wrap: break-word;
`
const BidderId = styled.div`
  ${font.lg.caption}
`
const BidTime = styled.div`
  padding: 4px 0 0 0;
  ${font.lg.caption}
  color: ${color.content.gray}
`
const BidPrice = styled.div`
  min-width: 100px;
  ${font.lg.subtitle1}
  justify-content: center;
  display: flex;
  margin: auto;
`
const Icon = styled.img`
  text-align: center;
  margin-left: 4px;
`
