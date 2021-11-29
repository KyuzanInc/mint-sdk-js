import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'

import React from 'react'
import { CardBase } from './base'
import {
  StatusContent,
  StatusTitle,
  StatusValue,
  Time,
  Value,
} from '../../atoms/Card'

export const LoadingCard: React.FC = () => {
  return (
    <CardBase href={''}>
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
    </CardBase>
  )
}

const StatusBar = styled.span`
  background-color: transparent;
  width: 6px;
  height: 52px;
  border-radius: 3px;
`
