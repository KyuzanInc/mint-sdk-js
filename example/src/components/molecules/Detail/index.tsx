import React, { useCallback, useState } from 'react'
import { ItemTradeType } from '@kyuzan/mint-sdk-js'

import { LiveStatus } from './active'
import { EndedStatus } from './ended'
import styled from '@emotion/styled'
import { color, font } from '../../../style'

type Props = {
  tradeType: ItemTradeType
  endAt: Date
  price: number
  unit: string
}

export const StatusDetail: React.FC<Props> = ({
  endAt,
  price,
  unit,
  tradeType,
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
          />
        )}
        {isEnded && <EndedStatus endAt={endAt} unit={unit} price={price} />}
      </>
    )
  } else {
    return (
      <PriceContent>
        <StatusValue>
          <Value>{price}</Value>
          <Unit>{unit}</Unit>
        </StatusValue>
      </PriceContent>
    )
  }
}

export const PriceContent = styled.div`
  margin-right: 24px;
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
