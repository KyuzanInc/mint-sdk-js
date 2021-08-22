import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import { color } from '../../../style'
import { useMedia } from '../../../util/useMedia'
import { CloseButton } from '../../atoms/CloseButton'

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
  const isMobile = useMedia().isMobile
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="AboutPhysicalModal"
      ariaHideApp={false}
    >
      <ModalContainer>
        <Content>
          <Image
            src={'/images/whatIsPhysicalItem.png'}
            layout={'responsive'}
            width={784}
            height={443}
          />
        </Content>
        <CloseButton onClick={closeModal} isMobile={isMobile} />
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
