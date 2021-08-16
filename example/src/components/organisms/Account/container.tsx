import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getAccountInfoActionCreator } from '../../../redux/accountInfo'
import { getTokensActionCreator } from '../../../redux/accountTokens'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const router = useRouter()
  const walletAddress = router.query.walletAddress as string
  const dispatch = useAppDispatch()

  const tokens = useAppSelector(
    (state) => state.app.accountTokens.data.tokens[walletAddress]
  )
  const tokensLoading = useAppSelector(
    (state) => state.app.accountTokens.meta.loading[walletAddress]
  )

  const accountInfoLoading = useAppSelector(
    (state) => state.app.accountInfo.meta.loading
  )
  const accountInfo = useAppSelector(
    (state) => state.app.accountInfo.data.accountInfoMap[walletAddress]
  )
  useEffect(() => {
    if (typeof accountInfo === 'undefined') {
      dispatch(getAccountInfoActionCreator({ walletAddress }) as any)
    }

    dispatch(getTokensActionCreator({ walletAddress }) as any)
  }, [walletAddress, accountInfo])
  return (
    <Presentation
      waitingOwnTokens={
        typeof tokensLoading === 'undefined' ? true : tokensLoading
      }
      userWalletAddress={walletAddress}
      ownTokens={tokens ?? []}
      accountDisplayName={accountInfo?.displayName || undefined}
      accountBio={accountInfo?.bio || undefined}
      accountProfileUrl={accountInfo?.avatarImgUrl || undefined}
      accountInstagramAccountName={
        accountInfo?.instagramAccountName || undefined
      }
      accountTwitterAccountName={accountInfo?.twitterAccountName || undefined}
      accountSiteUrl={accountInfo?.homepageUrl || undefined}
      accountLoading={accountInfoLoading}
    />
  )
}
