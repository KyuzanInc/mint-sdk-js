import styled from '@emotion/styled'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Detail, Title, Description } from './presentation'

export const LoadingItemDetailComponent: React.VFC = () => {
  return (
    <Detail>
      <Title>
        <Skeleton />
      </Title>
      <Status>
        <Skeleton width={160} height={32} style={{ marginRight: 24 }} />
        <Skeleton width={160} height={32} />
      </Status>
      <LoadingButton>
        <Skeleton width={426} height={44} style={{ borderRadius: 22 }} />
      </LoadingButton>
      <Description>
        <Skeleton count={3} />
        <Skeleton width={100} />
      </Description>
    </Detail>
  )
}

const Status = styled.div`
  display: flex;
  flex-direction: row;
`

const LoadingButton = styled.div`
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
  margin: 32px 0px;
`
