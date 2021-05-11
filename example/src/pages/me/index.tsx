import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/getStore'
import { color } from '../../style'
import { NextPage } from 'next'
import {
  ActiveStatus,
  EmptyTitle,
  ListTitle,
  Title,
} from '../../components/atoms/CardList'
import { CardMyPage } from '../../components/molecules/CardMyPage'
import {
  getBidedActionCreator,
  getOwnItemsActionCreator,
} from '../../redux/myItems'
import { withDrawItemActionCreator } from '../../redux/transaction'
import { ShippingInfoModal } from '../../components/molecules/ShippingInfoModal'
import { getShippingInfoActionCreator } from '../../redux/shippingInfo'

const Page: NextPage = () => {
  const dispatch = useAppDispatch()

  const walletInfo = useAppSelector((state) => state.app.wallet.data.walletInfo)

  const bidedItems = useAppSelector((state) => {
    // Auction中のものと、引き出していないものだけ表示
    return state.app.myItems.data.bidedItems.filter(
      (item) =>
        item.endAt! > new Date() ||
        (item.currentBidderAddress === walletInfo?.address &&
          !item.buyerAddress)
    )
  })

  const waitingBidedItems = useAppSelector((state) => {
    return state.app.myItems.meta.bidedItemsLoading
  })

  const ownTokens = useAppSelector((state) => {
    return state.app.myItems.data.ownItems
  })

  const waitingOwnTokens = useAppSelector((state) => {
    return state.app.myItems.meta.ownItemsLoading
  })

  const withdrawingItemId = useAppSelector(
    (state) => state.app.transaction.meta.withdrawingItemId
  )

  const withdrawItem = (itemId: string) => {
    dispatch(withDrawItemActionCreator({ itemId }) as any)
  }

  const loadingShippingInfo = useAppSelector(
    (state) => state.app.shippingInfo.meta.loadingShippingInfo
  )

  const shippingInfo = useAppSelector(
    (state) => state.app.shippingInfo.data.shippingInfo
  )

  const [selectShippingInfoItemId, setSelectShippingInfoItemId] = useState<
    string | undefined
  >(undefined)

  const showShippingInfo = (itemId: string) => {
    setSelectShippingInfoItemId(itemId)
    dispatch(getShippingInfoActionCreator({ itemId }) as any)
  }

  const hideShippinngInfo = () => {
    setSelectShippingInfoItemId(undefined)
  }

  useEffect(() => {
    if (typeof walletInfo?.address === 'undefined') {
      // TODO: モーダル出して、Walletにコネクトしてもらう
      return
    }
    dispatch(
      getBidedActionCreator({ bidderAddress: walletInfo.address }) as any
    )
    dispatch(
      getOwnItemsActionCreator({ walletAddress: walletInfo.address }) as any
    )
  }, [walletInfo?.address])
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
                    userWalletAddress={walletInfo?.address}
                    onWithdraw={() => withdrawItem(item.itemId)}
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
                    userWalletAddress={walletInfo?.address}
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
        isOpen={typeof selectShippingInfoItemId !== 'undefined'}
        shippingInfo={
          typeof selectShippingInfoItemId === 'undefined' ||
          typeof shippingInfo[selectShippingInfoItemId] === 'undefined' ||
          loadingShippingInfo
            ? undefined
            : {
                name: shippingInfo[selectShippingInfoItemId].name,
                postalCode: shippingInfo[selectShippingInfoItemId].postalCode,
                prefecture: shippingInfo[selectShippingInfoItemId].prefecture,
                city: shippingInfo[selectShippingInfoItemId].city,
                address1: shippingInfo[selectShippingInfoItemId].address1,
                address2: shippingInfo[selectShippingInfoItemId].address2,
                tel: shippingInfo[selectShippingInfoItemId].tel,
                email: shippingInfo[selectShippingInfoItemId].email,
              }
        }
        closeModal={hideShippinngInfo}
      />
    </>
  )
}

export default Page

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
