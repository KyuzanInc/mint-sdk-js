import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Media } from '../../components/molecules/Card'
import { HistoryComponent } from '../../components/organisms/History'
import { useAppDispatch, useAppSelector } from '../../redux/getStore'
import { getItemActionCreator } from '../../redux/item'
import { color } from '../../style'
import { ItemDetailComponent } from '../../components/organisms/ItemDetail'
import { getHistoryActionCreator } from '../../redux/history'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import CommonMeta from '../../components/atoms/CommonMeta'

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
        <MediaContent media={item?.imageURIHTTP} />
      </MediaContainer>
      <DetailContainer>
        <ItemDetailComponent />
        <HistoryComponent />
      </DetailContainer>
    </Container>
  )
}

export default ItemDetailPage

const MediaContent: React.FC<{ media: Media | undefined }> = ({ media }) => {
  const waitingItem = useAppSelector((state) => {
    return state.app.item.meta.waitingItemAction
  })

  if (waitingItem || !media) {
    return <Skeleton height={480} width={1440} />
  }
  const type = media.mimeType.split('/')[0]
  const src = media.url
  if (type === 'image') {
    return <Image src={src} loading="lazy" />
  }
  return <Video src={src} height={'480px'} autoPlay loop preload="auto" muted />
}

const Container = styled.div`
  background: ${color.white};
  padding-top: 72px;
  margin: auto;
  min-height: 1200px;
`

const MediaContainer = styled.div`
  background: ${color.background.bague};
  max-height: 480px;
  display: flex;
  justify-content: center;
  width: 100%;
`

const DetailContainer = styled.div`
  background: ${color.white};
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 150px;
`
const Image = styled.img`
  object-fit: cover;
  height: 480px;
`

const Video = styled.video`
  object-fit: cover;
`
