import React from 'react'
import styled from '@emotion/styled'
import { font, color, media } from '../../../style'
import { Item } from '@kyuzan/mint-sdk-js'
import { addDays } from 'date-fns'
import { ActiveCard } from '../../molecules/Card/active'
// import { EndedCard } from '../../molecules/Card/ended'
// import { ReadyCard } from '../../molecules/Card/ready'

export const Presentation: React.VFC = () => {
  return (
    <Container>
      <Hero>
        <Image src={'/images/items/collection003/008.jpg'} alt="" />
        <HeroContents>
          <Collection>Collection001</Collection>
          <Title>球体関節人形</Title>
          <SubTitle>作：大竹京 by山岸伸</SubTitle>
        </HeroContents>
      </Hero>
      <Description>hoge</Description>
      <Margin64 />
      <Margin64 />
      <ItemWrap>
        <ActiveCard
          item={{
            ...loseItem,
            name: '球体関節人形 001',
            imageURIHTTP: {
              url: '/images/items/collection002/001.jpg',
              mimeType: 'image',
            },
          }}
        />
        <ActiveCard
          item={{
            ...loseItem,
            name: '球体関節人形 002',
            imageURIHTTP: {
              url: '/images/items/collection002/002.jpg',
              mimeType: 'image',
            },
          }}
        />
        <ActiveCard
          item={{
            ...loseItem,
            name: '球体関節人形 003',
            imageURIHTTP: {
              url: '/images/items/collection002/003.jpg',
              mimeType: 'image',
            },
          }}
        />
        <ActiveCard
          item={{
            ...loseItem,
            name: '球体関節人形 004',
            imageURIHTTP: {
              url: '/images/items/collection002/004.jpg',
              mimeType: 'image',
            },
          }}
        />
      </ItemWrap>
      <Margin128 />
    </Container>
  )
}

const Container = styled.div`
  padding: 72px 0 128px;
`
const Hero = styled.div`
  position: relative;
  background-color: ${color.background.white};
  width: 100%;
  height: calc(50vh - 72px);
  color: ${color.background.white};
  ${media.mdsp`
        height:50vh;
    `}
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroContents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  /* color:${color.background.white}; */
`

const Collection = styled.p`
  ${font.noto.h4};
  margin: 0 0 32px 0;
  color: ${color.background.white};
`

const Title = styled.h1`
  ${font.noto.h1};
  color: ${color.background.white};
  ${media.mdsp`
        ${font.noto.h2};
    `}
`

const SubTitle = styled.h3`
  ${font.noto.h3};
  color: ${color.background.white};
  ${media.mdsp`
        ${font.noto.h4};
    `}
`

const Description = styled.div`
  color: ${color.content.dark};
  ${font.noto.article1};
  margin: 64px auto 0;
  ${media.lg`
        max-width:840px;
        /* margin:auto; */
    `}
  ${media.mdsp`
        width:100%;
        padding:0 32px;
        ${font.noto.article2};
    `}
    p {
    ${font.mont.article1}
  }
`

const Margin128 = styled.div`
  width: 100%;
  height: 128px;
  ${media.mdsp`
        height:256px;
    `}
`
const Margin64 = styled.div`
  width: 100%;
  height: 64px;
  ${media.mdsp`
        height:128px;
    `}
`
const ItemWrap = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr;
  ${media.lg`
        max-width:840px;
        margin:auto;
    `}
  ${media.sp`
        grid-template-columns: 1fr;
    `}
`

const otherWalletAddress = '0x000001'

const loseItem: Item = {
  itemId: '0001',
  type: 'nft',
  physicalOrderStatus: 'shippingInfoIsBlank',
  tradeType: 'auction',
  tokenId: 1,
  name: 'test',
  description: 'ddeded',
  tokenURI: '',
  tokenURIHTTP: '',
  imageURI: '',
  imageURIHTTP: {
    url: '/images/items/collection003/008.jpg',
    mimeType: 'image',
  },
  authorAddress: '0x',
  previews: [
    {
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    },
  ],
  networkId: 4,
  buyerAddress: '0x',
  currentPrice: 2.212,
  currentBidderAddress: otherWalletAddress,
  startAt: new Date(),
  endAt: addDays(new Date(), 1),
  initialPrice: 1,
  //   signatureBuyAuction: undefined,
  //   signatureBidAuction: undefined,
  //   signatureBuyFixedPrice: undefined,
  chainType: 'ethereum',
  collectionId: 'xxxx', // uuidv4
  mintContractAddress: '',
  mintShopContractAddress: '',
  yearCreated: '2021',
  feeRatePermill: 0,
  createdBy: [],
}
