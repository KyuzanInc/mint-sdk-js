import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Item, Token } from '@kyuzan/mint-sdk-js'
import { isBefore } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { color, font, media } from '../../../style'
import { getPriceUnit } from '../../../util/getItemPriceUnit'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'
import { MediaContent } from '../../atoms/MediaContent'
import { Tag } from '../../atoms/Tag'
import { SaleInfo } from '../SaleInfo'
import { TokenRight } from './TokenRight'

type Props = {
  loading: boolean
  userWalletAddress?: string
  item?: Item | Token
  onShowShippingInfo?: () => void
  onWithdraw?: () => void
  withdrawing?: boolean
  onComplete?: () => void
}

export const CardMyPage: React.VFC<Props> = ({
  loading,
  item,
  userWalletAddress,
  onWithdraw,
  onShowShippingInfo,
  withdrawing,
  onComplete,
}) => {
  const router = useRouter()

  const moduleHeight = 240

  // TODO: 固定価格販売
  if (loading || typeof item === 'undefined') {
    return <Loading />
  }
  if (isToken(item)) {
    return (
      <Container>
        <Left>
          <MediaContainer height={moduleHeight}>
            <MediaContent media={item?.previews[0]} height={moduleHeight} />
          </MediaContainer>
          <Center>
              <CenterTitleContainer>
                <CenterTitle>{item?.name}</CenterTitle>
              </CenterTitleContainer>
              <CenterTagsContainer>
                {item?.item.type === 'nftWithPhysicalProduct' && (
                  <CenterTags
                    label={'フィジカルアイテムつき'}
                    iconPath={'/images/cardboard.svg'}
                  />
                )}
              </CenterTagsContainer>
              <AuctionInfoContainer>
                <SaleInfo
                  startAt={item.item.startAt}
                  endAt={item.item.endAt}
                  tradeType={item.item.tradeType}
                  networkId={item.item.networkId}
                  initialPrice={item.item.initialPrice}
                  currentPrice={item.item.currentPrice}
                  onComplete={onComplete}
                />
              </AuctionInfoContainer>
          </Center>
        </Left>
        <Right>
          <TokenRight
            token={item}
            onViewShipAddress={onShowShippingInfo!}
            onWriteShipAddress={() => {
              router.push(`/me/tokens/${item.item.itemId}/shipping_info`)
            }}
          />
        </Right>
      </Container>
    )
  } else {
    const auctionIsEnd = item.endAt! < new Date()
    const userIsHighestBidder =
      item.currentBidderAddress! === userWalletAddress!
    const winning = !auctionIsEnd && userIsHighestBidder
    const losing = !auctionIsEnd && !userIsHighestBidder
    const won = auctionIsEnd && userIsHighestBidder
    const not5minFromEndAt = isBefore(
      new Date(),
      new Date(item.withdrawableAt!)
    )
    const waitWithDraw = won && not5minFromEndAt

    return (
      <Container>
        <Left>
          <MediaContainer height={moduleHeight}>
            <MediaContent media={item?.previews[0]} height={moduleHeight} />
          </MediaContainer>
          <Center>
            <CenterTitleContainer>
              <CenterTitle>{item?.name}</CenterTitle>
            </CenterTitleContainer>
            <CenterTagsContainer>
              {item?.type === 'nftWithPhysicalProduct' && (
                <CenterTags
                  label={'フィジカルアイテムつき'}
                  iconPath={'/images/cardboard.svg'}
                />
              )}
            </CenterTagsContainer>
            <AuctionInfoContainer>
              <SaleInfo
                startAt={item.startAt}
                endAt={item.endAt}
                tradeType={item.tradeType}
                networkId={item.networkId}
                initialPrice={item.initialPrice}
                currentPrice={item.currentPrice}
                onComplete={onComplete}
              />
            </AuctionInfoContainer>
          </Center>
        </Left>
        <Right>
          {winning && (
            <>
              <RightTitleContainer>
                <WinningTitle>
                  <RightTitleIcon>
                    <Image
                      layout={'fixed'}
                      src={'/images/check-circle.svg'}
                      width={24}
                      height={24}
                    />
                  </RightTitleIcon>
                  競り勝っています
                </WinningTitle>
              </RightTitleContainer>
              <CurrentPriceContainer>
                <CurrentPriceTitle>最新の入札額</CurrentPriceTitle>
                <CurrentPriceValue>{item.currentPrice}</CurrentPriceValue>
                <CurrentPriceUnit>
                  {getPriceUnit(item.networkId)}
                </CurrentPriceUnit>
              </CurrentPriceContainer>
              <Link href={`/items/${item.itemId}`}>
                <ReverseButton isLoading={false} label={'商品を見る'} />
              </Link>
            </>
          )}
          {losing && (
            <>
              <RightTitleContainer>
                <LosingTitle>
                  <RightTitleIcon>
                    <Image
                      layout={'fixed'}
                      src={'/images/alert-triangle.svg'}
                      width={24}
                      height={24}
                    />
                  </RightTitleIcon>
                  競り負けています
                </LosingTitle>
              </RightTitleContainer>
              <CurrentPriceContainer>
                <CurrentPriceTitle>最新の入札額</CurrentPriceTitle>
                <CurrentPriceValue>{item.currentPrice}</CurrentPriceValue>
                <CurrentPriceUnit>
                  {getPriceUnit(item.networkId)}
                </CurrentPriceUnit>
              </CurrentPriceContainer>
              <Link href={`/items/${item.itemId}`}>
                <ReverseButton isLoading={false} label={'商品を見る'} />
              </Link>
            </>
          )}
          {waitWithDraw && (
            <>
              <RightTitleContainer>
                <WonTitle>受け取り待ち</WonTitle>
              </RightTitleContainer>
              <WonDescription>
                おめとうございます。オークションに競り勝ち、NFTを勝ち取りました。オークション終了5分以降に下のボタンからNFTを受け取れます。
              </WonDescription>
              <DisabledButton
                isLoading={withdrawing!}
                label={'NFTを受け取る'}
              />
            </>
          )}
          {won && !waitWithDraw && (
            <>
              <RightTitleContainer>
                <WonTitle>受け取り待ち</WonTitle>
              </RightTitleContainer>
              <WonDescription>
                おめとうございます。オークションに競り勝ち、NFTを勝ち取りました。下のボタンからNFTを受け取り、ウォレットに入れてください
              </WonDescription>
              <PrimaryButton
                isLoading={withdrawing!}
                label={'NFTを受け取る'}
                onClick={onWithdraw}
              />
            </>
          )}
        </Right>
      </Container>
    )
  }
}

