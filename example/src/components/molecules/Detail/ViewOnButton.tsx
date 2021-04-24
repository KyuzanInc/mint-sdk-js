import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'

type Props = {
  label: string
  onClick: () => any
}

export const ViewOnButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <Secondary onClick={onClick}>
      View on {label}
      <Icon src={'/images/external-link.svg'} />
    </Secondary>
  )
}

const ButtonBase = styled.div`
  cursor: pointer;
  ${font.lg.article1}
  height: 33px;
  border: 2px solid ${color.content.dark};
  border-radius: 22px;
  color: ${color.content.dark};
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px 17px;
  margin-right: 10px;
  width: max-content;
  white-space: nowrap;
`

const Icon = styled.img`
  text-align: center;
  margin-left: 4px;
  margin-bottom: 3px;
`

const Secondary = styled(ButtonBase)`
  background-color: ${color.white};
  color: ${color.content.dark}
  margin: 32px 0px;
`
