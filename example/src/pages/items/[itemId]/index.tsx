import styled from '@emotion/styled'
import React from 'react'
import CommonMeta from '../../../components/atoms/CommonMeta'
import { MediaContent } from '../../../components/atoms/MediaContent'
import { HistoryList } from '../../../components/organisms/HistoryList'
import { ItemDetail } from '../../../components/organisms/ItemDetail'
import { useAppSelector, wrapper } from '../../../redux/getStore'
import { getHistoryActionCreator } from '../../../redux/history'
import { getItemActionCreator } from '../../../redux/item'
import { color, media } from '../../../style'

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const host = context.req.headers.host
    const baseUrl = `http://${host}`
    const currentPath = context.req.url
    const itemId = context.query['itemId'] as string
    await Promise.all([
      context.store.dispatch(getHistoryActionCreator(itemId) as any),
      context.store.dispatch(getItemActionCreator(itemId) as any),
    ])
    return {
      props: {
        baseUrl,
        currentPath,
      },
    }
  }
)

const ItemDetailPage = ({
  baseUrl,
  currentPath,
}: {
  baseUrl: string
  currentPath: string
}) => {
  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  return (
    <Container>
      <CommonMeta
        url={`${currentPath}/${baseUrl}`}
        title={`${item?.item.name}`}
        ogpImagePath={item?.item.previews[0].url ?? ''}
      />
      <MediaContainer>
        <MediaInner>
          <MediaContent media={item?.item.previews[0]} height={480} />
        </MediaInner>
      </MediaContainer>
      <DetailContainer>
        <ItemDetail />
        <HistoryList />
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
  background: rgb(245 245 245)
    linear-gradient(0deg, rgb(230, 230, 230) 2%, rgba(230, 230, 230, 0) 100%);
  ${media.sp`
    padding:0;
  `}
`

const MediaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const DetailContainer = styled.div`
  display: grid;
  width: 100%;
  margin: auto;
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
