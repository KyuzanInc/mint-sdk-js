import React, { ReactNode, useEffect } from 'react'
import styled from '@emotion/styled'
import { color } from '../style'
import { useAppDispatch } from '../redux/getStore'
import { initialWalletActionCreator, walletSlice } from '../redux/wallet'
import { Header } from './organisms/Header'
import { getSdk } from '../sdk'
import { MintSDK } from '@kyuzan/mint-sdk-js'
import { Dialog } from './organisms/Dialog'
import { Footer } from './organisms/Footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialWalletActionCreator() as any)
    const sdk = getSdk()
    sdk?.onAccountsChange(async () => {
      if (await sdk.isWalletConnect()) {
        const walletInfo = await sdk.getWalletInfo()
        dispatch(
          walletSlice.actions.updateWalletInfo({
            balance: MintSDK.formatEther(walletInfo.balance),
            currencyUnit: walletInfo.unit,
            address: walletInfo.address,
          })
        )
      } else {
        dispatch(walletSlice.actions.updateWalletInfo(undefined))
      }
    })
    sdk?.onDisconnect(async () => {
      dispatch(walletSlice.actions.updateWalletInfo(undefined))
    })
  }, [])
  return (
    <Container>
      <Header />
      <Dialog />
      {children}
      <Footer />
    </Container>
  )
}

export default Layout

const Container = styled.div`
  background-color: ${color.background.white};
  position: relative;
`
