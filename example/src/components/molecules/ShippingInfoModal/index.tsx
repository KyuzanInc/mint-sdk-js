import styled from '@emotion/styled'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { color, font } from '../../../style'

type Props = {
  isOpen: boolean
  closeModal: () => void
  shippingInfo:
    | {
        name: string
        postalCode: string
        prefecture: string
        city: string
        address1: string
        address2: string
        tel: string
        email: string
      }
    | undefined
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

export const ShippingInfoModal: React.VFC<Props> = ({
  closeModal,
  isOpen,
  shippingInfo,
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
          <ContentTitle>発送先情報</ContentTitle>
          {typeof shippingInfo === 'undefined' ? (
            <Skeleton width={400} />
          ) : (
            <>
              <Label>氏名</Label>
              <ContentDescription>{shippingInfo.name}</ContentDescription>
              <Label>郵便番号</Label>
              <ContentDescription>
                〒{shippingInfo.postalCode}
              </ContentDescription>
              <Label>都道府県</Label>
              <ContentDescription>{shippingInfo.prefecture}</ContentDescription>
              <Label>市区町村</Label>
              <ContentDescription>{shippingInfo.city}</ContentDescription>
              <Label>町名・番地</Label>
              <ContentDescription>{shippingInfo.address1}</ContentDescription>
              <Label>建物名・部屋番号</Label>
              <ContentDescription>{shippingInfo.address2}</ContentDescription>
              <Label>email</Label>
              <ContentDescription>{shippingInfo.email}</ContentDescription>
              <Label>電話番号</Label>
              <ContentDescription>{shippingInfo.tel}</ContentDescription>
            </>
          )}
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
  width: 640px;
  border-radius: 16px;
  overflow: hidden;
  background: ${color.white};
  padding: 40px;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const ContentTitle = styled.p`
  ${font.mont.h2};
  margin-bottom: 16px;
`

const Label = styled.div`
  ${font.mont.subtitle2};
`

const ContentDescription = styled.p`
  ${font.mont.body1};
  line-height: 2;
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 96px;
`
