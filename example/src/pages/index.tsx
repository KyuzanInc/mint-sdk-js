import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { EndedAuctionList } from '../components/organisms/EndedAuctionList'
import { LiveAuctionList } from '../components/organisms/LiveAuctionList'
import { LoadingList } from '../components/organisms/LoadingList'
import { useAppDispatch, useAppSelector } from '../redux/getStore'
import { getItemsActionCreator } from '../redux/items'
import { color } from '../style'

const Page = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => {
    return state.ui.items.data
  })
  //TODO: use loading
  const waitingItems = useAppSelector((state) => {
    return state.ui.items.meta.waitingItemAction
  })
  const getItems = useCallback(() => {
    dispatch(getItemsActionCreator() as any)
  }, [])

  useEffect(() => {
    getItems()
  }, [])
  return (
    <Container>
      <InnerContainer>
        {waitingItems && <LoadingList />}
        {!waitingItems && <LiveAuctionList items={items.live} />}
        {!waitingItems && <EndedAuctionList items={items.ended} />}
      </InnerContainer>
    </Container>
  )
}

export default Page

const Container = styled.div`
  background: ${color.background.bague};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 72px;
`

const InnerContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0px 0px 0 300px;
`
