import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import { DefaultAvatarIcon } from '../../atoms/DefaultAvatarIcon'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'

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
  return (
    <HeaderContainer>
      <HeaderInner>
        <Left>
          <Link passHref href={'/'}>
            <Anchor>
              <Image
                src={'/images/logo.svg'}
                width={89.53}
                height={30}
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
                <Anchor>
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
                </Anchor>
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
              <PrimaryLoadingButton
                label={'CONNECT'}
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
  position: fixed;
  left: 0;
  top: 0;
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  z-index: 1;
`

const HeaderInner = styled.div`
  max-width: 980px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div``

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const WalletSection = styled.div`
  margin-left: 40px;
`

const WalletInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const WalletDetail = styled.div`
  margin-left: 8px;
`

const WalletBalance = styled.div`
  ${font.lg.subtitle1}
`

const WalletAddress = styled.div`
  ${font.lg.caption}
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
