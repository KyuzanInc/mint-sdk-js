/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { getAccountInfoActionCreator } from '../../../redux/myAccountInfo'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import {
  getBidedActionCreator,
  getOwnTokensActionCreator,
} from '../../../redux/myItems'
import { getShippingInfoActionCreator } from '../../../redux/shippingInfo'
import { withDrawItemActionCreator } from '../../../redux/transaction'
import { connectWalletActionCreator } from '../../../redux/wallet'
import { Presentation } from './presentation'
import { dialogSlice } from '../../../redux/dialog'
import { getNetworkIdLabel } from '../../../util/getNetworkIdLabel'

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
    return state.app.myItems.data.bidedItems.filter(
      (i) => i.status !== 'minted'
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

  const connectedNetworkId = useAppSelector(
    (state) => state.app.wallet.data.connectedNetwork
  )

  const bidHash = useAppSelector(
    (state: { app: { transaction: { meta: { bidHash: string } } } }) =>
      state.app.transaction.meta.bidHash
  )
  const withdrawItem = async (itemId: string, inJapan: boolean) => {
    const item = bidedItems.find((i) => i.item.id === itemId)
    if (!item) throw new Error('Something Wrong')

    if (
      item.item.paymentMethodData.paymentMethod !==
      'ethereum-contract-erc721-shop-auction'
    )
      return

    if (
      connectedNetworkId !==
      item.item.paymentMethodData.contractDataERC721Shop.networkId
    ) {
      dispatch(
        dialogSlice.actions.showDialog({
          title: 'ネットワークを変更してください',
          content: `${getNetworkIdLabel(
            item.item.paymentMethodData.contractDataERC721Shop.networkId
          )}に接続してください。`,
        })
      )
      return
    }
    await dispatch(
      withDrawItemActionCreator({ itemId: item.item.id, inJapan }) as any
    )
    if (bidHash) {
      router.push(`/items/success`)
    }
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
    (state) => state.app.myAccountInfo.meta.loading
  )
  const accountInfo = useAppSelector(
    (state) => state.app.myAccountInfo.data.accountInfo
  )

  const updateItems = useCallback(() => {
    if (typeof walletInfo?.address === 'undefined') {
      return
    }
    dispatch(
      getBidedActionCreator({ bidderAddress: walletInfo.address }) as any
    )
    dispatch(
      getOwnTokensActionCreator({ walletAddress: walletInfo.address }) as any
    )
    dispatch(
      getAccountInfoActionCreator({ walletAddress: walletInfo.address }) as any
    )
  }, [walletInfo?.address])

  useEffect(() => {
    updateItems()
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
      onComplete={updateItems}
    />
  )
}
