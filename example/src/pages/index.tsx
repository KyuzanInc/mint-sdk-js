import styled from '@emotion/styled'
import { Item } from '@kyuzan/mint-sdk-js'
import React, { useEffect, useState } from 'react'
import { EndedAuctionList } from '../components/organisms/EndedAuctionList'
import { LiveAuctionList } from '../components/organisms/LiveAuctionList'
import { getSdk } from '../sdk'
import { color } from '../style'

const Page = () => {
  // const dispatch = useAppDispatch()
  const [liveItems, setLiveItems] = useState<Item[]>([])
  const [endedItems, setEndedItems] = useState<Item[]>([])
  useEffect(() => {
    // dispatch(initialWalletActionCreator() as any)
    const sdk = getSdk()
    sdk?.getItems().then((items) => {
      const now = new Date()
      const live = items.filter((item) => item.endAt && now < item.endAt)
      const ended = items.filter((item) => item.endAt && now >= item.endAt)
      setLiveItems(live)
      setEndedItems(ended)
    })
  }, [])
  return (
    <Container>
      <InnerContainer>
        <LiveAuctionList items={liveItems} />
        <EndedAuctionList items={endedItems} />
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