const Loading: React.VFC = () => {
  const moduleHeight = 240
  return (
    <Container>
      <MediaContainer height={moduleHeight}>
        <MediaContent waitingItem={true} media={undefined} height={moduleHeight} />
      </MediaContainer>
      <Center>
        <Skeleton width={250} height={20} style={{ margin: '0 0 32px 0' }} />
        <Skeleton width={102} height={24} style={{ marginRight: '8px' }} />
        <Skeleton width={114} height={24} />
      </Center>
      <VerticalLine />
      <Right style={{ alignItems: 'flex-start' }}>
        <Skeleton width={120} height={20} style={{ marginBottom: 16 }} />
        <Skeleton width={222} height={12} count={3} />
        <Skeleton
          width={222}
          height={44}
          style={{ borderRadius: '22px', margin: '16px 0' }}
        />
      </Right>
    </Container>
  )
}

const isToken = (target: any): target is Token => {
  return typeof target?.item !== 'undefined'
}

const Container = styled.article`
  position:relative;
  overflow: hidden;
  width:100%;
  display: flex;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
  flex-direction:row;
  ${media.mdsp`
    flex-direction:column;
  `}
`

const MediaContainer = styled.div<{ height: number }>`
  position: relative;
  display:flex;
  justify-content: center;
  overflow:hidden;
  /* height:${({ height }) => height}; */
  ${props => ({ height: props.height })}
  width:${props => ( props.height )}px;

  ${media.mdsp`
    width:100%;
    
  `}
`


const Left = styled.div`
  position:relative;
  flex-grow: 2;
  background-color:${color.background.bague};
`
const Center = styled.div`
  /* width: 316px; */
  padding: 16px;
  position:absolute;
  right:16px;
  top:50%;
  transform:translate(0px,-50%);
  background-color: rgba(255,255,255,.56);
  backdrop-filter: blur(8px);
  border-radius:8px;
  ${media.lg`
    min-width:266px;
  `}
  ${media.mdsp`
    position:absolute;
    right:16px;
    left:16px;
    bottom:16px;
    top:auto;
    transform:translate(0,0);
  `}
`
const VerticalLine = styled.div`
  border-left: thin solid ${color.content.gray1};
  margin: 32px 0;
`
const CenterTitleContainer = styled.div``

const CenterTitle = styled.h1`
  ${font.mont.h3}
`

const CenterTagsContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const CenterTags = styled(Tag)`
  margin-right: 4px;
`

const AuctionInfoContainer = styled.div`
  margin-top: 8px;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* width: 254px; */
  padding: 32px;
  /* flex-grow: 1; */
  ${media.lg`
    /* min-width:280px; */
    width:280px;
  `}
  ${media.mdsp`
    min-width:100%;
  `}
`

const RightTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
`

const RightTitleIcon = styled.div`
  margin-right: 8px;
`

const CurrentPriceContainer = styled.div`
  margin-bottom: 24px;
`

const CurrentPriceTitle = styled.p`
  ${font.mont.label}
  margin-bottom: 8px;
`

const CurrentPriceValue = styled.span`
  ${font.mont.h4}
`

const CurrentPriceUnit = styled.span`
  ${font.mont.overline}
`

const WonTitle = styled.div`
  ${font.mont.subtitle2};
  color: ${color.primary};
  display: flex;
  align-items: center;
`

const WonDescription = styled.div`
  ${font.mont.overline};
`

const WinningTitle = styled.div`
  ${font.mont.subtitle2};
  color: ${color.subColor.blue};
  display: flex;
  align-items: center;
`

const LosingTitle = styled.div`
  ${font.mont.subtitle2};
  color: ${color.utils.error};
  display: flex;
  align-items: center;
`

const ReverseButton = styled(PrimaryLoadingButton)`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${color.primary};
  color: ${color.primary};
`

const PrimaryButton = styled(PrimaryLoadingButton)`
  margin-top: 16px;
  width: 100%;
`

const DisabledButton = styled(PrimaryLoadingButton)`
  background-color: ${color.content.middle};
  margin-top: 16px;
  width: 100%;
  cursor: not-allowed;
`
