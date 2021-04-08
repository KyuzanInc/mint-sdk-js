import React, { useEffect } from 'react'
import Countdown from 'react-countdown'
import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import { Card } from '.'
import { color, font } from '../../../style'

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
  return (
    <Card onClick={onClick} title={item.name} media={item.imageURIHTTP}>
      <StatusBar />
      <StatusContent>
        <StatusTitle>current bid</StatusTitle>
        <StatusValue>
          <Value>{item.currentPrice || item.initialPrice || 0}</Value>
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

const StatusContent = styled.div`
  background: ${color.white};
  padding: 0px 24px 0px 8px;
`

const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.label}
  padding: 0 10px 0 0;
`

const StatusValue = styled.div`
  width: 68px;
  height: 24px;
  ${font.lg.h3}
  color: ${color.content.dark};
  margin: 9px 10px 0 0px;
  display: flex;
`

const Value = styled.div`
  width: 42px;
  height: 24px;
  display: flex;
  ${font.lg.h3}
  color: ${color.content.dark};
`

const Unit = styled.div`
  width: 22px;
  height: 12px;
  ${font.lg.unit}
  color: ${color.content.dark};
  margin: 4px 0 6px 0;
`
const Time = styled.div`
  width: 17px;
  height: 20px;
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 19.5px;
  color: ${color.content.dark};
`

const TimeUnit = styled.div`
  width: 7px;
  height: 12px;
  font-weight: 400; font-size: 10px; line-height: 12.9px;,
  color: ${color.content.dark};
  margin: 6px;
`
