import styled from '@emotion/styled'
import React, { ChangeEventHandler } from 'react'
import { Tag as TagBase } from '../../atoms/Tag'
import { color, font, media } from '../../../style'
import { BidButton } from '../../molecules/Button/bid'
import { WalletModal } from '../../molecules/WalletModal'
import { SaleActionModal } from '../../molecules/SaleActionModal'
import { AboutPhysicalModal } from '../../molecules/AboutPhysicalModal'
import { AboutAutoExtensionAuctionModal } from '../../molecules/AboutAutoExtensionAuctionModal'
import { getOpenSeaLink } from '../../../util/getOpenSeaLink'
import { ExternalLink } from '../../atoms/ExternalLink'
import { getItemPrice } from '../../../util/getItemPrice'
import { getItemPriceUnit, getPriceUnit } from '../../../util/getItemPriceUnit'
import Image from 'next/image'
import { StatusDetail } from '../../molecules/Detail'
import { Item } from '@kyuzan/mint-sdk-js'
import { LoadingItemDetailComponent } from './loading'
import { BidSuccessModal } from '../../molecules/BidSuccessModal'
import { BoughtFixedPriceSuccessModal } from '../../molecules/BoughtFixedPriceSuccessModal'
import { SimpleButton } from '../../atoms/SimpleButton'

type Props = {
  loading: boolean
  item: Item | undefined // loading === trueの時、undefined
  aboutPhysicalModalIsOpen: boolean
  handleClosePhysicalModal: () => void
  handleOpenPhysicalModal: () => void
  aboutAutoExtensionAuctionModalIsOpen: boolean
  handleCloseAutoExtensionModal: () => void
  handleOpenAutoExtensionModal: () => void
  handleOpenSaleActionModal: () => void
  saleIsOutOfDate: boolean
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
}

export const Presentation: React.VFC<Props> = ({
  aboutPhysicalModalIsOpen,
  handleClosePhysicalModal,
  aboutAutoExtensionAuctionModalIsOpen,
  handleCloseAutoExtensionModal,
  handleCloseBidSuccessModal,
  showBidSuccessModal,
  handleCloseBuyFixedPriceSuccessModal,
  showBuyFixedPriceSuccessModal,
  item,
  handleOpenPhysicalModal,
  handleOpenAutoExtensionModal,
  handleOpenSaleActionModal: handleOpenBidModal,
  saleIsOutOfDate,
  connectWalletModalIsOpen,
  connectingWallet,
  handleConnectWallet,
  handleCloseConnectWalletModal,
  userWalletBalance,
  actionModalOpen,
  bidding,
  handleCloseBidModal,
  handleChangeInputPrice,
  bidPrice,
  handleDoBid,
  handleDoBuy,
  loading,
  isValidationError,
  errorText,
  taHash: bidHash,
}) => {
  if (loading) {
    return <LoadingItemDetailComponent />
  }

  const isBought = typeof item?.buyerAddress === 'string'

  return (
    <>
      <Detail>
        <Title>{item?.name}</Title>
        <TagWrap>
        {item?.type === 'nftWithPhysicalProduct' && (
          <Tag
            label={'フィジカルアイテムつき'}
            iconPath={'/images/cardboard.svg'}
          />
        )}
        {item?.tradeType === 'autoExtensionAuction' && (
          <Tag label={'自動延長オークション'} />
        )}
        {item?.tradeType === 'fixedPrice' && <Tag label={'固定価格販売'} />}
        </TagWrap>
        <TradeInfoContainer>
          <StatusDetail
            unit={getPriceUnit(item ? item.networkId : 4)}
            price={getItemPrice(item)}
            endAt={item?.endAt ?? new Date()}
            tradeType={item?.tradeType ?? 'fixedPrice'}
          />
          {item?.type === 'nftWithPhysicalProduct' && (
            <QuestionButton onClick={handleOpenPhysicalModal}>
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

          {item?.tradeType === 'autoExtensionAuction' && (
            <QuestionButton onClick={handleOpenAutoExtensionModal}>
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

        {!saleIsOutOfDate && !isBought && (
          <BidButton
            label={
              item?.tradeType === 'autoExtensionAuction'
                ? '入札する'
                : '購入する'
            }
            onClick={handleOpenBidModal}
          />
        )}

        {isBought && (
          <SimpleButton
            label={'売り切れ'}
            // onClick={action('onClick')}
            disabled={true}
          />
        )}

        <Description>{item?.description}</Description>
        <ExternalLinkUL>
          <ExternalLinkList>
            <ExternalLink
              label={'IPFSで見る'}
              href={item?.tokenURIHTTP ?? ''}
            />
          </ExternalLinkList>
          <ExternalLinkList>
            {item?.buyerAddress ? (
              <ExternalLink
                label={'OpenSeaで見る'}
                href={getOpenSeaLink(item)}
              />
            ) : null}
          </ExternalLinkList>
        </ExternalLinkUL>
      </Detail>
      <WalletModal
        isOpen={connectWalletModalIsOpen}
        loading={connectingWallet}
        connectWallet={handleConnectWallet}
        closeModal={handleCloseConnectWalletModal}
      />
      <SaleActionModal
        itemTradeType={item?.tradeType ?? 'fixedPrice'}
        itemName={item?.name ?? ''}
        price={getItemPrice(item)}
        endAt={item?.endAt ?? new Date()}
        media={item?.imageURIHTTP}
        unit={getItemPriceUnit(item)}
        minBidPrice={item?.minBidPrice}
        walletBalance={userWalletBalance}
        isOpen={actionModalOpen}
        loading={bidding}
        closeModal={handleCloseBidModal}
        doBid={handleDoBid}
        doBuy={handleDoBuy}
        bidPrice={bidPrice}
        onChangeInput={handleChangeInputPrice}
        isValidationError={isValidationError}
        errorText={errorText}
      />
      <BidSuccessModal
        closeModal={handleCloseBidSuccessModal}
        isOpen={showBidSuccessModal}
        media={item?.imageURIHTTP}
        unit={getItemPriceUnit(item)}
        bidHash={bidHash ?? ''}
        itemName={item?.name ?? ''}
        itemNetworkId={item?.networkId ?? 1}
        endAt={item?.endAt ?? new Date()}
        price={getItemPrice(item)}
      />
      <BoughtFixedPriceSuccessModal
        itemName={item?.name ?? ''}
        price={getItemPrice(item)}
        media={item?.imageURIHTTP}
        isOpen={showBuyFixedPriceSuccessModal}
        itemNetworkId={item?.networkId ?? 1}
        unit={getItemPriceUnit(item)}
        closeModal={handleCloseBuyFixedPriceSuccessModal}
        endAt={item?.endAt ?? new Date()}
        txHash={bidHash ?? ''}
      />
      <AboutPhysicalModal
        isOpen={aboutPhysicalModalIsOpen}
        closeModal={handleClosePhysicalModal}
      />
      <AboutAutoExtensionAuctionModal
        isOpen={aboutAutoExtensionAuctionModalIsOpen}
        closeModal={handleCloseAutoExtensionModal}
      />
    </>
  )
}

const Tag = styled(TagBase)`
  width: fit-content;
  display: inline-flex;
  margin:0 0 0 8px;
  &:first-of-type{
    margin:0;
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
const TagWrap=styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const TradeInfoContainer = styled.div`
  margin: 32px 0;
`

const ExternalLinkUL = styled.ul`
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
  ${font.mont.caption};
  text-decoration: underline;
  line-height: 1;
`
