import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'

type Props = {
  label: string
  href: string
}

export const ExternalLink: React.FC<Props> = ({ label, href }) => {
  return (
    <Secondary href={href} target="blank">
      {label}
      <Icon src={'/images/external-link.svg'} />
    </Secondary>
  )
}

const LinkBase = styled.a`
  cursor: pointer;
  ${font.mont.article1}
  height: 33px;
  line-height: 33px;
  border-radius: 22px;
  color: ${color.content.dark};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
  border: 1px solid ${color.content.dark};
  text-decoration: none;
`

const Icon = styled.img`
  text-align: center;
  margin-left: 4px;
  margin-bottom: 3px;
`

const Secondary = styled(LinkBase)`
  background-color: ${color.white};
  color: ${color.content.dark};
`
