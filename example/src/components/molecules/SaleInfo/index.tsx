import styled from '@emotion/styled'
import React from 'react'
import { color, font, media } from '../../../style'
import Countdown from 'react-countdown'
import { format, isAfter, isBefore } from 'date-fns'
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
  currentPrice?: number // 固定価格はここに値段を入れる
  hasBought?: boolean // 固定価格
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

export const SaleInfo: React.VFC<Props> = ({
  startAt,
  endAt,
  initialPrice,
  currentPrice,
  networkId,
  onComplete,
  tradeType,
  hasBought,
}) => {
  const isAuction = tradeType === 'autoExtensionAuction'
  if (isAuction) {
    const endDate =
      (typeof endAt === 'string' ? new Date(endAt) : endAt) ?? new Date()
    const auctionIsEnded = isAfter(new Date(), endDate)
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
              <span>{auctionIsEnded ? '終了価格' : '現在価格'}</span>
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
          <StatusTitle>
            {auctionIsEnded ? '終了時間' : '終了する時刻'}
          </StatusTitle>
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
  } else {
    const startDate =
      (typeof startAt === 'string' ? new Date(startAt) : startAt) ?? new Date()
    const endDate =
      (typeof endAt === 'string' ? new Date(endAt) : endAt) ?? new Date()
    const now = new Date()
    const onSale = isAfter(now, startDate) && isBefore(now, endDate)
    const formattedStartDate = format(startDate, 'yyyy.MM.dd HH:mm')
    let price = currentPrice!
    if (price < 0.01) {
      price = 0.01
    } else {
      price = Math.round(price * 100) / 100
    }
    return (
      <Container>
        <StatusContainer>
          <StatusBar active={onSale && !hasBought} />
          <StatusContent>
            <StatusTitle>
              <span>{'即決価格'}</span>
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
          <StatusTitle>{hasBought ? '' : '開始時間'}</StatusTitle>
          <StatusValue>
            <EndedDate>
              {hasBought ? '売り切れ' : `${formattedStartDate}`}
            </EndedDate>
          </StatusValue>
        </PriceContainer>
      </Container>
    )
  }
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
        <TimeUnit>日</TimeUnit>
        <Time>{hours}</Time>
        <TimeUnit>時間</TimeUnit>
        <Time>{minutes}</Time>
        <TimeUnit>分</TimeUnit>
        <Time>{seconds}</Time>
        <TimeUnit>秒</TimeUnit>
      </StatusValue>
    )
  }
}

const Container = styled.div`
  height: 52px;
  width: 100%;
  ${font.mont.subtitle1}
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  margin: 0 16px 0 0;
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
  text-align: center;
  color: ${color.content.dark};
  ${font.mont.overline}
  display: flex;
  align-items: center;
`

const StatusValue = styled.div`
  ${font.mont.h3}
  color: ${color.content.dark};
  display: flex;
  align-items: center;
`

const Value = styled.div`
  /* width: 42px; */
  display: flex;
  ${font.mont.h4}
  font-weight:300;
  color: ${color.content.dark};
  ${media.sp`
    ${font.mont.h3}
    font-weight:300;
  `}
`

const Unit = styled.div`
  width: 22px;
  ${font.mont.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 2px;
`

const Icon = styled.div`
  margin-left: 4px;
  height:16px;
`

const EndedDate = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: ${color.content.dark};
`

const Time = styled.div`
  width: 15px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-left: 4px;
  text-align: right;
  ${font.mont.body2};
  color: ${color.content.dark};
  &:first-of-type{
   margin:0; 
  }
`

const TimeUnit = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 12.9px;
  color: ${color.content.dark};
  margin-left: 4px;
`
