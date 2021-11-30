import { Item } from '@kyuzan/mint-sdk-js'
import styled from '@emotion/styled'
import React, { ChangeEventHandler } from 'react'
import { Tag as TagBase } from '../../atoms/Tag'
import { color, font, media } from '../../../style'
import { WalletModal } from '../../molecules/WalletModal'
import { SaleActionModal } from '../../molecules/SaleActionModal'
import { AboutPhysicalModal } from '../../molecules/AboutPhysicalModal'
import { AboutAutoExtensionAuctionModal } from '../../molecules/AboutAutoExtensionAuctionModal'
import { getOpenSeaLink } from '../../../util/getOpenSeaLink'
import { SecondaryButton } from '../../atoms/SecondaryButton'
import { getItemPriceUnit, getPriceUnit } from '../../../util/getItemPriceUnit'
import Image from 'next/image'
import { StatusDetail } from '../../molecules/Detail'
import { LoadingItemDetailComponent } from './loading'
import { BidSuccessModal } from '../../molecules/BidSuccessModal'
import { BoughtFixedPriceSuccessModal } from '../../molecules/BoughtFixedPriceSuccessModal'
import { PrimaryButton } from '../../atoms/PrimaryButton'
import { isOnSale } from '../../../util/isOnSale'
import { CountdownTimeDelta } from 'react-countdown'

type Props =
  | {
      loading: false
      item: Item
      aboutPhysicalModalIsOpen: boolean
      handleClosePhysicalModal: () => void
      handleOpenPhysicalModal: () => void
      aboutAutoExtensionAuctionModalIsOpen: boolean
      handleCloseAutoExtensionModal: () => void
      handleOpenAutoExtensionModal: () => void
      handleOpenSaleActionModal: () => void
      connectWalletModalIsOpen: boolean
      handleConnectWallet: () => void
      handleCloseConnectWalletModal: () => void
      connectingWallet: boolean
      userWalletBalance: string | undefined
      actionModalOpen: boolean
      bidding: boolean
      handleCloseBidModal: () => void
      handleCloseBidSuccessModal: () => void
      showBidSuccessModal: boolean
      handleCloseBuyFixedPriceSuccessModal: () => void
      showBuyFixedPriceSuccessModal: boolean
      handleChangeInputPrice: ChangeEventHandler<HTMLInputElement>
      bidPrice: string
      handleDoBid: () => void
      handleDoBuy: (inJapan: boolean) => void
      isValidationError: boolean
      errorText: string
      taHash?: string
      onTick: (calcTimeDelta: CountdownTimeDelta) => void
    }
  | {
      loading: true
      item: null
    }

