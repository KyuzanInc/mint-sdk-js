import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { History } from '../../components/organisms/History'
import { useAppDispatch, useAppSelector } from '../../redux/getStore'
import { getItemActionCreator } from '../../redux/item'
import { color, media } from '../../style'
import { ItemDetail } from '../../components/organisms/ItemDetail'
import { getHistoryActionCreator } from '../../redux/history'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import CommonMeta from '../../components/atoms/CommonMeta'
import { MediaContent } from '../../components/atoms/MediaContent'

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

const ItemDetailPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ baseUrl, currentPath }) => {
  const router = useRouter()
  const { itemId } = router.query
  const dispatch = useAppDispatch()

  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const getHistory = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getHistoryActionCreator(itemId) as any)
    }
  }, [itemId])

  const getItem = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getItemActionCreator(itemId) as any)
    }
  }, [itemId])

  useEffect(() => {
    getItem()
    getHistory()
  }, [itemId])

  return (
    <Container>
      <CommonMeta baseUrl={baseUrl} currentPath={currentPath} />
      <MediaContainer>
        <MediaInner>
          <MediaContent media={item?.imageURIHTTP} height={480} />
        </MediaInner>
      </MediaContainer>
      <DetailContainer>
        <ItemDetail />
        <History />
      </DetailContainer>
    </Container>
  )
}

export default ItemDetailPage

const Container = styled.div`
  background: ${color.white};
  padding-top: 72px;
  margin: auto;
  min-height: 1200px;
`

const MediaContainer = styled.div`
  background: ${color.background.bague};

  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 64px 0;
  background: #f5f5f5
    linear-gradient(0deg, rgb(230, 230, 230) 60%, rgba(230, 230, 230, 0) 100%);
  ${media.sp`
    padding:0;
  `}
`

const MediaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const DetailContainer = styled.div`
  /* background: ${color.white}; */
  display: grid;
  width: 100%;
  margin: auto;
  /* padding: 0 128px; */
  ${media.lg`
    max-width:1040px;
    gap: 128px;
    grid-template-columns: 1fr 1fr;
  `}
  ${media.md`
    width:100%;
    padding:0 24px;
    gap: 64px;
    grid-template-columns: 1fr 1fr;
  `}
  ${media.sp`
    width:100%;
    padding:0 24px;
    gap: 64px;
    grid-template-rows: 1fr 1fr;
  `}
`
