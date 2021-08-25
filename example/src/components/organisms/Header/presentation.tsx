import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { color, curve, font, media, zIndex } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import { DefaultAvatarIcon } from '../../atoms/DefaultAvatarIcon'
import { PrimaryButton } from '../../atoms/PrimaryButton'
import { ClipBoard } from '../../atoms/Clipboard'
import { useMedia } from '../../../util/useMedia'

type Props = {
  loading: boolean
  isLogin: boolean
  onClickConnectWallet: () => void
  connectWalletLoading: boolean
  accountAvatarImgUrl: string | undefined
  walletAddress: string | undefined
  walletBalance: string | undefined
}

export const Presentation: React.VFC<Props> = ({
  isLogin,
  onClickConnectWallet,
  connectWalletLoading,
  walletAddress,
  walletBalance,
  accountAvatarImgUrl,
  loading,
}) => {
  const isMobile = useMedia().isMobile
  return (
    <HeaderContainer>
      <HeaderInner>
        <Left>
          <Link passHref href={'/'}>
            <Anchor>
              <Image
                src={'/images/logo.svg'}
                width={!isMobile ? 89.53 : 55}
                height={!isMobile ? 30 : 22.8}
                layout={'fixed'}
              />
            </Anchor>
          </Link>
        </Left>
        <Right>
          <Link passHref href={'/'}>
            <Anchor>Market</Anchor>
          </Link>
          <WalletSection>
            {isLogin ? (
              <Link passHref href={'/me'}>
                <WalletAnchor>
                  <WalletInfoContainer>
                    {accountAvatarImgUrl ? (
                      <AvatarContainer>
                        <AvatarImage src={accountAvatarImgUrl} />
                      </AvatarContainer>
                    ) : (
                      <DefaultAvatarIcon name={walletAddress ?? ''} size={44} />
                    )}
                    <WalletDetail>
                      <WalletBalance>{walletBalance}</WalletBalance>
                      <WalletAddress>
                        {walletAddress?.slice(0, 8)}
                      </WalletAddress>
                    </WalletDetail>
                  </WalletInfoContainer>
                  <HeaderClipBoard text={walletAddress} />
                </WalletAnchor>
              </Link>
            ) : loading ? (
              <LoadingContainer>
                <LoadingLeft>
                  <Skeleton circle={true} height={44} width={44} />
                </LoadingLeft>
                <WalletDetail>
                  <WalletBalance>
                    <Skeleton width={40} />
                  </WalletBalance>
                  <WalletAddress>
                    <Skeleton width={10} />
                  </WalletAddress>
                </WalletDetail>
              </LoadingContainer>
            ) : (
              <PrimaryButton
                label={'接続する'}
                isLoading={connectWalletLoading}
                onClick={onClickConnectWallet}
              />
            )}
          </WalletSection>
        </Right>
      </HeaderInner>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.nav`
  padding: 0 72px;
  position: fixed;
  left: 0;
  top: 0;
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color.background.white};
  z-index: ${zIndex.elevation.ev10};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  ${media.mdsp`
    padding:0 16px;
  `}
`

const HeaderInner = styled.div`
  /* max-width: 980px; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  opacity: 1;
  ${curve.button}
  &:hover {
    opacity: 0.82;
  }
  &:active {
    opacity: 1;
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const WalletAnchor = styled(Anchor)`
  display: inline-block;
  position: relative;
`
const HeaderClipBoard = styled(ClipBoard)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const WalletSection = styled.div`
  margin-left: 32px;
  ${media.sp`
    margin-left: 16px;
  `}
`

const WalletInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  opacity: 1;
  ${curve.button}
  &:hover {
    opacity: 0.82;
  }
  &:active {
    opacity: 1;
  }
`

const WalletDetail = styled.div`
  margin-left: 8px;
`

const WalletBalance = styled.div`
  ${font.mont.subtitle1}
`

const WalletAddress = styled.div`
  ${font.mont.caption}
  display: flex;
  align-items: center;
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const LoadingLeft = styled.div``

const AvatarImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const AvatarContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
`
