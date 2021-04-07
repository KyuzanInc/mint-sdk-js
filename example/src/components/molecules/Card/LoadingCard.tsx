import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import React, { useEffect } from 'react'
import { Card } from '.'
import { color, font } from '../../../style'

export const LoadingCard: React.FC = () => {
  const onClick = useEffect(() => {
    //TODO: write onclick action
  }, [])
  return (
    <Card onClick={onClick}>
      <StatusBar />
      <Skeleton count={10} />
      <StatusContent>
        <StatusTitle>
          <Skeleton />
        </StatusTitle>
        <StatusValue>
          <Value>
            <Skeleton height={20} width={32} />
          </Value>
        </StatusValue>
      </StatusContent>
      <StatusContent>
        <StatusTitle>
          <Skeleton />
        </StatusTitle>
        <StatusValue>
          <Time>
            <Skeleton height={20} />
          </Time>
        </StatusValue>
      </StatusContent>
    </Card>
  )
}

const StatusBar = styled.span`
  background: rgba(0, 0, 0, 0);
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
