import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Item } from '@kyuzan/mint-sdk-js'
import { format } from 'date-fns'

import React, { useCallback } from 'react'
import { Card } from '.'
import {
  StatusContent,
  StatusTitle,
  StatusValue,
  Value,
  Unit,
  Time,
} from '../../atoms/Card'

type Props = {
  item: Item
}

export const EndedCard: React.FC<Props> = ({ item }) => {
  const target = item.endAt ? item.endAt : new Date()
  const date = format(target, 'yyyy.MM.dd HH:mm')
  const router = useRouter()
  const onClick = useCallback((event: { preventDefault: () => void }) => {
    event.preventDefault()
    router.push(`/items/${item.itemId}`)
  }, [])
  let price = item.currentPrice ?? 0.01
  if (price < 0.01) {
    price = 0.01
  } else {
    price = Math.round(price * 100) / 100
  }
  return (
    <Card onClick={onClick} title={item.name} media={item.imageURIHTTP}>
      <StatusBar />
      <StatusContent>
        <StatusTitle>sold for</StatusTitle>
        <StatusValue>
          <Value>{price}</Value>
          <Unit>ETH</Unit>
        </StatusValue>
      </StatusContent>
      <StatusContent>
        <StatusTitle>end time</StatusTitle>
        <StatusValue>
          <Time>{date}</Time>
        </StatusValue>
      </StatusContent>
    </Card>
  )
}

const StatusBar = styled.span`
  background: rgba(0, 0, 0, 0.14);
  width: 6px;
  height: 52px;
  border-radius: 3px;
`