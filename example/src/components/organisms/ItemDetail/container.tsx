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
import router from 'next/router'
import { CountdownTimeDelta } from 'react-countdown'

const WITHIN_TIME = 300000 //5 minutes
const EACH_TIME = 30000 // 30 seconds

export const Container: React.VFC = () => {
  const dispatch = useAppDispatch()

  const itemDetail = useAppSelector((state) => {
    return state.app.item.data
  })

  const item = itemDetail?.itemDetail

  const endDate = item ? new Date(item.endAt) : new Date()
  const auctionIsEnded = endDate < new Date()
  const startDate = item ? new Date(item.startAt) : new Date()
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
    await dispatch(getItemActionCreator(item?.id ?? '') as any)
    await dispatch(getHistoryActionCreator(item?.id ?? '') as any)
    await dispatch(initialWalletActionCreator() as any)
    setBidPrice('')
  }, [])

  const [bidPrice, setBidPrice] = useState(`0.0`)
  const [isError, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const onTick = useCallback((calcTimeDelta: CountdownTimeDelta) => {
    // within 5 minutes
    if (calcTimeDelta.total < WITHIN_TIME) {
      if (calcTimeDelta.total % EACH_TIME === 0) {
        updateInfo()
      }
    }
  }, [])

  useEffect(() => {
    // TODO
    const balance = walletInfo?.balance
      ? parseFloat(walletInfo.balance)
      : parseFloat(bidPrice)
    if (balance < parseFloat(bidPrice)) {
      setError(true)
      setErrorText(`お手持ちの金額を超えています`)
    } else {
      setError(false)
      setErrorText('')
    }
  }, [bidPrice, walletInfo?.balance])
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
        itemId: item.id,
        bidPrice: parseFloat(bidPrice),
      }) as any
    )
  }, [item, bidPrice])

  const doBuy = useCallback(
    async (inJapan: boolean) => {
      if (!item) return
      await dispatch(
        buyFixedPriceItemActionCreator({
          itemId: item.id,
          inJapan,
        }) as any
      )

      if (bidHash) {
        router.push(`/items/success`)
      }
    },
    [item]
  )

  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const closeWalletModal = useCallback(() => setWalletModalIsOpen(false), [])
  const openWalletModal = useCallback(() => setWalletModalIsOpen(true), [])

  const bidding = useAppSelector((state) => state.app.transaction.meta.bidding)
  const status = useAppSelector((state) => state.app.transaction.meta.status)
  const bidHash = useAppSelector((state) => state.app.transaction.meta.bidHash)
  const [actionModalIsOpen, setActionModalIsOpen] = useState(false)
  const closeActionModal = useCallback(() => {
    setActionModalIsOpen(false)
    updateInfo()
    dispatch(transactionSlice.actions.changeStatus('bid'))
  }, [status])
  const openBidModal = useCallback(() => setActionModalIsOpen(true), [])

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

    // TODO
    if (connectedNetworkId !== 31337) {
      dispatch(
        dialogSlice.actions.showDialog({
          title: 'ネットワークを変更してください',
          content: `${getNetworkIdLabel(31337 ?? 4)}に接続してください。`,
        })
      )
      return
    }

    openBidModal()
  }, [item, walletIsConnect, auctionIsOutOfDate, connectedNetworkId])

  const [bidSuccessModalIsOpen, setBidSuccessModalIsOpen] = useState(false)
  const closeBidSuccessModal = useCallback(
    () => setBidSuccessModalIsOpen(false),
    []
  )
  const openBidSuccessModal = useCallback(
    () => setBidSuccessModalIsOpen(true),
    []
  )
  const [buySuccessModalIsOpen, setBuySuccessModalIsOpen] = useState(false)
  const closeBuySuccessModal = useCallback(
    () => setBuySuccessModalIsOpen(false),
    []
  )
  const openBuySuccessModal = useCallback(
    () => setBuySuccessModalIsOpen(true),
    []
  )

  useEffect(() => {
    if (status === 'bidSuccess') {
      openBidSuccessModal()
      closeActionModal()
    } else if (status === 'buySuccess') {
      openBuySuccessModal()
      closeActionModal()
    }
  }, [status])

  if (waitingItem) {
    return <Presentation loading={waitingItem} item={null} />
  }

  return (
    <Presentation
      loading={waitingItem}
      item={itemDetail!}
      aboutPhysicalModalIsOpen={aboutPhysicalModalIsOpen}
      handleClosePhysicalModal={closePhysicalModal}
      handleOpenPhysicalModal={openPhysicalModal}
      aboutAutoExtensionAuctionModalIsOpen={
        aboutAutoExtensionAuctionModalIsOpen
      }
      handleOpenAutoExtensionModal={openAutoExtensionModal}
      handleCloseAutoExtensionModal={closeAutoExtensionModal}
      connectingWallet={waitingWallet}
      connectWalletModalIsOpen={walletModalIsOpen}
      handleCloseConnectWalletModal={closeWalletModal}
      handleConnectWallet={connectWallet}
      userWalletBalance={walletInfo?.balance}
      actionModalOpen={actionModalIsOpen}
      handleOpenSaleActionModal={handleDoBid}
      handleCloseBidModal={closeActionModal}
      handleChangeInputPrice={onChangeInput}
      bidding={bidding}
      handleCloseBidSuccessModal={closeBidSuccessModal}
      showBidSuccessModal={bidSuccessModalIsOpen}
      handleCloseBuyFixedPriceSuccessModal={closeBuySuccessModal}
      showBuyFixedPriceSuccessModal={buySuccessModalIsOpen}
      bidPrice={bidPrice}
      handleDoBid={doBid}
      handleDoBuy={doBuy}
      isValidationError={isError}
      errorText={errorText}
      taHash={bidHash}
      onTick={onTick}
    />
  )
}