export const Presentation: React.VFC<Props> = (args) => {
  if (args.loading) {
    return <LoadingItemDetailComponent />
  }

  if (
    args.item.itemDetail.paymentMethodData.paymentMethod ===
    'credit-card-stripe-fixed-price'
  )
    throw new Error('not implemented')

  const startDate = new Date(args.item.itemDetail.startAt)
  const endDate = new Date(args.item.itemDetail.endAt)
  const saleOnGoing = isOnSale(startDate, endDate)
  const tradeType = args.item.itemDetail.paymentMethodData.paymentMethod
  // TODO
  const soldOut =
    typeof args.item.itemStocks.find((stock) => stock.status === 'created') ===
    'undefined'

  const hasPyisicalItem = args.item.itemDetail.type === 'with-physical-item'
  return (
    <>
      <Detail>
        <Title>{args.item.itemDetail.name}</Title>
        <TagWrap>
          {hasPyisicalItem && (
            <Tag
              label={'フィジカルアイテムつき'}
              iconPath={'/images/cardboard.svg'}
            />
          )}
          {tradeType === 'ethereum-contract-erc721-shop-auction' && (
            <Tag label={'自動延長オークション'} />
          )}
          {tradeType === 'ethereum-contract-erc721-shop-fixed-price' && (
            <Tag label={'固定価格販売'} />
          )}
        </TagWrap>
        <TradeInfoContainer>
          <StatusDetail
            unit={getPriceUnit(
              args.item.itemDetail.paymentMethodData.contractDataERC721Shop
                .networkId
            )}
            price={args.item.itemDetail.price}
            endAt={endDate}
            tradeType={tradeType}
            onTick={args.onTick}
          />
          {hasPyisicalItem && (
            <QuestionButton onClick={args.handleOpenPhysicalModal}>
              <QuestionIcon>
                <Image
                  src={'/images/icons/info.svg'}
                  layout={'fixed'}
                  width={16}
                  height={16}
                />
              </QuestionIcon>
              <QuestionText>フィジカルアイテムつきとは</QuestionText>
            </QuestionButton>
          )}

          {tradeType === 'ethereum-contract-erc721-shop-auction' && (
            <QuestionButton onClick={args.handleOpenAutoExtensionModal}>
              <QuestionIcon>
                <Image
                  src={'/images/icons/info.svg'}
                  layout={'fixed'}
                  width={16}
                  height={16}
                />
              </QuestionIcon>
              <QuestionText>自動延長オークション</QuestionText>
            </QuestionButton>
          )}
        </TradeInfoContainer>
        {tradeType === 'ethereum-contract-erc721-shop-auction' &&
          (saleOnGoing ? (
            <BidButton
              label={'入札する'}
              onClick={args.handleOpenSaleActionModal}
              type={'button'}
            />
          ) : (
            <BidButton label={'売り切れ'} disabled={true} type={'button'} />
          ))}

        {tradeType !== 'ethereum-contract-erc721-shop-auction' &&
          (!soldOut ? (
            <BidButton
              label={'購入する'}
              onClick={args.handleOpenSaleActionModal}
              type={'button'}
            />
          ) : (
            <BidButton label={'売り切れ'} disabled={true} type={'button'} />
          ))}
        <Description>{args.item.itemDetail.description}</Description>
        <SecondaryButtonUL>
          <SecondaryButtonList>
            <ExternalButton
              label={'IPFSで見る'}
              href={args.item.productERC721s[0].tokenURI ?? ''}
              iconSize={16}
              iconPathBack={'/images/external-link.svg'}
              isExternal={true}
            />
          </SecondaryButtonList>
          <SecondaryButtonList>
            {soldOut ? (
              <ExternalButton
                label={'OpenSeaで見る'}
                href={getOpenSeaLink(args.item)}
                isExternal={true}
              />
            ) : null}
          </SecondaryButtonList>
        </SecondaryButtonUL>
      </Detail>
      <WalletModal
        isOpen={args.connectWalletModalIsOpen}
        loading={args.connectingWallet}
        connectWallet={args.handleConnectWallet}
        closeModal={args.handleCloseConnectWalletModal}
      />
      <SaleActionModal
        itemTradeType={tradeType}
        itemName={args.item.itemDetail.name}
        price={args.item.itemDetail.price}
        endAt={endDate}
        media={args.item.itemDetail.previews[0]}
        unit={getItemPriceUnit(args.item)}
        // TODO
        minBidPrice={110}
        walletBalance={args.userWalletBalance}
        isOpen={args.actionModalOpen}
        loading={args.bidding}
        closeModal={args.handleCloseBidModal}
        doBid={args.handleDoBid}
        doBuy={args.handleDoBuy}
        bidPrice={args.bidPrice}
        onChangeInput={args.handleChangeInputPrice}
        isValidationError={args.isValidationError}
        errorText={args.errorText}
      />

      {/* 仮想通貨決済only */}
      <BidSuccessModal
        closeModal={args.handleCloseBidSuccessModal}
        isOpen={args.showBidSuccessModal}
        media={args.item.itemDetail.previews[0]}
        unit={getItemPriceUnit(args.item)}
        // TODO
        bidHash={args.taHash ?? ''}
        itemName={args.item.itemDetail.name}
        itemNetworkId={
          args.item.itemDetail.paymentMethodData.contractDataERC721Shop
            .networkId
        }
        endAt={endDate}
        price={args.item.itemDetail.price}
      />

      <BoughtFixedPriceSuccessModal
        itemName={args.item.itemDetail.name ?? ''}
        price={args.item.itemDetail.price}
        media={args.item.itemDetail.previews[0]}
        isOpen={args.showBuyFixedPriceSuccessModal}
        itemNetworkId={
          args.item.itemDetail.paymentMethodData.contractDataERC721Shop
            .networkId
        }
        unit={getItemPriceUnit(args.item)}
        closeModal={args.handleCloseBuyFixedPriceSuccessModal}
        endAt={endDate}
        txHash={args.taHash ?? ''}
      />
      <AboutPhysicalModal
        isOpen={args.aboutPhysicalModalIsOpen}
        closeModal={args.handleClosePhysicalModal}
      />
      <AboutAutoExtensionAuctionModal
        isOpen={args.aboutAutoExtensionAuctionModalIsOpen}
        closeModal={args.handleCloseAutoExtensionModal}
      />
    </>
  )
}

const Tag = styled(TagBase)`
  width: fit-content;
  display: inline-flex;
  margin: 0 0 0 8px;
  &:first-of-type {
    margin: 0;
  }
`

export const Detail = styled.div`
  /* width: 426px; */
  padding: 64px 0;
  ${media.sp`
    padding: 32px 0;
  `}
`

export const Title = styled.div`
  ${font.mont.h2}
  margin-bottom: 8px;
  ${media.sp`
    ${font.mont.h3}
  `}
`

export const Description = styled.div`
  ${font.mont.article1}
  min-height: 192px;
  margin: 32px 0 32px;
  ${media.sp`
    ${font.mont.article2}
  `}
`
const TagWrap = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const BidButton = styled(PrimaryButton)`
  width: 100%;
`

const TradeInfoContainer = styled.div`
  margin: 32px 0;
`

const SecondaryButtonUL = styled.ul`
  display: flex;
  flex-direction: column;
`

const SecondaryButtonList = styled.li`
  margin: 16px 0px 0 0;
  width: 100%;
`

const ExternalButton = styled(SecondaryButton)`
  height: 32px;
  width: 100%;
`

const QuestionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin: 16px 0 0 0;
`

const QuestionIcon = styled.div`
  margin-right: 4px;
  line-height: 1;
  height: 16px;
  width: 16px;
`

const QuestionText = styled.div`
  color: ${color.content.middle};
  ${font.mont.caption};
  text-decoration: underline;
  line-height: 1;
`
