import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'
import Countdown from 'react-countdown'
import { format } from 'date-fns'
import { ItemDetail } from '../../../redux/item'

type Props = {
  item: ItemDetail
  onComplete?: () => void
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

export const AuctionInfo: React.VFC<Props> = ({ item, onComplete }) => {
  if (!item) return null
  const endDate =
    (typeof item.endAt === 'string' ? new Date(item.endAt) : item.endAt) ??
    new Date()
  const auctionIsEnded = endDate < new Date()
  const formattedEndDate = format(endDate, 'yyyy.MM.dd HH:mm')
  let price = item.currentPrice || item.initialPrice || 0
  if (price < 0.01) {
    price = 0.01
  } else {
    price = Math.round(price * 100) / 100
  }
  return (
    <Container>
      {auctionIsEnded ? <StatusBarInActive /> : <StatusBar />}
      <StatusContent>
        <StatusTitle>{auctionIsEnded ? 'sold for' : 'current bid'}</StatusTitle>
        <StatusValue>
          <Value>{price}</Value>
          <Unit>ETH</Unit>
        </StatusValue>
      </StatusContent>
      <StatusContent>
        <StatusTitle>{auctionIsEnded ? 'end time' : 'ending in'}</StatusTitle>
        {auctionIsEnded ? (
          <StatusValue>
            <EndedDate>{formattedEndDate}</EndedDate>
          </StatusValue>
        ) : (
          <Countdown
            date={item.endAt ?? 0 - Date.now()}
            renderer={renderer}
            onComplete={onComplete}
          />
        )}
      </StatusContent>
    </Container>
  )
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

const Container = styled.div`
  background: ${color.white};
  height: 52px;
  width: 100%;
  ${font.lg.subtitle1}
  display: flex;
  align-items: center;
  color: ${color.content.dark};
  align-items: center;
`

const StatusBar = styled.span`
  background: ${color.active};
  width: 6px;
  height: 52px;
  border-radius: 3px;
`

const StatusBarInActive = styled.span`
  background: rgba(0, 0, 0, 0.14);
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
  font-weight: 400;
  font-size: 10px;
  line-height: 12.9px;
  color: ${color.content.dark};
  margin: 6px;
`

const StatusContent = styled.div`
  background: ${color.white};
  padding: 0px 6px 0px 8px;
`

const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.overline}
  padding: 0 10px 0 0;
`

const StatusValue = styled.div`
  width: 68px;
  height: 24px;
  ${font.lg.h3}
  color: ${color.content.dark};
  margin: 9px 10px 0 0px;
  display: flex;
  align-items: center;
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
  height: 20px;
  ${font.lg.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 2px;
`

const EndedDate = styled.div`
  width: 118px;
  height: 20px;
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: ${color.content.dark};
  display: table;
`
