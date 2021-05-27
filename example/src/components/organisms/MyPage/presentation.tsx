import styled from '@emotion/styled'
import { Item, ItemShippingInfo, Token } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { color } from '../../../style'
import {
  ActiveStatus,
  EmptyTitle,
  ListTitle,
  Title,
} from '../../atoms/CardList'
import { CardMyPage } from '../../molecules/CardMyPage'
import { ShippingInfoModal } from '../../molecules/ShippingInfoModal'
import { WalletModal } from '../../molecules/WalletModal'

type Props = {
  waitingBidedItems: boolean
  waitingOwnTokens: boolean
  showShippingInfoModal: boolean
  bidedItems: Item[]
  handleWithdrawItem: (itemId: string) => void
  handleHideShippingInfo: () => void
  showShippingInfo: (itemId: string) => void
  userWalletAddress: string | undefined
  withdrawingItemId: string | undefined
  ownTokens: Token[]
  shippingInfo: ItemShippingInfo | undefined
  loadingShippingInfo: boolean
  onConnectWallet: () => void
  connectingWallet: boolean
}

export const Presentation: React.VFC<Props> = ({
  waitingBidedItems,
  showShippingInfoModal,
  bidedItems,
  waitingOwnTokens,
  handleWithdrawItem,
  handleHideShippingInfo,
  showShippingInfo,
  userWalletAddress,
  withdrawingItemId,
  ownTokens,
  shippingInfo,
  loadingShippingInfo,
  onConnectWallet,
  connectingWallet,
}) => {
  return (
    <>
      <Container>
        <InnerContainer>
          <ListTitle>
            <ActiveStatus />
            <Title>Bided Items</Title>
          </ListTitle>
          {waitingBidedItems && <CardMyPage loading={true} />}
          {!waitingBidedItems && bidedItems.length === 0 && (
            <EmptyTitle>No Items</EmptyTitle>
          )}
          {!waitingBidedItems &&
            bidedItems.length !== 0 &&
            bidedItems.map((item) => {
              return (
                <ItemContainer key={item.itemId}>
                  <CardMyPage
                    item={item}
                    loading={false}
                    userWalletAddress={userWalletAddress}
                    onWithdraw={() => handleWithdrawItem(item.itemId)}
                    withdrawing={withdrawingItemId === item.itemId}
                  />
                </ItemContainer>
              )
            })}
          <ListTitle>
            <Title>Collections</Title>
          </ListTitle>
          {waitingOwnTokens && <CardMyPage loading={true} />}
          {!waitingOwnTokens && ownTokens.length === 0 && (
            <EmptyTitle>No Items</EmptyTitle>
          )}
          {!waitingOwnTokens &&
            ownTokens.length !== 0 &&
            ownTokens.map((item) => {
              return (
                <ItemContainer key={item.item.itemId}>
                  <CardMyPage
                    item={item}
                    loading={false}
                    userWalletAddress={userWalletAddress}
                    onShowShippingInfo={() => {
                      showShippingInfo(item.item.itemId)
                    }}
                  />
                </ItemContainer>
              )
            })}
        </InnerContainer>
      </Container>
      <ShippingInfoModal
        isOpen={showShippingInfoModal}
        shippingInfo={
          loadingShippingInfo || typeof shippingInfo === 'undefined'
            ? undefined
            : {
                name: shippingInfo.name,
                postalCode: shippingInfo.postalCode,
                prefecture: shippingInfo.prefecture,
                city: shippingInfo.city,
                address1: shippingInfo.address1,
                address2: shippingInfo.address2,
                tel: shippingInfo.tel,
                email: shippingInfo.email,
              }
        }
        closeModal={handleHideShippingInfo}
      />
      <WalletModal
        isOpen={typeof userWalletAddress === 'undefined'}
        connectWallet={onConnectWallet}
        loading={connectingWallet}
      />
    </>
  )
}

const Container = styled.div`
  background: ${color.background.bague};
  min-width: 840px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 72px;
  margin: auto;
`

const InnerContainer = styled.div`
  min-width: 840px;
  min-height: 100vh;
`

const ItemContainer = styled.div`
  margin-bottom: 32px;
`
