import React from 'react'
import styled from '@emotion/styled'
import { color, font, media } from '../../../style'
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
  unit: string
}

export const EndedStatus: React.FC<Props> = ({ price, endAt, unit }) => {
  const target = endAt ?? new Date()
  const date = format(target, 'yyyy.MM.dd HH:mm')
  return (
    <StatusContainer>
      <PriceContent>
        <StatusTitle>落札価格</StatusTitle>
        <StatusValue>
          <Value className={'value'}>{price}</Value>
          <Unit>{unit}</Unit>
        </StatusValue>
      </PriceContent>
      <TimeContent>
        <StatusTitle>終了までの残り時間</StatusTitle>
        <EndedStatusValue>{date}</EndedStatusValue>
      </TimeContent>
    </StatusContainer>
  )
}

const EndedStatusValue = styled.div`
  ${font.mont.h2}
  color: ${color.content.dark};
  display: flex;
  align-items: center;
  ${media.sp`
    ${font.mont.h3}
  `}
`
