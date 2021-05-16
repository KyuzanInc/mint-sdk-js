import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import React from 'react'
import { Card } from '.'
import {
  StatusContent,
  StatusTitle,
  StatusValue,
  Time,
  Value,
} from '../../atoms/Card'

export const LoadingCard: React.FC = () => {
  return (
    <Card href={''}>
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
