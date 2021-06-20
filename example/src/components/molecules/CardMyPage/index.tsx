import styled from '@emotion/styled'
import { Item, Token } from '@kyuzan/mint-sdk-js'
import { isBefore } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { color, font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'
import { MediaContent } from '../../atoms/MediaContent'
import { Tag } from '../../atoms/Tag'
import { AuctionInfo } from '../AuctionInfo'
import { TokenRight } from './TokenRight'

type Props = {
  loading: boolean
  userWalletAddress?: string
  item?: Item | Token
  onShowShippingInfo?: () => void
  onWithdraw?: () => void
  withdrawing?: boolean
}

export const CardMyPage: React.VFC<Props> = ({
  loading,
  item,
  userWalletAddress,
  onWithdraw,
  onShowShippingInfo,
  withdrawing,
}) => {
  const router = useRouter()
  // TODO: 固定価格販売
  if (loading || typeof item === 'undefined') {
    return (
      <Container>
        <MediaContainer>
          <MediaContent media={item?.previews[0]} height={240} />
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
  if (isToken(item)) {
    return (
      <Container>
        <MediaContainer>
          <MediaContent media={item?.previews[0]} height={240} />
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
            <AuctionInfo
              startAt={item.item.startAt}
              endAt={item.item.endAt}
              tradeType={item.item.tradeType}
              networkId={item.item.networkId}
              initialPrice={item.item.initialPrice}
              currentPrice={item.item.currentPrice}
            />
          </AuctionInfoContainer>
        </Center>
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
        <MediaContainer>
          <MediaContent media={item?.previews[0]} height={240} />
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
            <AuctionInfo
              startAt={item.startAt}
              endAt={item.endAt}
              tradeType={item.tradeType}
              networkId={item.networkId}
              initialPrice={item.initialPrice}
              currentPrice={item.currentPrice}
            />
          </AuctionInfoContainer>
        </Center>
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
              <Link passHref href={`/items/${item.itemId}`}>
                <Anchor>
                  <ReverseButton isLoading={false} label={'商品を見る'} />
                </Anchor>
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
              <Link passHref href={`/items/${item.itemId}`}>
                <Anchor>
                  <ReverseButton isLoading={false} label={'商品を見る'} />
                </Anchor>
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

const isToken = (target: any): target is Token => {
  return typeof target?.item !== 'undefined'
}

const Container = styled.article`
  overflow: hidden;
  max-width: 840px;
  display: flex;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
`

const MediaContainer = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
`

const Center = styled.div`
  width: 316px;
  padding: 32px;
`
const VerticalLine = styled.div`
  border-left: thin solid ${color.content.gray};
  margin: 32px 0;
`
const CenterTitleContainer = styled.div``

const CenterTitle = styled.h1`
  ${font.lg.h3}
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
  margin-top: 32px;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 254px;
  padding: 32px;
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

const WonTitle = styled.div`
  ${font.lg.subtitle2};
  color: ${color.primary};
  display: flex;
  align-items: center;
`

const WonDescription = styled.div`
  ${font.lg.overline};
`

const WinningTitle = styled.div`
  ${font.lg.subtitle2};
  color: ${color.subColor.blue};
  display: flex;
  align-items: center;
`

const LosingTitle = styled.div`
  ${font.lg.subtitle2};
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
  margin-top: 32px;
  width: 100%;
`

const DisabledButton = styled(PrimaryLoadingButton)`
  background-color: ${color.content.middle};
  margin-top: 32px;
  width: 100%;
  cursor: not-allowed;
`
