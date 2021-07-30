import styled from '@emotion/styled'
import { Item, ItemShippingInfo, Token } from '@kyuzan/mint-sdk-js'
import Image from 'next/image'
import React, { useState } from 'react'
import { color, font, media } from '../../../style'
import { EmptyTitle } from '../../atoms/CardList'
import { Tabs } from '../../atoms/Tabs'
import { ToolTip } from '../../atoms/ToolTip'
import { AccountInfo } from '../../molecules/AccountInfo'
import { Card } from '../../molecules/Card'
import { LoadingCard } from '../../molecules/Card/loading'
import { CardMyPage } from '../../molecules/CardMyPage'
import { ShippingInfoModal } from '../../molecules/ShippingInfoModal'
import { WalletModal } from '../../molecules/WalletModal'

type Props = {
  bidedItems: Item[]
  ownTokens: Token[]
  waitingBidedItems: boolean
  waitingOwnTokens: boolean
  showShippingInfoModal: boolean
  handleWithdrawItem: (itemId: string) => void
  handleHideShippingInfo: () => void
  showShippingInfo: (itemId: string) => void
  userWalletAddress: string | undefined
  withdrawingItemId: string | undefined
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
  onComplete?: () => void
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
  onComplete,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('bidding')
  const withPhysicalItemTokens = ownTokens.filter(
    (item) => item.item.type === 'nftWithPhysicalProduct'
  )
  return (
    <>
      <Container>
        {/* <InnerContainer> */}
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
          <TabsContainer>
            <Tabs
              items={[
                { label: '入札中/引き出し待ち', value: 'bidding' },
                { label: 'フィジカルアイテム', value: 'withPhysical' },
                { label: '購入済み', value: 'owned' },
              ]}
              onChange={setSelectedTab}
              value={selectedTab}
            />
          </TabsContainer>
          <NotFoundContainer>
            <ToolTip
              description={
                '処理中の可能性があります。取引トランザクションをご確認ください'
              }
            >
              <NotFoundIconText>
                <NotFoundIcon>
                  <Image
                    src={'/images/icons/help.svg'}
                    layout={'fixed'}
                    width={16}
                    height={16}
                  />
                </NotFoundIcon>
                <NotFoundText>商品が見当たらない</NotFoundText>
              </NotFoundIconText>
            </ToolTip>
          </NotFoundContainer>
          {selectedTab === 'bidding' && (
            <>
              {waitingBidedItems && <CardMyPage loading={true} />}
              {!waitingBidedItems && bidedItems.length === 0 && (
                <EmptyTitle>商品はありません</EmptyTitle>
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
                        onComplete={onComplete}
                      />
                    </ItemContainer>
                  )
                })}
            </>
          )}
          {selectedTab === 'withPhysical' && (
            <>
              {waitingOwnTokens && <CardMyPage loading={true} />}
              {!waitingOwnTokens && withPhysicalItemTokens.length === 0 && (
                <EmptyTitle>商品はありません</EmptyTitle>
              )}
              {withPhysicalItemTokens.length !== 0 &&
                withPhysicalItemTokens.map((token) => {
                  return (
                    <ItemContainer key={token.item.itemId}>
                      <CardMyPage
                        item={token}
                        loading={false}
                        userWalletAddress={userWalletAddress}
                        onShowShippingInfo={() =>
                          showShippingInfo(token.item.itemId)
                        }
                      />
                    </ItemContainer>
                  )
                })}
            </>
          )}
          {selectedTab === 'owned' && (
            <ItemsContainer>
              {waitingOwnTokens && <LoadingCard />}
              {!waitingOwnTokens && ownTokens.length === 0 && (
                <EmptyTitle>商品はありません</EmptyTitle>
              )}
              {!waitingOwnTokens &&
                ownTokens.length !== 0 &&
                ownTokens.map((item) => {
                  return (
                    <ItemContainer key={item.item.itemId}>
                      <Card item={item.item} loading={false} />
                    </ItemContainer>
                  )
                })}
            </ItemsContainer>
          )}
        {/* </InnerContainer> */}
      </Container>
      <ShippingInfoModal
        isOpen={showShippingInfoModal}
        shippingInfo={shippingInfo}
        closeModal={handleHideShippingInfo}
      />
      <WalletModal
        isOpen={!accountLoading && typeof userWalletAddress === 'undefined'}
        connectWallet={onConnectWallet}
        loading={connectingWallet}
      />
    </>
  )
}

const Container = styled.div`
  background-color: ${color.content.gray2};
  max-width: 840px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 144px;
  margin: auto;
  ${media.mdsp`
    max-width:100%;
    padding:0 16px;
  `}
`

// const InnerContainer = styled.div`
//   min-width: 840px;
//   min-height: 100vh;
// `

const AccountInfoContainer = styled.div`
  margin-bottom: 64px;
  ${media.mdsp`
    margin-bottom:32px;
  `}
`

const ItemsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 840px;
  

`

const ItemContainer = styled.div`
  margin-bottom: 32px;
  width:100%;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  width:100%;
`

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  width:100%;
`

const NotFoundIconText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`

const NotFoundIcon = styled.div`
  margin-right: 4px;
  line-height: 1;
  height: 16px;
  width: 16px;
`

const NotFoundText = styled.div`
  color: ${color.content.middle};
  ${font.mont.caption};
  text-decoration: underline;
  line-height: 1;
`
