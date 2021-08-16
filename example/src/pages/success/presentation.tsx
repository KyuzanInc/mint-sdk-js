import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { DrawerModal } from '../../components/molecules/DrawerModal'
import { color } from '../../style'

type Props = {
  item: Item
  bidHash: string
}

export const Presentation: React.VFC<Props> = ({ item }) => {
  return (
    <Container>
      <InnerContainer>
        <DrawerModal item={item} bidHash={''}/>
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
