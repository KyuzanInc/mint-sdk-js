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
import { AccountInfo } from '../../molecules/AccountInfo'
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
  onConnectWallet: () => void
  connectingWallet: boolean
  accountDisplayName: string | undefined
  accountBio: string | undefined
  accountProfileUrl: string | undefined
  accountInstagramAccountName: string | undefined
  accountTwitterAccountName: string | undefined
  accountSiteUrl: string | undefined
  accountLoading: boolean
  accountOnClickEdit: () => void
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
  onConnectWallet,
  connectingWallet,
  accountDisplayName,
  accountBio,
  accountProfileUrl,
  accountInstagramAccountName,
  accountTwitterAccountName,
  accountSiteUrl,
  accountLoading,
  accountOnClickEdit,
}) => {
  return (
    <>
      <Container>
        <InnerContainer>
          <AccountInfoContainer>
            <AccountInfo
              displayName={accountDisplayName}
              bio={accountBio}
              walletAddress={userWalletAddress}
              profileUrl={accountProfileUrl}
              instagramAccountName={accountInstagramAccountName}
              twitterAccountName={accountTwitterAccountName}
              siteUrl={accountSiteUrl}
              loading={accountLoading}
              onEdit={accountOnClickEdit}
            />
          </AccountInfoContainer>
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
        shippingInfo={shippingInfo}
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
  padding-top: 144px;
  margin: auto;
`

const InnerContainer = styled.div`
  min-width: 840px;
  min-height: 100vh;
`

const AccountInfoContainer = styled.div`
  margin-bottom: 64px;
`

const ItemContainer = styled.div`
  margin-bottom: 32px;
`
