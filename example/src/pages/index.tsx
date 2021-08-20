import styled from '@emotion/styled'
import React from 'react'
import { EndedAuctionList } from '../components/organisms/AuctionList/ended'
import { LiveAuctionList } from '../components/organisms/AuctionList/active'
import { LoadingList } from '../components/organisms/AuctionList/loading'
import { useAppSelector, wrapper } from '../redux/getStore'
import { getItemsActionCreator } from '../redux/items'
import { color, media } from '../style'
import CommonMeta from '../components/atoms/CommonMeta'

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const host = context.req.headers.host
    const baseUrl = `https://${host}`
    const currentPath = context.req.url ?? ''
    await context.store.dispatch(getItemsActionCreator() as any)
    return {
      props: {
        baseUrl,
        currentPath,
      },
    }
  }
)

const Page = ({
  baseUrl,
  currentPath,
}: {
  baseUrl: string
  currentPath: string
}) => {
  const items = useAppSelector((state) => {
    return state.app.items.data
  })
  console.log(items)

  const waitingItems = useAppSelector((state) => {
    return state.app.items.meta.waitingItemAction
  })
  return (
    <Container>
      <CommonMeta baseUrl={baseUrl} currentPath={currentPath} />
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
  max-width: 840px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 144px 0 0 0;
  margin: auto;
  ${media.mdsp`
    padding: 144px 16px 0;
  `}
`

const InnerContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`
