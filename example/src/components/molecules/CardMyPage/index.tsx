import styled from '@emotion/styled'
import { Item, Token } from '@kyuzan/mint-sdk-js'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { color, font } from '../../../style'
import { getItemChainName } from '../../../util/getItemChainName'
import { Anchor } from '../../atoms/Anchor'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'
import { MediaContent } from '../../atoms/MediaContent'
import { Tag } from '../../atoms/Tag'
import { AuctionInfo } from '../AuctionInfo'

type Props = {
  loading: boolean
  userWalletAddress?: string
  item?: Item | Token
  onWithdraw?: () => void
  withdrawing?: boolean
}

export const CardMyPage: React.VFC<Props> = ({
  loading,
  item,
  userWalletAddress,
  onWithdraw,
  withdrawing,
}) => {
  // TODO: 固定価格販売
  if (loading || typeof item === 'undefined') {
    return (
      <Container>
        <MediaContainer>
          <MediaContent media={item?.previews[0]} width={240} height={240} />
        </MediaContainer>
        <Center>
          <Skeleton width={240} height={160} />
        </Center>
        <Right>
          <Skeleton width={200} height={160} />
        </Right>
      </Container>
    )
  }
  if (isToken(item)) {
    // 商品を見る
    // TODO
    // 物理アイテム付きなら
    // 配送先住所を入力
    // 配送先住所を確認
    return (
      <Container>
        <MediaContainer>
          <MediaContent media={item?.previews[0]} width={240} height={240} />
        </MediaContainer>
        <Center>
          <CenterTitleContainer>
            <CenterTitle>{item?.name}</CenterTitle>
          </CenterTitleContainer>
          <CenterTagsContainer>
            <Tag>{getItemChainName(item.item)}</Tag>
          </CenterTagsContainer>
          <AuctionInfoContainer>
            <AuctionInfo item={item.item} />
          </AuctionInfoContainer>
        </Center>
        <Right>
          <Link passHref href={`/items/${item.item.itemId}`}>
            <Anchor>
              <ReverseButton isLoading={false} label={'商品を見る'} />
            </Anchor>
          </Link>
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

    return (
      <Container>
        <MediaContainer>
          <MediaContent media={item?.previews[0]} width={240} height={240} />
        </MediaContainer>
        <Center>
          <CenterTitleContainer>
            <CenterTitle>{item?.name}</CenterTitle>
          </CenterTitleContainer>
          <CenterTagsContainer>
            <Tag>{getItemChainName(item)}</Tag>
          </CenterTagsContainer>
          <AuctionInfoContainer>
            <AuctionInfo item={item} />
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
          {won && (
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
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  width: 250px;
  padding: 32px 0;
`

const CenterTitleContainer = styled.div``

const CenterTitle = styled.h1`
  ${font.lg.h3}
`

const CenterTagsContainer = styled.div`
  margin-top: 8px;
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
