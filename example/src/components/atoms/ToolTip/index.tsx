import React, { useCallback, useState } from 'react'
import Tippy from '@tippyjs/react/headless' // different import path!
import { isDesktop } from 'react-device-detect'
import styled from '@emotion/styled'
import { color, font } from '../../../style'

type Props = {
  title?: string
  description?: string
}

export const ToolTip: React.FC<Props> = ({ title, description, children }) => {
  const [visible, setVisible] = useState(true)
  const show = useCallback(() => setVisible(true), [])
  const hide = useCallback(() => setVisible(false), [])

  return isDesktop ? (
    <Tippy
      placement={'top'}
      render={(attrs) => (
        <Container tabIndex={-1} {...attrs}>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
        </Container>
      )}
    >
      <span>{children}</span>
    </Tippy>
  ) : (
    <Tippy
      visible={visible}
      onClickOutside={hide}
      render={(attrs) => (
        <Container tabIndex={-1} {...attrs}>
          {title && <Title>{title}</Title>}
          {description && <Description>{description}</Description>}
        </Container>
      )}
    >
      <span onClick={visible ? hide : show}>{children}</span>
    </Tippy>
  )
}

const Container = styled.div`
  background-color: ${color.background.dark};
  border-radius: 12px;
  padding: 8px 16px;
  max-width: 245px;
`

const Title = styled.p`
  color: ${color.white};
  ${font.lg.subtitle1}
  margin-bottom: 4px;
`

const Description = styled.p`
  color: ${color.white};
  ${font.lg.caption}
`
