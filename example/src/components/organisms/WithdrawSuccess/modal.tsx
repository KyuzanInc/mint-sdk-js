import styled from '@emotion/styled'
import copy from 'clipboard-copy'
import Image from 'next/image'

import { Item } from '@kyuzan/mint-sdk-js'
import React, { useCallback, useState } from 'react'
import { color, font, media } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { TransactionStatus } from '../../atoms/TransactionStatus'
import { IconButton } from '../../atoms/IconButton'

type Props = {
  item: Item
  bidHash?: string
  shareUrl?: string
}

type ModalContentProps = {
  item: Item
  bidHash?: string
  shareUrl: string
}

export const WithdrawModal: React.VFC<Props> = ({
  item,
  bidHash,
  shareUrl,
}) => {
  return (
    <Container>
      <MediaContainer>
        <MediaContent media={item.previews[0]} height={520} />
      </MediaContainer>
      <Right>
        <ModalContent item={item} bidHash={bidHash} shareUrl={shareUrl ?? ''} />
      </Right>
    </Container>
  )
}

const ModalContent: React.VFC<ModalContentProps> = ({
  item,
  bidHash,
  shareUrl,
}) => {
  const [showToolTip, setShowToolTip] = useState(false)
  const onClickCopy = useCallback(() => {
    copy(shareUrl)
    setShowToolTip(true)
    setTimeout(() => {
      setShowToolTip(false)
    }, 2000)
  }, [])

  if (
    item.paymentMethodData.paymentMethod === 'credit-card-stripe-fixed-price'
  ) {
    throw new Error('not implemented')
  }
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
        <TransactionStatus
          networkId={item.paymentMethodData.contractDataERC721Shop.networkId}
          hash={bidHash ?? ''}
        />
      </TransactionContainer>
      <PromotionContainer>
        <PromotionText>待っている間、 ちょっと自慢しませんか？</PromotionText>
        <IconList>
          <Icon>
            <IconButton
              imagePath={'/images/twitter_icon.svg'}
              href={`http://twitter.com/share?url=${shareUrl}&text=NFTアイテムを手に入れました！`}
            />
          </Icon>
          <Icon>
            <IconButton
              imagePath={'/images/facebook.svg'}
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            />
          </Icon>
          <Icon>
            <DummyIconButton onClick={onClickCopy}>
              <Image
                width={24}
                height={24}
                layout={'fixed'}
                src={'/images/paperclip.svg'}
              />
            </DummyIconButton>
          </Icon>
        </IconList>
      </PromotionContainer>
      {showToolTip && <ToolTip>クリックボードにコピーしました</ToolTip>}
    </ModalContainer>
  )
}

const Container = styled.article`
  overflow: hidden;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
  margin: auto;
  display: flex;
  flex-direction: row;
  width: 90vw;
  max-width: 880px;
  max-height: 520px;
  ${media.sp`
    flex-direction: column;
    max-width: 480px;
    width: 90vmin;
    max-height: none;
  `}
`

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 440px;
  max-height: 520px;
`

const Right = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 440px;
  max-height: 520px;
`

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 10% 10%;
`

const Typography = styled.h2`
  ${font.mont.h2}
  color: #FF8C00;
  background: -webkit-linear-gradient(0deg, #fd80a8 0%, #fccf42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  padding-bottom: 22px;
`
const Description = styled.div`
  ${font.mont.body1}
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
  ${font.mont.body2}
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

const DummyIconButton = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 44px;
  border: 2px solid ${color.content.gray1};
  box-sizing: border-box;
  border-radius: 22px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`

const ToolTip = styled.div`
  background-color: ${color.background.dark};
  border-radius: 16px;
  padding: 8px 16px;
  color: ${color.white};
  ${font.mont.caption}
  position: relative;
  width: 222px;
  height: 31px;
  top: -100px;
  right: -150px;
`
