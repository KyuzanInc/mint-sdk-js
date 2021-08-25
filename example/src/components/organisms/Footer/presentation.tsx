import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { color, curve, font, media, zIndex } from '../../../style'
import { Anchor } from '../../atoms/Anchor'

type Props = {
  termsOfUse?: string
  privacyPolicy?: string
  specifiedCommercialCode?: string
  FAQ?: string
}

export const Presentation: React.VFC<Props> = ({
  termsOfUse,
  privacyPolicy,
  specifiedCommercialCode,
  FAQ,
}) => {
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
        {termsOfUse && <FooterLink href={termsOfUse}>利用規約</FooterLink>}
        {privacyPolicy && (
          <FooterLink href={privacyPolicy}>プライバシーポリシー</FooterLink>
        )}
        {specifiedCommercialCode && (
          <FooterLink href={specifiedCommercialCode}>
            特商法に基づく表記
          </FooterLink>
        )}
        {FAQ && (
          <FooterLink href={FAQ} target="blank">
            このストアに関するお問い合わせ
            <Icon />
          </FooterLink>
        )}
      </FooterInner>
    </FooterContainer>
  )
}

const FooterContainer = styled.nav`
  height: 128px;
  width: 100%;
  /* min-width: 1000px; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  /* box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
  0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
  0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557); */
  z-index: ${zIndex.elevation.ev10};
  color: ${color.content.light};
  ${media.lg`
    padding: 0px 180px;
  `}
  ${media.mdsp`
    min-width:100%;
  `}
`

const FooterInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  ${media.lg`
    max-width: 1040px;
  `}
  ${media.sp`
    justify-content: center;
  `}
`

const FooterLink = styled.a`
  padding: 16px 8px;
  ${font.mont.label};
  color: ${color.content.light};
  align-items: center;
  justify-content: center;
  display: flex;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const Icon = styled.img`
  &:after {
    text-align: center;
    margin-left: 8px;
    margin-bottom: 3px;
    font-family: 'icomoon';
    color: ${color.content.middle};
    content: '\\e904';
    ${curve.button}
  }
`
