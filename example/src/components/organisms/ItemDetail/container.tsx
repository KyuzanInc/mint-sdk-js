import React, { useCallback, useEffect, useState } from 'react'
import { dialogSlice } from '../../../redux/dialog'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { getHistoryActionCreator } from '../../../redux/history'
import { getItemActionCreator } from '../../../redux/item'
import {
  bidActionCreator,
  buyFixedPriceItemActionCreator,
  transactionSlice,
} from '../../../redux/transaction'
import {
  connectWalletActionCreator,
  initialWalletActionCreator,
} from '../../../redux/wallet'
import { getNetworkIdLabel } from '../../../util/getNetworkIdLabel'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const dispatch = useAppDispatch()
  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const endDate = item?.endAt ?? new Date()
  const auctionIsEnded = endDate < new Date()
  const startDate = item?.startAt ?? new Date()
  const auctionIsNotStarted = new Date() < startDate
  const auctionIsOutOfDate = auctionIsEnded || auctionIsNotStarted

  const waitingItem = useAppSelector((state) => {
    return state.app.item.meta.waitingItemAction
  })

  const walletIsConnect = useAppSelector((state) => {
    return typeof state.app.wallet.data.walletInfo?.address !== 'undefined'
  })
  const walletInfo = useAppSelector((state) => {
    return state.app.wallet.data.walletInfo
  })
  const connectedNetworkId = useAppSelector((state) => {
    return state.app.wallet.data.connectedNetwork
  })
  const waitingWallet = useAppSelector((state) => {
    return state.app.wallet.meta.waitingWalletAction
  })

  const connectWallet = useCallback(async () => {
    await dispatch(connectWalletActionCreator() as any)
    closeWalletModal()
  }, [])

  const updateInfo = useCallback(async () => {
    await dispatch(getItemActionCreator(item?.itemId ?? '') as any)
    await dispatch(getHistoryActionCreator(item?.itemId ?? '') as any)
    await dispatch(initialWalletActionCreator() as any)
    setBidPrice('')
  }, [])

  const [bidPrice, setBidPrice] = useState('')
  const [isError, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (bidPrice < (item?.minBidPrice ?? bidPrice)) {
      setError(true)
      setErrorText(`Your bid must be at least ${item?.minBidPrice} ETH`)
    } else if ((walletInfo?.balance ?? bidPrice) < bidPrice) {
      setError(true)
      setErrorText(`You don’t have enough ETH`)
    } else {
      setError(false)
      setErrorText('')
    }
  }, [bidPrice, walletInfo?.balance, item?.minBidPrice])
  const onChangeInput = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setBidPrice(e.target.value)
    },
    []
  )
  const doBid = useCallback(async () => {
    if (!item) return
    dispatch(
      bidActionCreator({
        itemId: item.itemId,
        bidPrice: parseFloat(bidPrice),
      }) as any
    )
  }, [item, bidPrice])

  const doBuy = useCallback(
    async (inJapan: boolean) => {
      if (!item) return
      dispatch(
        buyFixedPriceItemActionCreator({
          itemId: item.itemId,
          inJapan,
        }) as any
      )
    },
    [item]
  )

  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const closeWalletModal = useCallback(() => setWalletModalIsOpen(false), [])
  const openWalletModal = useCallback(() => setWalletModalIsOpen(true), [])

  const bidding = useAppSelector((state) => state.app.transaction.meta.bidding)
  const status = useAppSelector((state) => state.app.transaction.meta.status)
  const bidHash = useAppSelector((state) => state.app.transaction.meta.bidHash)
  const [bidModalIsOpen, setBidModalIsOpen] = useState(false)
  const closeBidModal = useCallback(() => {
    setBidModalIsOpen(false)
    updateInfo()
    dispatch(transactionSlice.actions.changeStatus('bid'))
  }, [status])
  const openBidModal = useCallback(() => setBidModalIsOpen(true), [])

  const [aboutPhysicalModalIsOpen, setAboutPhysicalModalIsOpen] =
    useState(false)
  const closePhysicalModal = useCallback(
    () => setAboutPhysicalModalIsOpen(false),
    []
  )
  const openPhysicalModal = useCallback(
    () => setAboutPhysicalModalIsOpen(true),
    []
  )

  const [
    aboutAutoExtensionAuctionModalIsOpen,
    setAboutAutoExtensionAuctionModalIsOpen,
  ] = useState(false)
  const closeAutoExtensionModal = useCallback(
    () => setAboutAutoExtensionAuctionModalIsOpen(false),
    []
  )
  const openAutoExtensionModal = useCallback(
    () => setAboutAutoExtensionAuctionModalIsOpen(true),
    []
  )

  const handleDoBid = useCallback(() => {
    if (auctionIsOutOfDate) {
      return
    }

    if (!walletIsConnect) {
      openWalletModal()
      return
    }

    if (connectedNetworkId !== item?.networkId) {
      dispatch(
        dialogSlice.actions.showDialog({
          title: 'ネットワークを変更してください',
          content: `${getNetworkIdLabel(
            item?.networkId ?? 4
          )}に接続してください。`,
        })
      )
      return
    }

    openBidModal()
  }, [item, walletIsConnect, auctionIsOutOfDate, connectedNetworkId])

  return (
    <Presentation
      loading={waitingItem}
      item={item}
      aboutPhysicalModalIsOpen={aboutPhysicalModalIsOpen}
      handleClosePhysicalModal={closePhysicalModal}
      handleOpenPhysicalModal={openPhysicalModal}
      aboutAutoExtensionAuctionModalIsOpen={
        aboutAutoExtensionAuctionModalIsOpen
      }
      handleOpenAutoExtensionModal={openAutoExtensionModal}
      handleCloseAutoExtensionModal={closeAutoExtensionModal}
      saleIsOutOfDate={auctionIsOutOfDate}
      connectingWallet={waitingWallet}
      connectWalletModalIsOpen={walletModalIsOpen}
      handleCloseConnectWalletModal={closeWalletModal}
      handleConnectWallet={connectWallet}
      userWalletBalance={walletInfo?.balance}
      bidModalOpen={bidModalIsOpen}
      handleOpenSaleActionModal={handleDoBid}
      handleCloseBidModal={closeBidModal}
      handleChangeInputPrice={onChangeInput}
      bidding={bidding}
      bidPrice={bidPrice}
      handleDoBid={doBid}
      handleDoBuy={doBuy}
      isValidationError={isError}
      errorText={errorText}
      status={status}
      bidHash={bidHash}
    />
  )
}
