import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Media } from '../../components/molecules/Card'
import { useAppDispatch, useAppSelector } from '../../redux/getStore'
import { getItemActionCreator } from '../../redux/item'
import { color, font } from '../../style'

const ItemDetailPage = () => {
  const router = useRouter()
  const { itemId } = router.query
  const dispatch = useAppDispatch()
  const item = useAppSelector((state) => {
    return state.app.item
  })
  // const waitingItem = useAppSelector((state) => {
  //   return state.app.item.meta.waitingItemAction
  // })
  const getItem = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getItemActionCreator(itemId) as any)
    }
  }, [itemId])

  useEffect(() => {
    getItem()
  }, [itemId])
  return (
    <Container>
      <MediaContainer>
        <MediaContent media={item.data?.imageURIHTTP}></MediaContent>
      </MediaContainer>
      <DetailContainer>
        <Detail>
          <Title>{item.data?.name}</Title>
        </Detail>
      </DetailContainer>
    </Container>
  )
}

export default ItemDetailPage

const MediaContent: React.FC<{ media: Media | undefined }> = ({ media }) => {
  if (!media) {
    return <Skeleton height={480} />
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
  max-height: 673px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 150px;
`
const Detail = styled.div`
  max-width: 426px;
  padding: 64px 0;
`

const Title = styled.div`
  ${font.lg.h2}
  height: 2.6em;
`
const Image = styled.img`
  object-fit: cover;
  height: 480px;
`

const Video = styled.video`
  object-fit: cover;
`
