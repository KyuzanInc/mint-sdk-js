import React from 'react'
import Countdown from 'react-countdown'
import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import { color, font } from '../../../style'

type Props = {
  item?: Item
}

type FormattedProps = {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  completed: boolean
  api: any
  props: any
  formatted: any
}

// Renderer callback with condition
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: FormattedProps) => {
  if (completed) {
    return <StatusValue>ended</StatusValue>
  } else {
    // Render a countdown
    return (
      <StatusValue>
        <Time>{days}</Time>
        <TimeUnit>d</TimeUnit>
        <Time>{hours}</Time>
        <TimeUnit>h</TimeUnit>
        <Time>{minutes}</Time>
        <TimeUnit>m</TimeUnit>
        <Time>{seconds}</Time>
        <TimeUnit>s</TimeUnit>
      </StatusValue>
    )
  }
}

export const StatusDetail: React.FC<Props> = ({ item }) => {
  console.log(item)
  let price = item?.currentPrice || item?.initialPrice || 0
  if (price < 0.01) {
    price = 0.01
  } else {
    price = Math.round(price * 100) / 100
  }
  return (
    <StatusContainer>
      <PriceContent>
        <StatusTitle>current bid</StatusTitle>
        <StatusValue>
          <Value>{price}</Value>
          <Unit>ETH</Unit>
        </StatusValue>
      </PriceContent>
      <TimeContent>
        <StatusTitle>ending in</StatusTitle>
        <Countdown date={item?.endAt ?? 0 - Date.now()} renderer={renderer} />
      </TimeContent>
    </StatusContainer>
  )
}

const StatusContainer = styled.div`
  margin-top: 32px;
  display: flex;
`

const Time = styled.div`
  ${font.lg.h2}
  color: ${color.content.dark};
`

const TimeUnit = styled.div`
  ${font.lg.label}
  color: ${color.content.dark};
  margin: 6px;
`

const PriceContent = styled.div`
  background: ${color.white};
  padding: 0px 24px 0px 8px;
`

const TimeContent = styled.div`
  background: ${color.white};
  padding: 0px 24px;
`

const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.label}
  padding: 0 10px 0 0;
`

const StatusValue = styled.div`
  ${font.lg.h2}
  color: ${color.content.dark};
  margin: 16px 0px;
  display: flex;
  align-items: center;
`

const Value = styled.div`
  display: flex;
  ${font.lg.h2}
  color: ${color.content.dark};
`

const Unit = styled.div`
  ${font.lg.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 4px;
`
