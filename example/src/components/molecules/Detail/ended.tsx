import React from 'react'
import styled from '@emotion/styled'
import { color } from '../../../style'
import { format } from 'date-fns'
import {
  StatusContainer,
  PriceContent,
  StatusTitle,
  StatusValue,
  Value,
  Unit,
  TimeContent,
} from './active'

type Props = {
  endAt: Date
  price: number
}

export const EndedStatus: React.FC<Props> = ({ price, endAt }) => {
  const target = endAt ?? new Date()
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
  display: flex;
  align-items: center;
`
