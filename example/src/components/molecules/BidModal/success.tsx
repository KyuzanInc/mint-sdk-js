import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { color, font } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { StatusDetail } from '../Detail'
import { SimpleButton } from '../../atoms/SimpleButton'
import { TransactionStatus } from '../../atoms/TransactionStatus'

type Props = {
  itemName: string
  endAt: Date
  price: number
  media: { url: string; mimeType: string } | undefined
  minBidPrice: number | undefined
  walletBalance: string | undefined
  isOpen: boolean
  closeModal: () => void
  loading: boolean
  unit: string
  bidPrice: string
  onChangeInput: React.ChangeEventHandler<HTMLInputElement>
  doBid: () => void
  isValidationError?: boolean
  errorText?: string
}

const customStyles: Styles = {
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
}

export const SuccessBidModal: React.VFC<Props> = ({
  closeModal,
  isOpen,
  loading,
  unit,
  doBid,
  media,
  endAt,
  price,
  itemName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
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
              <StatusDetail endAt={endAt} price={price} unit={unit} />
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
              <TitleContent>入札に成功しました</TitleContent>
            </TitleContainer>
            <Description>
              入札が完了しました。<br></br>
              NFTは入札処理が完了した後、マイページで確認できるようになります。
            </Description>
            <TransactionContainer>
              <TransactionStatus transactionUrl={''} />
            </TransactionContainer>
            <ContentButtonContainer>
              <CalenderButton
                iconPath={'/images/icons/calendar.svg'}
                label={'終了時刻をカレンダーに登録する'}
                onClick={doBid}
              />
            </ContentButtonContainer>
          </Right>
        </Content>
        <CloseButton onClick={closeModal}>
          <Image
            src={'/images/close_button.svg'}
            width={64}
            layout={'fixed'}
            height={64}
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
  border-radius: 16px;
  overflow: hidden;
  background: ${color.white};
  display: flex;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const Left = styled.div`
  background-color: ${color.background.bague};
  padding: 40px;
  max-width: 600px;
`

const MediaContainer = styled.div`
  margin: 0 auto;
`

const InfoContainer = styled.div`
  background-color: ${color.white};
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
`

const ItemName = styled.p`
  ${font.lg.subtitle1}
  margin-bottom: 16px;
`

const Right = styled.div`
  padding: 44px 40px;
  width: 440px;
`

const TitleContainer = styled.div`
  ${font.lg.h2};
  color: ${color.subColor.blue};
  display: flex;
  align-items: center;
`
const TitleContent = styled.div`
  ${font.lg.h2};
  color: ${color.subColor.blue};
  margin-left: 16px;
`

const Description = styled.div`
  ${font.lg.body1};
  color: ${color.content.middle};
  margin: 32px 0;
`

const TransactionContainer = styled.div`
  width: 100%;
  margin: 64px 0;
`

const ContentButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 44px;
  width: 100%;
`

const CalenderButton = styled(SimpleButton)`
  width: 100%;
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 96px;
`
