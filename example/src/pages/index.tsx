import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { EndedAuctionList } from '../components/organisms/AuctionList/ended'
import { LiveAuctionList } from '../components/organisms/AuctionList/active'
import { LoadingList } from '../components/organisms/AuctionList/loading'
import { useAppDispatch, useAppSelector } from '../redux/getStore'
import { getItemsActionCreator } from '../redux/items'
import { color } from '../style'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import CommonMeta from '../components/atoms/CommonMeta'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host
  const baseUrl = `http://${host}`
  const currentPath = context.req.url
  return {
    props: {
      baseUrl,
      currentPath,
    },
  }
}

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ baseUrl, currentPath }) => {
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
