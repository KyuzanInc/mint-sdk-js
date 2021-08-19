import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Modal from 'react-modal'
import { color, font, media } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { StatusDetail } from '../Detail'
import { TransactionStatus } from '../../atoms/TransactionStatus'
import { NetworkId } from '@kyuzan/mint-sdk-js'
import { useMedia } from '../../../util/useMedia'

type Props = {
  itemName: string
  endAt: Date
  price: number
  media: { url: string; mimeType: string } | undefined
  isOpen: boolean
  closeModal: () => void
  unit: string
  itemNetworkId: NetworkId
  txHash: string
}

export const BoughtFixedPriceSuccessModal: React.VFC<Props> = ({
  closeModal,
  isOpen,
  unit,
  media,
  endAt,
  price,
  itemName,
  itemNetworkId,
  txHash,
}) => {
  const isMobile = useMedia().isMobile
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          border: 'none',
          background: 'transparent',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      contentLabel="Wallet"
      ariaHideApp={false}
    >
      <ModalContainer>
        <Content>
          <Left>
            <MediaContainer>
              <MediaContent media={media} height={254} />
            </MediaContainer>
            <InfoContainer>
              <ItemName>{itemName}</ItemName>
              <StatusDetail
                endAt={endAt}
                price={price}
                unit={unit}
                tradeType={'fixedPrice'}
              />
            </InfoContainer>
          </Left>
          <Right>
            <TitleContainer>
              <Image
                layout={'fixed'}
                src={'/images/check-circle.svg'}
                width={44}
                height={44}
              />
              <TitleContent>購入に成功しました</TitleContent>
            </TitleContainer>
            <Description>
              NFTの購入が完了しました。<br></br>
              処理が完了した後、マイページで確認できるようになります。
            </Description>
            <TransactionContainer>
              <TransactionStatus networkId={itemNetworkId} hash={txHash} />
            </TransactionContainer>
          </Right>
        </Content>
        <CloseButton onClick={closeModal}>
          <Image
            src={'/images/close_button.svg'}
            width={isMobile ? 32 : 64}
            layout={'fixed'}
            height={isMobile ? 32 : 64}
          />
        </CloseButton>
      </ModalContainer>
    </Modal>
  )
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  max-width: 840px;
  max-height: 480px;
  border-radius: 16px;
  overflow: hidden;
  background: ${color.white};
  display: flex;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  ${media.sp`
    flex-direction:column;
    min-width:320px;
    max-height: fit-content;
  `}
`

const Left = styled.div`
  position: relative;
  flex-basis: 50%;
  background-color: ${color.background.bague};
  /* max-width: 600px; */
  ${media.sp`
    /* min-height: 320px; */
  `}
`

const MediaContainer = styled.div`
  margin: 0 auto;
  padding: 32px;
  width: 100%;
  height: 100%;
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  ${media.sp`
    padding:0;
    width:100%;
    height:320px;
    img, video{
      width: 100%;
      height:100%;
      object-fit:cover;
    }
  `}
`

const InfoContainer = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;
  top: auto;
  background-color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(32px);
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.06),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.03),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  ${media.sp`
    left:16px;
    right:16px;
    bottom:16px;
  `}
`

const ItemName = styled.p`
  ${font.mont.subtitle1}
  margin-bottom: 16px;
`

const Right = styled.div`
  flex-basis: 50%;
  padding: 40px;
  /* width: 440px; */
  ${media.sp`
    padding:16px 24px 32px;
  `}
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 96px;
  ${media.sp`
    margin-top:16px;
  `}
`

const TitleContainer = styled.div`
  ${font.mont.h2};
  color: ${color.subColor.blue};
  display: flex;
  align-items: center;
`
const TitleContent = styled.div`
  ${font.mont.h2};
  color: ${color.subColor.blue};
  margin-left: 16px;
  ${media.sp`
    ${font.mont.h4}
  `}
`

const Description = styled.div`
  ${font.mont.body1};
  color: ${color.content.middle};
  margin: 32px 0;
  ${media.sp`
    ${font.mont.caption};
  `}
`

const TransactionContainer = styled.div`
  width: 100%;
  margin: 64px 0;
  ${media.sp`
    margin:16px 0;
  `}
`
