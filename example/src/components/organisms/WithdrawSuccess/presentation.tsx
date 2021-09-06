import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { WithdrawModal } from './modal'
import { color, media } from '../../../style'

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
  width: 100vw;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const InnerContainer = styled.div`
  ${media.sp`
    padding: 40% 0;
  `}
`
