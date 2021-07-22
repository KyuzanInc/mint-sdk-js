import styled from '@emotion/styled'
import React, { ChangeEventHandler } from 'react'
import { Tag as TagBase } from '../../atoms/Tag'
import { color, font } from '../../../style'
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
import { Status } from '../../../redux/transaction'

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
  bidModalOpen: boolean
  bidding: boolean
  handleCloseBidModal: () => void
  handleChangeInputPrice: ChangeEventHandler<HTMLInputElement>
  bidPrice: string
  handleDoBid: () => void
  handleDoBuy: (inJapan: boolean) => void
  isValidationError: boolean
  errorText: string
  status?: Status
  bidHash?: string
}

export const Presentation: React.VFC<Props> = ({
  aboutPhysicalModalIsOpen,
  handleClosePhysicalModal,
  aboutAutoExtensionAuctionModalIsOpen,
  handleCloseAutoExtensionModal,
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
  bidModalOpen,
  bidding,
  handleCloseBidModal,
  handleChangeInputPrice,
  bidPrice,
  handleDoBid,
  handleDoBuy,
  loading,
  isValidationError,
  errorText,
  status,
  bidHash,
}) => {
  if (loading) {
    return <LoadingItemDetailComponent />
  }

  const isBought = typeof item?.buyerAddress === 'string'

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
        {item?.tradeType === 'autoExtensionAuction' && (
          <Tag label={'自動延長オークション'} />
        )}
        {item?.tradeType === 'fixedPrice' && <Tag label={'固定価格販売'} />}
        <TradeInfoContainer>
          <StatusDetail
            unit={getPriceUnit(item ? item.networkId : 4)}
            price={getItemPrice(item)}
            endAt={item?.endAt ?? new Date()}
            tradeType={item?.tradeType ?? 'fixedPrice'}
          />
        </TradeInfoContainer>

        {item?.type === 'nftWithPhysicalProduct' && (
          <QuestionButton onClick={handleOpenPhysicalModal}>
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
        )}

        {item?.tradeType === 'autoExtensionAuction' && (
          <QuestionButton onClick={handleOpenAutoExtensionModal}>
            <QuestionIcon>
              <Image
                src={'/images/info.svg'}
                layout={'fixed'}
                width={16}
                height={16}
              />
            </QuestionIcon>
            <QuestionText>自動延長オークション</QuestionText>
          </QuestionButton>
        )}
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

        {isBought && 'Sold'}

        <Description>{item?.description}</Description>
        <ExternalLinkUL>
          <ExternalLinkList>
            <ExternalLink
              label={'View On IPFS'}
              href={item?.tokenURIHTTP ?? ''}
            />
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
        isOpen={connectWalletModalIsOpen}
        loading={connectingWallet}
        connectWallet={handleConnectWallet}
        closeModal={handleCloseConnectWalletModal}
      />
      <SaleActionModal
        item={item}
        price={getItemPrice(item)}
        endAt={item?.endAt ?? new Date()}
        media={item?.imageURIHTTP}
        unit={getItemPriceUnit(item)}
        minBidPrice={item?.minBidPrice}
        walletBalance={userWalletBalance}
        isOpen={bidModalOpen}
        loading={bidding}
        closeModal={handleCloseBidModal}
        doBid={handleDoBid}
        doBuy={handleDoBuy}
        bidPrice={bidPrice}
        onChangeInput={handleChangeInputPrice}
        isValidationError={isValidationError}
        errorText={errorText}
        status={status}
        bidHash={bidHash}
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
`

export const Detail = styled.div`
  width: 426px;
  padding: 64px 0;
  margin-right: 128px;
`

export const Title = styled.div`
  ${font.mont.h2}
  margin-bottom: 8px;
`

export const Description = styled.div`
  ${font.mont.body1}
  min-height: 192px;
  margin-top: 32px;
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
