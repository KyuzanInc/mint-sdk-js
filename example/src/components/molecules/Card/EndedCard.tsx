import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import { format } from 'date-fns'

import React, { useEffect } from 'react'
import { Card } from '.'
import { color } from '../../../style'
import {
  StatusContent,
  StatusTitle,
  StatusValue,
  Value,
  Unit,
} from '../../atoms/Card'

type Props = {
  item: Item
}

export const EndedCard: React.FC<Props> = ({ item }) => {
  const target = item.endAt ? item.endAt : new Date()
  const date = format(target, 'yyyy.MM.dd HH:mm')

  const onClick = useEffect(() => {
    //TODO: write onclick action
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

const Time = styled.div`
  width: 118px;
  height: 20px;
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: ${color.content.dark};
  display: table;
`
