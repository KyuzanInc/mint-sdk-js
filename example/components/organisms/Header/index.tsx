import React, { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from '@emotion/styled'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Anchor } from '../../atoms/Anchor'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { PrimaryButton } from '../../atoms/Botton'
import { connectWalletActionCreator } from '../../../redux/wallet'
import { font } from '../../../style/idnex'

export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const walletInfo = useAppSelector((state) => {
    return state.app.wallet.data.walletInfo
  })
  const waitingWallet = useAppSelector((state) => {
    return state.app.wallet.meta.waitingWalletAction
  })
  const connectWallet = useCallback(() => {
    dispatch(connectWalletActionCreator() as any)
  }, [])

  const isLogin = typeof walletInfo !== 'undefined'
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
              <WalletInfoContainer>
                <Jazzicon
                  diameter={44}
                  seed={jsNumberForAddress(walletInfo?.address)}
                />
                <WalletDetail>
                  <WalletBalance>
                    {walletInfo?.balance} {walletInfo?.currencyUnit}
                  </WalletBalance>
                  <WalletAddress>
                    {walletInfo?.address.slice(0, 8)}
                  </WalletAddress>
                </WalletDetail>
              </WalletInfoContainer>
            ) : (
              <PrimaryButton
                label={'CONNECT'}
                isLoading={waitingWallet}
                onClick={connectWallet}
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
