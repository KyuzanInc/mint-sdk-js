import styled from '@emotion/styled'
import React from 'react'
import { color, curve, font, zIndex } from '../../../style'

type Props = {
  label: string
  href: string
}

export const SecondaryButton: React.FC<Props> = ({ label, href }) => {
  return (
    <Secondary href={href} target="blank">
      {label}
      <Icon/>
    </Secondary>
  )
}

const LinkBase = styled.a`
  cursor: pointer;
  ${font.mont.subtitle2}
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

const Icon = styled.span`
  &:after{
    text-align: center;
    margin-left: 4px;
    margin-bottom: 3px;
    font-family:'icomoon';
    color: ${color.background.dark};
    content: '\\e904';
    ${curve.button}
  }
`

const Secondary = styled(LinkBase)`
  position:relative;
  background-color: transparent;
  color: ${color.content.dark};
  overflow: hidden;
  ${curve.button}
  z-index:${zIndex.base};
  &:after{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    display: block;
    width: 120%;
    height: 26rem;
    background: ${color.background.dark};
    border-radius: 50%;
    z-index:${zIndex.effect};
    ${curve.ripple}
  }
  &:hover{
    color: ${color.white};
    ${Icon}:after{
      color: ${color.white};
    }
    &:after{
      transform: translate(-50%, -50%) scale(1);
    }
  }
`
