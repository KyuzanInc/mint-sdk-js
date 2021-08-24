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
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const InnerContainer = styled.div`
@media (max-width: 480px) {
  padding: 40% 0;
};
  padding-top: 10%;
  width: 100%;
`
