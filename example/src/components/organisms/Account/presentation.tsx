import styled from '@emotion/styled'
import { Token } from '@kyuzan/mint-sdk-js'
import React from 'react'
import { color, media } from '../../../style'
import { EmptyTitle, CardList } from '../../atoms/CardList'
import { CardUL } from '../../atoms/CardList'
import { Tabs } from '../../atoms/Tabs'
import { AccountInfo } from '../../molecules/AccountInfo'
import { Card } from '../../molecules/Card'
import { LoadingCard } from '../../molecules/Card/loading'

type Props = {
  waitingOwnTokens: boolean
  userWalletAddress: string | undefined
  ownTokens: Token[]
  accountDisplayName: string | undefined
  accountBio: string | undefined
  accountProfileUrl: string | undefined
  accountInstagramAccountName: string | undefined
  accountTwitterAccountName: string | undefined
  accountSiteUrl: string | undefined
  accountLoading: boolean
}

export const Presentation: React.VFC<Props> = ({
  waitingOwnTokens,
  userWalletAddress,
  ownTokens,
  accountDisplayName,
  accountBio,
  accountProfileUrl,
  accountInstagramAccountName,
  accountTwitterAccountName,
  accountSiteUrl,
  accountLoading,
}) => {
  return (
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
            onEdit={undefined}
          />
        </AccountInfoContainer>
        <OwnTokensContainer>
          <TabsContainer>
            <Tabs
              items={[{ label: '購入済み', value: 'コレクション' }]}
              value={'コレクション'}
            />
          </TabsContainer>
        </OwnTokensContainer>
        {waitingOwnTokens && <LoadingCard />}
        {!waitingOwnTokens && ownTokens.length === 0 && (
          <EmptyTitle>商品はありません</EmptyTitle>
        )}
        <CardUL>
          {!waitingOwnTokens &&
            ownTokens.length !== 0 &&
            ownTokens.map((item) => {
              return (
                <CardList key={item.item.itemId}>
                  <Card item={item.item} loading={false} />
                </CardList>
              )
            })}
        </CardUL>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  background: ${color.background.bague};
  max-width: 840px;
  min-height: 100vh;
  padding-top: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  ${media.mdsp`
    max-width:100%;
    padding:144px 16px;
  `}
`

const InnerContainer = styled.div`
  min-width: 840px;
  min-height: 100vh;
`

const AccountInfoContainer = styled.div`
  margin-bottom: 64px;
  ${media.mdsp`
    margin-bottom:32px;
  `}
`

const OwnTokensContainer = styled.div``

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
`
