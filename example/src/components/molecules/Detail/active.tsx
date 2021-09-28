import React from 'react'
import Countdown from 'react-countdown'
import styled from '@emotion/styled'
import { color, font, media } from '../../../style'
import { CountdownTimeDelta } from 'react-countdown'

type LiveProps = {
  endAt: Date
  price: number
  unit: string
  onComplete: () => void
  onTick: (countdownTimeDelta: CountdownTimeDelta) => void
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
    return <StatusValue>終了</StatusValue>
  } else {
    // Render a countdown
    return (
      <StatusValue>
        <Time className={'value'}>{days}</Time>
        <TimeUnit>日</TimeUnit>
        <Time className={'value'}>{hours}</Time>
        <TimeUnit>時間</TimeUnit>
        <Time className={'value'}>{minutes}</Time>
        <TimeUnit>分</TimeUnit>
        <Time className={'value'}>{seconds}</Time>
        <TimeUnit>秒</TimeUnit>
      </StatusValue>
    )
  }
}

export const LiveStatus: React.FC<LiveProps> = ({
  price,
  unit,
  endAt,
  onComplete,
  onTick,
}) => {
  return (
    <StatusContainer>
      <PriceContent>
        <StatusTitle>現在価格</StatusTitle>
        <StatusValue>
          <Value className={'value'}>{price}</Value>
          <Unit>{unit}</Unit>
        </StatusValue>
      </PriceContent>
      <TimeContent>
        <StatusTitle>終了までの残り時間</StatusTitle>
        <Countdown
          date={endAt ?? 0 - Date.now()}
          renderer={renderer}
          onComplete={onComplete}
          onTick={onTick}
        />
      </TimeContent>
    </StatusContainer>
  )
}

export const StatusContainer = styled.div`
  display: flex;
  /* background: ${color.white}; */
`

export const Time = styled.h3`
  ${font.mont.h3}
  color: ${color.content.dark};
  margin-right: 4px;
  ${media.sp`
    ${font.mont.h3}
  `}
`

export const TimeUnit = styled.div`
  ${font.mont.label}
  color: ${color.content.dark};
  margin-right: 4px;
`

export const PriceContent = styled.div`
  margin-right: 24px;
`

export const TimeContent = styled.div`
  /* background: ${color.white}; */
`

export const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.mont.label}
  margin-bottom: 16px;
`

export const StatusValue = styled.div`
  ${font.mont.h3}
  color: ${color.content.dark};
  display: flex;
  align-items: center;
`

export const Value = styled.h3`
  display: flex;
  ${font.mont.h3}
  color: ${color.content.dark};
  ${media.sp`
    ${font.mont.h3}
  `}
`

export const Unit = styled.div`
  ${font.mont.label}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 4px;
`
