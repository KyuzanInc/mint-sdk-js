import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { CardSuccessPage } from '../../components/molecules/CardSuccessPage'
import { color } from '../../style'

type Props = {
  item: Item
}

export const Presentation: React.VFC<Props> = ({ item }) => {
  return (
    <Container>
      <InnerContainer>
        <CardSuccessPage item={item} />
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
  padding-top: 72px;
  margin: auto;
`

const InnerContainer = styled.div`
  min-width: 840px;
  min-height: 100vh;
`
