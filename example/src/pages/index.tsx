import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { EndedAuctionList } from '../components/organisms/EndedAuctionList'
import { LiveAuctionList } from '../components/organisms/LiveAuctionList'
import { LoadingList } from '../components/organisms/LoadingList'
import { useAppDispatch, useAppSelector } from '../redux/getStore'
import { getItemsActionCreator } from '../redux/items'
import { getSdk } from '../sdk'
import { color } from '../style'

const Page = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => {
    return state.app.items.data
  })

  const waitingItems = useAppSelector((state) => {
    return state.app.items.meta.waitingItemAction
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
        <div
          onClick={() => {
            console.log('==========')
            console.log(getSdk())
            getSdk().sign()
          }}
        >
          sign
        </div>
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
