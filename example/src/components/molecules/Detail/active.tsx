import React from 'react'
import Countdown from 'react-countdown'
import styled from '@emotion/styled'
import { color, font } from '../../../style'

type LiveProps = {
  endAt: Date
  price: number
  onComplete: () => void
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

export const LiveStatus: React.FC<LiveProps> = ({
  price,
  endAt,
  onComplete,
}) => {
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
        <Countdown
          date={endAt ?? 0 - Date.now()}
          renderer={renderer}
          onComplete={onComplete}
        />
      </TimeContent>
    </StatusContainer>
  )
}

export const StatusContainer = styled.div`
  display: flex;
  background: ${color.white};
`

export const Time = styled.div`
  ${font.lg.h2}
  color: ${color.content.dark};
  margin-right: 4px;
`

export const TimeUnit = styled.div`
  ${font.lg.label}
  color: ${color.content.dark};
  margin-right: 4px;
`

export const PriceContent = styled.div`
  margin-right: 24px;
`

export const TimeContent = styled.div`
  background: ${color.white};
`

export const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.label}
  margin-bottom: 16px;
`

export const StatusValue = styled.div`
  ${font.lg.h2}
  color: ${color.content.dark};
  display: flex;
  align-items: center;
`

export const Value = styled.div`
  display: flex;
  ${font.lg.h2}
  color: ${color.content.dark};
`

export const Unit = styled.div`
  ${font.lg.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 4px;
`
