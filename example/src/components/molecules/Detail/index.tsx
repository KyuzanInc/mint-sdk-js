import React, { useCallback, useState } from 'react'
import { ItemTradeType } from '@kyuzan/mint-sdk-js'

import { LiveStatus } from './active'
import { EndedStatus } from './ended'
import styled from '@emotion/styled'
import { color, font } from '../../../style'
import { CountdownTimeDelta } from 'react-countdown'

type Props = {
  tradeType: ItemTradeType
  endAt: Date
  price: number
  unit: string
  onTick: (countdownTimeDelta: CountdownTimeDelta) => void
}

export const StatusDetail: React.FC<Props> = ({
  endAt,
  price,
  unit,
  tradeType,
  onTick,
}) => {
  const isAuction = tradeType === 'autoExtensionAuction'

  if (isAuction) {
    const endDate = endAt ?? new Date()
    const initialState = endDate < new Date()
    const [isEnded, setIsEnded] = useState(initialState)
    const updateTime = useCallback(() => {
      setIsEnded(true)
    }, [])
    return (
      <>
        {!isEnded && (
          <LiveStatus
            endAt={endDate}
            price={price}
            unit={unit}
            onComplete={updateTime}
            onTick={onTick}
          />
        )}
        {isEnded && <EndedStatus endAt={endAt} unit={unit} price={price} />}
      </>
    )
  } else {
    return (
      <PriceContent>
        <StatusValue>
          <Value className={'value'}>{price}</Value>
          <Unit>{unit}</Unit>
        </StatusValue>
      </PriceContent>
    )
  }
}

export const PriceContent = styled.div`
  margin: 0 24px 0px 0;
`

export const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.mont.label}
  margin-bottom: 16px;
`

export const StatusValue = styled.div`
  ${font.mont.h2}
  color: ${color.content.dark};
  display: flex;
  align-items: center;
`

export const Value = styled.h3`
  display: flex;
  ${font.mont.h3}
  color: ${color.content.dark};
`

export const Unit = styled.div`
  ${font.mont.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 4px;
`
