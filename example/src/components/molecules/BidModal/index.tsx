import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { color, font } from '../../../style'
import { PrimaryButton as ButtonBase } from '../../atoms/Botton'
import { Chip } from '../../atoms/Chip'

type Props = {
  minBidPrice: number | undefined
  walletBalance: string | undefined
  isOpen: boolean
  closeModal: () => void
  loading: boolean
  unit: string
  bidPrice: string
  onChangeInput: React.ChangeEventHandler<HTMLInputElement>
  doBid: () => void
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
}) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Wallet">
      <ModalContainer>
        <Content>
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
            <Image
              src={'/images/arrows.svg'}
              width={32}
              height={16}
              layout={'fixed'}
            />
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
            <InputPrice
              type={'number'}
              value={bidPrice}
              onChange={onChangeInput}
            />
            <InputUnit>{unit}</InputUnit>
          </InputPriceContainer>
          <ContentButtonContainer>
            <BidButton
              label={loading ? '取引処理中です' : 'PLACE A BID'}
              isLoading={loading}
              onClick={doBid}
            />
          </ContentButtonContainer>
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
  width: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: ${color.white};
  padding: 40px;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const ContentTitle = styled.p`
  ${font.lg.h2};
`

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 64px;
`

const PriceRangeItem = styled.div``

const PriceRangeTitle = styled.div`
  ${font.lg.label}
`

const PriceRangeSubTitle = styled.div`
  ${font.lg.overline}
  margin-top: 8px;
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
`
