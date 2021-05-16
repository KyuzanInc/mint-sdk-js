import styled from '@emotion/styled'
import React, { ReactNode, useCallback, useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { bidActionCreator } from '../../../redux/transaction'
import { connectWalletActionCreator } from '../../../redux/wallet'
import { color, font } from '../../../style'
import { getItemPriceUnit } from '../../../util/getItemPriceUnit'
import { getOpenSeaLink } from '../../../util/getOpenSeaLink'
import { ExternalLink } from '../../atoms/ExternalLink'
import { Tag as TagBase } from '../../atoms/Tag'
import { AboutPhysicalModal } from '../../molecules/AboutPhysicalModal'
import { BidModal } from '../../molecules/BidModal'
import { BidButton } from '../../molecules/Button/bid'
import { StatusDetail } from '../../molecules/Detail'
import { WalletModal } from '../../molecules/WalletModal'
import { LoadingItemDetailComponent } from './loading'

type Props = {
  children?: ReactNode
}

export const ItemDetailComponent: React.FC<Props> = () => {
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

  const waitingWallet = useAppSelector((state) => {
    return state.app.wallet.meta.waitingWalletAction
  })

  const connectWallet = useCallback(async () => {
    await dispatch(connectWalletActionCreator() as any)
    closeWalletModal()
  }, [])

  const [bidPrice, setBidPrice] = useState('')
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

  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const closeWalletModal = useCallback(() => setWalletModalIsOpen(false), [])
  const openWalletModal = useCallback(() => setWalletModalIsOpen(true), [])

  const bidding = useAppSelector((state) => state.app.transaction.meta.bidding)
  const [bidModalIsOpen, setBidModalIsOpen] = useState(false)
  const closeBidModal = useCallback(() => setBidModalIsOpen(false), [])
  const openBidModal = useCallback(() => setBidModalIsOpen(true), [])

  const [aboutPhysicalModalIsOpen, setAboutPhysicalModalIsOpen] = useState(
    false
  )
  const closePhysicalModal = useCallback(
    () => setAboutPhysicalModalIsOpen(false),
    []
  )
  const openPhysicalModal = useCallback(
    () => setAboutPhysicalModalIsOpen(true),
    []
  )

  const onClick = useCallback(() => {
    if (!walletIsConnect) {
      openWalletModal()
      return
    }

    if (auctionIsOutOfDate) {
      return
    }

    openBidModal()
  }, [walletIsConnect, auctionIsOutOfDate])

  if (waitingItem) {
    return <LoadingItemDetailComponent />
  }

  return (
    <>
      <Detail>
        <Title>{item?.name}</Title>
        {item?.type === 'nftWithPhysicalProduct' && (
          <Tag
            label={'フィジカルアイテムつき'}
            iconPath={'/images/cardboard.svg'}
          />
        )}
        <StatusDetail item={item} />
        <QuestionButton onClick={openPhysicalModal}>
          <QuestionIcon>
            <Image
              src={'/images/info.svg'}
              layout={'fixed'}
              width={16}
              height={16}
            />
          </QuestionIcon>
          <QuestionText>フィジカルアイテムつきとは</QuestionText>
        </QuestionButton>
        <BidButton
          label={auctionIsOutOfDate ? '-' : 'PLACE A BID'}
          onClick={onClick}
        />
        <Description>{item?.description}</Description>
        <ExternalLinkUL>
          <ExternalLinkList>
            {item?.buyerAddress ? (
              <ExternalLink
                label={'View On IPFS'}
                href={item?.tokenURIHTTP ?? ''}
              />
            ) : null}
          </ExternalLinkList>
          <ExternalLinkList>
            {item?.buyerAddress ? (
              <ExternalLink
                label={'View On OpenSea'}
                href={getOpenSeaLink(item)}
              />
            ) : null}
          </ExternalLinkList>
        </ExternalLinkUL>
      </Detail>
      <WalletModal
        isOpen={walletModalIsOpen}
        loading={waitingWallet}
        connectWallet={connectWallet}
        closeModal={closeWalletModal}
      />
      <BidModal
        unit={getItemPriceUnit(item)}
        minBidPrice={item?.minBidPrice}
        walletBalance={walletInfo?.balance}
        isOpen={bidModalIsOpen}
        loading={bidding}
        closeModal={closeBidModal}
        doBid={doBid}
        bidPrice={bidPrice}
        onChangeInput={onChangeInput}
      />
      <AboutPhysicalModal
        isOpen={aboutPhysicalModalIsOpen}
        closeModal={closePhysicalModal}
      />
    </>
  )
}

const Tag = styled(TagBase)`
  width: fit-content;
`

export const Detail = styled.div`
  width: 426px;
  padding: 64px 0;
  margin-right: 128px;
`

export const Title = styled.div`
  ${font.lg.h2}
  margin-bottom: 8px;
`

export const Description = styled.div`
  ${font.lg.body1}
  min-height: 192px;
`

export const ExternalLinkUL = styled.ul`
  display: flex;
  flex-direction: column;
`

const ExternalLinkList = styled.li`
  margin: 16px 0px 0 0;
  width: 100%;
`

const QuestionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`

const QuestionIcon = styled.div`
  margin-right: 4px;
  line-height: 1;
  height: 16px;
  width: 16px;
`

const QuestionText = styled.div`
  color: ${color.content.middle};
  ${font.lg.caption};
  text-decoration: underline;
  line-height: 1;
`
