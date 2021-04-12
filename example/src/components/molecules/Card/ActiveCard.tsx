import React, { useEffect } from 'react'
import Countdown from 'react-countdown'
import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import { Card } from '.'
import { color } from '../../../style'
import {
  StatusContent,
  StatusTitle,
  StatusValue,
  Unit,
  Value,
} from '../../atoms/Card'

type Props = {
  item: Item
}

interface FormattedProps {
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
    // Render a completed state
    return <StatusValue>Ended</StatusValue>
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

export const ActiveCard: React.FC<Props> = ({ item }) => {
  const onClick = useEffect(() => {
    //TODO: write onclick action
  }, [])
  let price = item.currentPrice || item.initialPrice || 0
  if (price < 0.01) {
    price = 0.01
  } else {
    price = Math.round(price * 100) / 100
  }
  return (
    <Card onClick={onClick} title={item.name} media={item.imageURIHTTP}>
      <StatusBar />
      <StatusContent>
        <StatusTitle>current bid</StatusTitle>
        <StatusValue>
          <Value>{price}</Value>
          <Unit>ETH</Unit>
        </StatusValue>
      </StatusContent>
      <StatusContent>
        <StatusTitle>ending in</StatusTitle>
        <Countdown date={item.endAt ?? 0 - Date.now()} renderer={renderer} />
      </StatusContent>
    </Card>
  )
}

const StatusBar = styled.span`
  background: ${color.active}
  width: 6px;
  height: 52px;
  border-radius: 3px;
`
const Time = styled.div`
  width: 18px;
  height: 20px;
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${color.content.dark};
`

const TimeUnit = styled.div`
  width: 7px;
  height: 12px;
  font-weight: 400; font-size: 10px; line-height: 12.9px;,
  color: ${color.content.dark};
  margin: 6px;
`
