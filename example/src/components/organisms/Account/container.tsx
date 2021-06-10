import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getAccountInfoActionCreator } from '../../../redux/accountInfo'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { getOwnItemsActionCreator } from '../../../redux/myItems'

import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const router = useRouter()
  const walletAddress = router.query.walletAddress as string
  const dispatch = useAppDispatch()

  const ownTokens = useAppSelector((state) => {
    return state.app.myItems.data.ownItems
  })

  const waitingOwnTokens = useAppSelector((state) => {
    return state.app.myItems.meta.ownItemsLoading
  })

  const accountInfoLoading = useAppSelector(
    (state) => state.app.accountInfo.meta.loading
  )
  const accountInfo = useAppSelector(
    (state) => state.app.accountInfo.data.accountInfo
  )
  useEffect(() => {
    dispatch(getOwnItemsActionCreator({ walletAddress }) as any)
    dispatch(getAccountInfoActionCreator({ walletAddress }) as any)
  }, [walletAddress])

  return (
    <Presentation
      waitingOwnTokens={waitingOwnTokens}
      userWalletAddress={walletAddress}
      ownTokens={ownTokens}
      accountDisplayName={accountInfo.displayName || undefined}
      accountBio={accountInfo.bio || undefined}
      accountProfileUrl={accountInfo.avatarImgUrl || undefined}
      accountInstagramAccountName={
        accountInfo.instagramAccountName || undefined
      }
      accountTwitterAccountName={accountInfo.twitterAccountName || undefined}
      accountSiteUrl={accountInfo.homepageUrl || undefined}
      accountLoading={accountInfoLoading}
    />
  )
}
