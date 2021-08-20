import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { WithdrawModal } from '../../molecules/WithdrawModal'
import { color } from '../../../style'

type Props = {
  item: Item
  bidHash: string
  shareUrl: string
}

export const Presentation: React.VFC<Props> = ({ item, bidHash, shareUrl }) => {
  return (
    <Container>
      <InnerContainer>
        <WithdrawModal item={item} bidHash={bidHash} shareUrl={shareUrl} />
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  background: ${color.background.bague};
  min-width: 840px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 170px;
  margin: auto;
`

const InnerContainer = styled.div`
  min-width: 840px;
  min-height: 100vh;
`
