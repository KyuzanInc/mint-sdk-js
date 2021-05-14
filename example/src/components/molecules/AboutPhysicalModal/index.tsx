import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { color, font } from '../../../style'

type Props = {
  isOpen: boolean
  closeModal: () => void
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

export const AboutPhysicalModal: React.VFC<Props> = ({
  closeModal,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Wallet">
      <ModalContainer>
        <Content>
          <ContentTitle>フィジカルアイテムつきとは</ContentTitle>
          <ContentDescription>
            NFT所有者がそれに紐づいた物理アイテムを受け取れることができます。
            NFTを手に入れた後に、所有者は配送先情報を入力することができます。
          </ContentDescription>
          <ContentTitle>送料/配送方法について</ContentTitle>
          <ContentDescription>
            デモのため実際には配送されません。
          </ContentDescription>
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
  ${font.lg.h2};
  margin-bottom: 16px;
`

const ContentDescription = styled.p`
  ${font.lg.body1};
  margin-bottom: 64px;
  line-height: 2;
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 96px;
`