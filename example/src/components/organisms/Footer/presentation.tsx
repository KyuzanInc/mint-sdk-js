import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { color, font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'

export const Presentation: React.VFC = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <Link passHref href={'/'}>
          <Anchor>
            <Image
              src={'/images/logo-gray.svg'}
              width={89.53}
              height={30}
              layout={'fixed'}
            />
          </Anchor>
        </Link>
        <FooterLink href={''}>利用規約</FooterLink>
        <FooterLink href={''}>プライバシーポリシー</FooterLink>
        <FooterLink href={''}>特商法に基づく表記</FooterLink>
        <FooterLink href={''} target="blank">
          このストアに関するお問い合わせ
          <Icon src={'/images/external-link-gray.svg'} />
        </FooterLink>
      </FooterInner>
    </FooterContainer>
  )
}

const FooterContainer = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 128px;
  padding: 0px 180px;
  width: 100%;
  min-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  z-index: 1;
  color: ${color.content.light};
`

const FooterInner = styled.div`
  max-width: 980px;
  width: 100%;
  display: flex;
  align-items: center;
`

const FooterLink = styled.a`
  padding: 18px 8px;
  ${font.lg.label};
  color: ${color.content.light};
  align-items: center;
  justify-content: center;
  display: flex;
  text-decoration: none;
`
const Icon = styled.img`
  margin-left: 8px;
`
