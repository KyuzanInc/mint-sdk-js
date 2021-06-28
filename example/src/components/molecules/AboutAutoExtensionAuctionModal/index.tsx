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

export const AboutAutoExtensionAuctionModal: React.VFC<Props> = ({
  closeModal,
  isOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="AboutPhysicalModal"
      ariaHideApp={false}
    >
      <ModalContainer>
        <Content>
          <Title>自動延長オークションとは</Title>
          <Description>
            オークション終了5分以内に最高値を更新する入札があった場合は、オークションの終了時間が5分延長されます。
          </Description>
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
  max-width: 640px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: ${color.white};
  padding: 40px;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const Title = styled.p`
  ${font.lg.subtitle1}
  margin-bottom: 24px;
`

const Description = styled.p`
  ${font.lg.body1}
  line-height: 1.6;
`

const CloseButton = styled.div`
  cursor: pointer;
  margin-top: 96px;
`
