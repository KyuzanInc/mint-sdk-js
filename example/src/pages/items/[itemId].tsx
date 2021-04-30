import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Media } from '../../components/molecules/Card'
import { BidButton } from '../../components/molecules/Detail/BidButton'
import { StatusDetail } from '../../components/molecules/Detail/StatusDetail'
import { Link } from '../../components/atoms/Link'
import { HistoryComponent } from '../../components/organisms/History'
import { useAppDispatch, useAppSelector } from '../../redux/getStore'
import { getItemActionCreator, ItemDetail } from '../../redux/item'
import { color, font } from '../../style'

const ItemDetailPage = () => {
  const router = useRouter()
  const { itemId } = router.query
  const dispatch = useAppDispatch()

  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const waitingItem = useAppSelector((state) => {
    return state.app.item.meta.waitingItemAction
  })

  const getItem = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getItemActionCreator(itemId) as any)
    }
  }, [itemId])

  const onClick = useCallback(() => {
    //TODO: onclick event
  }, [])

  useEffect(() => {
    getItem()
  }, [itemId])

  if (waitingItem) {
    return <div>Loading...</div>
  }
  return (
    <Container>
      <MediaContainer>
        <MediaContent media={item?.imageURIHTTP}></MediaContent>
      </MediaContainer>
      <DetailContainer>
        <Detail>
          <Title>{item?.name}</Title>
          <StatusDetail item={item} />
          <BidButton label={'PLACE A BID'} onClick={onClick} />
          <Description>{item?.description}</Description>
          <ExternalLinkUL>
            <ExternalLinkList>
              {item?.tokenURIHTTP ? (
                <Link label={'View On IPFS'} href={item?.tokenURIHTTP} />
              ) : null}
            </ExternalLinkList>
            <ExternalLinkList>
              <Link label={'View On OpenSea'} href={getOpenSeaLink(item)} />
            </ExternalLinkList>
            <ExternalLinkList>
              <Link label={'View On Etherscan'} href={''} />
            </ExternalLinkList>
          </ExternalLinkUL>
        </Detail>
        <HistoryComponent itemId={itemId} />
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
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 150px;
`
const Detail = styled.div`
  width: 426px;
  padding: 64px 0;
  margin-right: 128px;
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
const Description = styled.div`
  ${font.lg.body1}
  min-height: 192px;
`

const ExternalLinkUL = styled.ul`
  display: flex;
  flex-direction: column;
`

const ExternalLinkList = styled.li`
  margin: 16px 0px 0 0;
  width: 100%;
`

const getOpenSeaLink = (item: ItemDetail) => {
  const networkId = item?.networkId
  const contactAddress = item?.mintContractAddress
  const tokenId = item?.tokenId
  if (networkId === 1) {
    return `https://opensea.io/assets/${contactAddress}/${tokenId}`
  }

  if (networkId === 4) {
    return `https://testnets.opensea.io/assets/${contactAddress}/${tokenId}`
  }

  return ''
}
