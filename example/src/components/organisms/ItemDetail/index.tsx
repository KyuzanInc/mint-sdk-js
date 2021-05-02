import styled from '@emotion/styled'
import React, { ReactNode, useCallback } from 'react'
import { useAppSelector } from '../../../redux/getStore'
import { ItemDetail } from '../../../redux/item'
import { font } from '../../../style'
import { ExternalLink } from '../../atoms/ExternalLink'
import { BidButton } from '../../molecules/Button/bid'
import { StatusDetail } from '../../molecules/Detail'
import { LoadingItemDetailComponent } from './loading'

type Props = {
  children?: ReactNode
}

export const ItemDetailComponent: React.FC<Props> = () => {
  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const waitingItem = useAppSelector((state) => {
    return state.app.item.meta.waitingItemAction
  })

  const onClick = useCallback(() => {
    //TODO: onclick event
  }, [])

  if (waitingItem) {
    return <LoadingItemDetailComponent />
  }

  return (
    <Detail>
      <Title>{item?.name}</Title>
      <StatusDetail item={item} />
      <BidButton label={'PLACE A BID'} onClick={onClick} />
      <Description>{item?.description}</Description>
      <ExternalLinkUL>
        <ExternalLinkList>
          {item?.buyerAddress ? (
            <ExternalLink
              label={'View On IPFS'}
              href={item?.tokenURIHTTP ?? ''}
            />
          ) : null}
        </ExternalLinkList>
        <ExternalLinkList>
          {item?.buyerAddress ? (
            <ExternalLink
              label={'View On OpenSea'}
              href={getOpenSeaLink(item)}
            />
          ) : null}
        </ExternalLinkList>
      </ExternalLinkUL>
    </Detail>
  )
}

export const Detail = styled.div`
  width: 426px;
  padding: 64px 0;
  margin-right: 128px;
`

export const Title = styled.div`
  ${font.lg.h2}
  height: 2.6em;
`

export const Description = styled.div`
  ${font.lg.body1}
  min-height: 192px;
`

export const ExternalLinkUL = styled.ul`
  display: flex;
  flex-direction: column;
`

export const ExternalLinkList = styled.li`
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

  if (networkId === 137) {
    return `https://matic.opensea.io/`
  }

  if (networkId === 80001) {
    // TODO: fix link
    return ''
  }

  return ''
}
