import React from 'react'
import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import { color } from '../../../style'
import { format } from 'date-fns'
import {
  getPrice,
  StatusContainer,
  PriceContent,
  StatusTitle,
  StatusValue,
  Value,
  Unit,
  TimeContent,
} from './active'

type Props = {
  item?: Item
}

export const EndedStatus: React.FC<Props> = ({ item }) => {
  const price = getPrice(item)
  const target = item?.endAt ?? new Date()
  const date = format(target, 'yyyy.MM.dd HH:mm')
  return (
    <StatusContainer>
      <PriceContent>
        <StatusTitle>sold for</StatusTitle>
        <StatusValue>
          <Value>{price}</Value>
          <Unit>ETH</Unit>
        </StatusValue>
      </PriceContent>
      <TimeContent>
        <StatusTitle>ending time</StatusTitle>
        <EndedStatusValue>{date}</EndedStatusValue>
      </TimeContent>
    </StatusContainer>
  )
}

const EndedStatusValue = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 1.3;
  color: ${color.content.dark};
  margin: 16px 0px;
  display: flex;
  align-items: center;
`
