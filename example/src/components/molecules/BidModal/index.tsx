import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { color, font } from '../../../style'
import { PrimaryLoadingButton as ButtonBase } from '../../atoms/LoadingBotton'
import { Chip } from '../../atoms/Chip'
import { MediaContent } from '../../atoms/MediaContent'
import { StatusDetail } from '../Detail'
import { TransactionStatus } from '../../atoms/TransactionStatus'
import { SimpleButton } from '../../atoms/SimpleButton'
import { format, subMinutes } from 'date-fns'
import { Item } from '@kyuzan/mint-sdk-js'

type Props = {
  item: Item | undefined
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
  status?: string
  bidHash?: string
}

type BidStatusProps = {
  minBidPrice: number | undefined
  walletBalance: string | undefined
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

export const BidModal: React.VFC<Props> = ({
  closeModal,
  isOpen,
  loading,
  minBidPrice,
  walletBalance,
  unit,
  bidPrice,
  onChangeInput,
  doBid,
  media,
  endAt,
  price,
  item,
  isValidationError,
  errorText,
  status,
  bidHash,
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
              <ItemName>{item?.name ?? ''}</ItemName>
              <StatusDetail endAt={endAt} price={price} unit={unit} />
            </InfoContainer>
          </Left>
          <Right>
            {status === 'bid' && (
              <BidStatus
                loading={loading}
                minBidPrice={minBidPrice}
                walletBalance={walletBalance}
                unit={unit}
                bidPrice={bidPrice}
                onChangeInput={onChangeInput}
                doBid={doBid}
                isValidationError={isValidationError}
                errorText={errorText}
              />
            )}
            {status === 'success' && (
              <SuccessStatus item={item} endAt={endAt} bidHash={bidHash} />
            )}
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

const BidStatus: React.VFC<BidStatusProps> = ({
  loading,
  minBidPrice,
  walletBalance,
  unit,
  bidPrice,
  onChangeInput,
  doBid,
  isValidationError,
  errorText,
}) => {
  return (
    <>
      <ContentTitle>Place a Bid </ContentTitle>
      <PriceRangeContainer>
        <PriceRangeItem>
          <PriceRangeTitle>MIN</PriceRangeTitle>
          <PriceRangeSubTitle>You must bid at least</PriceRangeSubTitle>
          <PriceRangePrice>
            {minBidPrice}
            {unit}
          </PriceRangePrice>
        </PriceRangeItem>
        <ImageContainer>
          <Image
            src={'/images/arrows.svg'}
            width={32}
            height={16}
            layout={'fixed'}
          />
        </ImageContainer>
        <PriceRangeItem>
          <PriceRangeTitle>MAX</PriceRangeTitle>
          <PriceRangeSubTitle>Your Balance</PriceRangeSubTitle>
          <PriceRangePrice>
            {walletBalance}
            {unit}
          </PriceRangePrice>
        </PriceRangeItem>
      </PriceRangeContainer>
      <InputPriceContainer>
        <InputPrice type={'number'} value={bidPrice} onChange={onChangeInput} />
        <InputUnit>{unit}</InputUnit>
      </InputPriceContainer>
      <ContentButtonContainer>
        {isValidationError && (
          <BidButton
            label={errorText ?? ''}
            isLoading={false}
            onClick={doBid}
            disabled={true}
          />
        )}
        {!isValidationError && (
          <BidButton
            label={loading ? '取引処理中です' : 'PLACE A BID'}
            isLoading={loading}
            onClick={doBid}
          />
        )}
      </ContentButtonContainer>
    </>
  )
}

const SuccessStatus: React.VFC<any> = ({ item, endAt, bidHash }) => {
  const title = `${item?.name ?? ''}:オークション終了予定時刻`
  const before = subMinutes(endAt, 15)
  const formattedBefore = format(before, "yyyyMMd'T'HHmmss")
  const formattedEndAt = format(endAt, "yyyyMMd'T'HHmmss")
  const calendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${formattedBefore}/${formattedEndAt}`
  const onClick = useCallback(() => {
    // donothing
  }, [])
  return (
    <>
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
        <TransactionStatus item={item} hash={bidHash} />
      </TransactionContainer>
      <ContentButtonContainer>
        <AnchorLink href={calendarUrl} target="blank">
          <CalenderButton
            iconPath={'/images/icons/calendar.svg'}
            label={'終了時刻をカレンダーに登録する'}
            onClick={onClick}
          />
        </AnchorLink>
      </ContentButtonContainer>
    </>
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
  padding: 40px;
  width: 440px;
`

const ContentTitle = styled.p`
  ${font.lg.h2};
`

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 64px;
`

const PriceRangeItem = styled.div`
  min-width: 110px;
`

const PriceRangeTitle = styled.div`
  ${font.lg.label}
`

const PriceRangeSubTitle = styled.div`
  ${font.lg.overline}
  margin-top: 8px;
`
const ImageContainer = styled.div`
  margin: 26px 24px;
`

const PriceRangePrice = styled(Chip)`
  margin-top: 8px;
`

const InputPriceContainer = styled.div`
  width: 100%;
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const InputPrice = styled.input`
  ${font.lg.h2}
  width: 100%;
  border: 4px solid ${color.primary};
  box-sizing: border-box;
  border-radius: 34px;
  flex-grow: 2;
  text-align: center;
`

const InputUnit = styled.span`
  color: ${color.primary};
  ${font.lg.h2}
  margin-left: 4px;
`

const ContentButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 96px;
`

const BidButton = styled(ButtonBase)`
  width: 100%;
  margin-top: 40px;
  line-height: 1.5;
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
const AnchorLink = styled.a`
  text-decoration: none;
`

const CalenderButton = styled(SimpleButton)`
  width: 100%;
`
