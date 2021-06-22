import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'
import Countdown from 'react-countdown'
import { format } from 'date-fns'
import Image from 'next/image'
import { getPriceUnit } from '../../../util/getItemPriceUnit'
import { getNetworkIconPath } from '../../../util/getNetworkIconPath'
import { NetworkId, ItemTradeType } from '@kyuzan/mint-sdk-js'

type Props = {
  tradeType: ItemTradeType
  networkId: NetworkId
  startAt?: Date
  endAt?: Date
  initialPrice?: number
  currentPrice?: number
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

export const AuctionInfo: React.VFC<Props> = ({
  endAt,
  initialPrice,
  currentPrice,
  networkId,
  onComplete,
}) => {
  const endDate =
    (typeof endAt === 'string' ? new Date(endAt) : endAt) ?? new Date()
  const auctionIsEnded = endDate < new Date()
  const formattedEndDate = format(endDate, 'yyyy.MM.dd HH:mm')
  let price = currentPrice || initialPrice || 0
  if (price < 0.01) {
    price = 0.01
  } else {
    price = Math.round(price * 100) / 100
  }
  return (
    <Container>
      <StatusContainer>
        <StatusBar active={!auctionIsEnded} />
        <StatusContent>
          <StatusTitle>
            <span>{auctionIsEnded ? 'sold for' : 'current bid'}</span>
            <Icon>
              <Image
                src={getNetworkIconPath(networkId)}
                width={16}
                height={16}
                layout={'fixed'}
              />
            </Icon>
          </StatusTitle>
          <StatusValue>
            <Value>{price}</Value>
            <Unit>{getPriceUnit(networkId)}</Unit>
          </StatusValue>
        </StatusContent>
      </StatusContainer>
      <PriceContainer>
        <StatusTitle>{auctionIsEnded ? 'end time' : 'ending in'}</StatusTitle>
        {auctionIsEnded ? (
          <StatusValue>
            <EndedDate>{formattedEndDate}</EndedDate>
          </StatusValue>
        ) : (
          <Countdown
            date={endAt ?? 0 - Date.now()}
            renderer={renderer}
            onComplete={onComplete}
          />
        )}
      </PriceContainer>
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
  height: 52px;
  width: 100%;
  ${font.lg.subtitle1}
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${color.content.dark};
`

const StatusBar = styled.span<{ active: boolean }>`
  background: ${({ active }) => (active ? color.active : color.content.light)};
  width: 6px;
  height: 100%;
  border-radius: 3px;
`

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const StatusContent = styled.div`
  margin-left: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PriceContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 4px;
`

const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.overline}
  display: flex;
`

const StatusValue = styled.div`
  ${font.lg.h3}
  color: ${color.content.dark};
  display: flex;
  align-items: center;
`

const Value = styled.div`
  width: 42px;
  display: flex;
  ${font.lg.h4}
  color: ${color.content.dark};
`

const Unit = styled.div`
  width: 22px;
  ${font.lg.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 2px;
`

const Icon = styled.div`
  margin-left: 4px;
`

const EndedDate = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: ${color.content.dark};
`

const Time = styled.div`
  width: 19px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-left: 4px;
  text-align: right;
  color: ${color.content.dark};
`

const TimeUnit = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12.9px;
  color: ${color.content.dark};
  margin-left: 4px;
`
