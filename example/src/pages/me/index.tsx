import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
// import { EndedAuctionList } from '../../components/organisms/AuctionList/ended'
// import { LiveAuctionList } from '../../components/organisms/AuctionList/active'
// import { LoadingList } from '../../components/organisms/AuctionList/loading'
import { useAppDispatch } from '../../redux/getStore'
import { getItemsActionCreator } from '../../redux/items'
import { color } from '../../style'
import { NextPage } from 'next'

const Page: NextPage = () => {
  const dispatch = useAppDispatch()
  // const items = useAppSelector((state) => {
  //   return state.app.items.data
  // })

  // const waitingItems = useAppSelector((state) => {
  //   return state.app.items.meta.waitingItemAction
  // })
  const getItems = useCallback(() => {
    dispatch(getItemsActionCreator() as any)
  }, [])

  useEffect(() => {
    getItems()
  }, [])
  return (
    <Container>
      <InnerContainer>TODO: マイページ</InnerContainer>
    </Container>
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
