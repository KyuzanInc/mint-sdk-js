import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { color, font } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { TransactionStatus } from '../../atoms/TransactionStatus'
import { IconButton } from '../../atoms/IconButton'

type Props = {
  item: Item
  bidHash?: string
}

type ModalContentProps = {
  url: string
  tweetUrl: string
  item: Item
  bidHash?: string
}

export const WithdrawModal: React.VFC<Props> = ({ item }) => {
  return (
    <Container>
      <MediaContainer>
        <MediaContent media={item?.previews[0]} height={520} />
      </MediaContainer>
      <Right>
        <ModalContent url={''} tweetUrl={''} item={item} />
      </Right>
    </Container>
  )
}

const ModalContent: React.VFC<ModalContentProps> = ({
  item,
  bidHash,
}) => {
  const url = window.location.href;
  return (
    <ModalContainer>
      <Typography>Congratulation on getting your NFT !</Typography>
      <Description>
        NFTの購入が完了しました。
        <br />
        NFTは購入完了処理後、マイページで確認できるようになります。
        <br />
      </Description>
      <TransactionContainer>
        <TransactionStatus item={item} hash={bidHash ?? ''} />
      </TransactionContainer>
      <PromotionContainer>
        <PromotionText>待っている間、 ちょっと自慢しませんか？</PromotionText>
        <IconList>
          <Icon>
            <IconButton
              imagePath={'/images/twitter_icon.svg'}
              href={`http://twitter.com/share?url=${url}&text=NFTアイテムを手に入れました！`}
            />
          </Icon>
          <Icon>
            <IconButton
              imagePath={'/images/facebook.svg'}
              href={""}
            />
          </Icon>
          <Icon>
            <IconButton
              imagePath={'/images/paperclip.svg'}
              href={'//twitter.com/share'}
            />
          </Icon>
        </IconList>
      </PromotionContainer>
    </ModalContainer>
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

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 44px 42px;
`

const Typography = styled.h2`
  ${font.lg.h2}
  color: #FF8C00;
  background: -webkit-linear-gradient(0deg, #fd80a8 0%, #fccf42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  padding-bottom: 22px;
`
const Description = styled.div`
  ${font.lg.body1}
  color: black;
  text-align: left;
  padding: 22px 0;
`
const TransactionContainer = styled.div`
  padding: 22px 0;
  width: 100%;
`

const PromotionContainer = styled.div`
  display: flex;
  flex-direction: colum;
  padding: 22px 0;
  justify-content: center;
  align-items: center;
  min-width: 310px;
`

const PromotionText = styled.div`
  ${font.lg.body2}
  color: black;
  text-align: left;
`

const IconList = styled.div`
  display: flex;
  flex-direction: colum;
`

const Icon = styled.div`
  padding-left: 16px;
`
