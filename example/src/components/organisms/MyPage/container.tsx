import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { getAccountInfoActionCreator } from '../../../redux/accountInfo'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import {
  getBidedActionCreator,
  getOwnItemsActionCreator,
} from '../../../redux/myItems'
import { getShippingInfoActionCreator } from '../../../redux/shippingInfo'
import { withDrawItemActionCreator } from '../../../redux/transaction'
import { connectWalletActionCreator } from '../../../redux/wallet'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const dispatch = useAppDispatch()

  const connectWallet = useCallback(() => {
    dispatch(connectWalletActionCreator() as any)
  }, [])
  const connectingWallet = useAppSelector(
    (state) => state.app.wallet.meta.waitingWalletAction
  )
  const walletInfo = useAppSelector((state) => state.app.wallet.data.walletInfo)

  const bidedItems = useAppSelector((state) => {
    // Auction中のものと、引き出していないものだけ表示
    return state.app.myItems.data.bidedItems.filter(
      (item) =>
        item.endAt! > new Date() ||
        (item.currentBidderAddress === walletInfo?.address &&
          !item.buyerAddress)
    )
  })

  const waitingBidedItems = useAppSelector((state) => {
    return state.app.myItems.meta.bidedItemsLoading
  })

  const ownTokens = useAppSelector((state) => {
    return state.app.myItems.data.ownItems
  })

  const waitingOwnTokens = useAppSelector((state) => {
    return state.app.myItems.meta.ownItemsLoading
  })

  const withdrawingItemId = useAppSelector(
    (state) => state.app.transaction.meta.withdrawingItemId
  )

  const withdrawItem = async (itemId: string) => {
    await dispatch(withDrawItemActionCreator({ itemId }) as any)
    // TODO: おめでとう画面に遷移させる
    window.location.reload()
  }

  const shippingInfo = useAppSelector(
    (state) => state.app.shippingInfo.data.shippingInfo
  )

  const [selectShippingInfoItemId, setSelectShippingInfoItemId] =
    useState<string | undefined>(undefined)

  const showShippingInfo = (itemId: string) => {
    setSelectShippingInfoItemId(itemId)
    dispatch(getShippingInfoActionCreator({ itemId }) as any)
  }

  const hideShippinngInfo = () => {
    setSelectShippingInfoItemId(undefined)
  }

  const router = useRouter()
  const goEditPage = useCallback(() => {
    router.push('/me/edit')
  }, [])
  const accountInfoLoading = useAppSelector(
    (state) => state.app.accountInfo.meta.loading
  )
  const accountInfo = useAppSelector(
    (state) => state.app.accountInfo.data.accountInfo
  )
  useEffect(() => {
    if (typeof walletInfo?.address === 'undefined') {
      return
    }
    dispatch(
      getBidedActionCreator({ bidderAddress: walletInfo.address }) as any
    )
    dispatch(
      getOwnItemsActionCreator({ walletAddress: walletInfo.address }) as any
    )
    dispatch(
      getAccountInfoActionCreator({ walletAddress: walletInfo.address }) as any
    )
  }, [walletInfo?.address])
  return (
    <Presentation
      connectingWallet={connectingWallet}
      onConnectWallet={connectWallet}
      waitingBidedItems={waitingBidedItems}
      waitingOwnTokens={waitingOwnTokens}
      bidedItems={bidedItems}
      handleWithdrawItem={withdrawItem}
      handleHideShippingInfo={hideShippinngInfo}
      showShippingInfo={showShippingInfo}
      userWalletAddress={walletInfo?.address}
      withdrawingItemId={withdrawingItemId}
      ownTokens={ownTokens}
      showShippingInfoModal={typeof selectShippingInfoItemId !== 'undefined'}
      shippingInfo={
        typeof selectShippingInfoItemId !== 'undefined'
          ? shippingInfo[selectShippingInfoItemId]
          : undefined
      }
      accountDisplayName={accountInfo.displayName || undefined}
      accountBio={accountInfo.bio || undefined}
      accountProfileUrl={accountInfo.avatarImgUrl || undefined}
      accountInstagramAccountName={
        accountInfo.instagramAccountName || undefined
      }
      accountTwitterAccountName={accountInfo.twitterAccountName || undefined}
      accountSiteUrl={accountInfo.homepageUrl || undefined}
      accountLoading={accountInfoLoading}
      accountOnClickEdit={goEditPage}
    />
  )
}
