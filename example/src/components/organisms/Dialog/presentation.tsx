import styled from '@emotion/styled'
import React from 'react'
import Modal, { Styles } from 'react-modal'
import { color, font } from '../../../style'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'

type Props = {
  isOpen: boolean
  handleConfirm: () => void
  confirmText?: string
  title: string
  content: React.ReactNode
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

export const Presentation: React.VFC<Props> = ({
  title,
  content,
  handleConfirm,
  isOpen,
  confirmText,
}) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel={'Dialog'}>
      <Wrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <ButtonsContainer>
          <ConfirmButton
            onClick={handleConfirm}
            isLoading={false}
            label={confirmText ?? 'OK'}
          />
        </ButtonsContainer>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  padding: 32px 16px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const Title = styled.div`
  ${font.lg.h4};
  margin-bottom: 16px;
  text-align: center;
  max-width: 302px;
`

const Content = styled.div`
  ${font.lg.body1};
  text-align: center;
  max-width: 261px;
  line-height: 1.5;
`

const ButtonsContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ConfirmButton = styled(PrimaryLoadingButton)``
