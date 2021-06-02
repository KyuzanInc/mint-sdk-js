import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { color } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { CardContent } from './CardContent'

type Props = {
  item: Item
}

export const CardSuccessPage: React.VFC<Props> = ({ item }) => {
  return (
    <Container>
      <MediaContainer>
        <MediaContent media={item?.previews[0]} height={520} />
      </MediaContainer>
      <Right>
        <CardContent url={''} tweetUrl={''} />
      </Right>
    </Container>
  )
}

const Container = styled.article`
  max-width: 880px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
`

const MediaContainer = styled.div`
  position: relative;
  width: 440px;
  height: 520px;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 440px;
`
