import React from 'react'
import styled from '@emotion/styled'
import { ItemLog, NetworkId } from '@kyuzan/mint-sdk-js'
import { format } from 'date-fns'
import { color, font } from '../../../style'
import { DefaultAvatarIcon } from '../../atoms/DefaultAvatarIcon'
import { LoadingHistoryCard } from './loading'
import Link from 'next/link'
import { Anchor } from '../../atoms/Anchor'

type Props = {
  log?: ItemLog & { avatarImgUrl?: string }
  networkId?: NetworkId
  loading: boolean
}

export const HistoryCard: React.FC<Props> = ({ log, networkId, loading }) => {
  if (loading) return <LoadingHistoryCard />
  if (!log) return <LoadingHistoryCard />
  const price = log?.price
  const date = format(log.createAt, 'yyyy/MM/dd HH:mm')
  const link = getLink(log.transactionHash, networkId)

  return (
    <HistoryContainer>
      <Link href={`/accounts/${log.accountAddress}`} passHref>
        <Anchor>
          <Avatar>
            {log.avatarImgUrl ? (
              <AvatarImage src={log.avatarImgUrl} />
            ) : (
              <DefaultAvatarIcon size={44} name={log.accountAddress} />
            )}
          </Avatar>
        </Anchor>
      </Link>

      <BidderDetail>
        <BidderId>{log.accountAddress}</BidderId>
        <BidTime>{date}</BidTime>
      </BidderDetail>
      <Link href={link} passHref>
        <Anchor target={'_blank'}>
          <BidPrice>
            {price} ETH
            <Icon src={'/images/external-link.svg'} />
          </BidPrice>
        </Anchor>
      </Link>
    </HistoryContainer>
  )
}

export const HistoryContainer = styled.div`
  width: 426px;
  height: 70px;
  padding: 8px 16px 8px 16px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  background: ${color.white};
  text-decoration: none;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
`

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  margin: 4.5px 16px 4.5px 0;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`

export const BidderDetail = styled.div`
  width: 200px;
  overflow-wrap: break-word;
`
export const BidderId = styled.div`
  ${font.lg.caption}
`
export const BidTime = styled.div`
  padding: 4px 0 0 0;
  ${font.lg.caption}
  color: ${color.content.gray1};
`
export const BidPrice = styled.div`
  min-width: 100px;
  ${font.lg.subtitle1}
  justify-content: center;
  display: flex;
  margin: auto;
`
export const Icon = styled.img`
  text-align: center;
  margin-left: 4px;
`

const AvatarImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const getLink = (hash: string, networkId?: NetworkId) => {
  if (networkId === 1) {
    return `https://etherscan.io/tx/${hash}`
  }

  if (networkId === 4) {
    return `https://rinkeby.etherscan.io/tx/${hash}`
  }

  if (networkId === 137) {
    return `https://explorer-mainnet.maticvigil.com/tx/${hash}`
  }

  if (networkId === 80001) {
    return `https://explorer-mumbai.maticvigil.com/tx/${hash}`
  }

  return ''
}
