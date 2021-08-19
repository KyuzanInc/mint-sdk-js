import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import { color, font } from '../../../style'
import { NetworkId } from '@kyuzan/mint-sdk-js'
import { getTransactionLink } from '../../../util/getTransactionLink'

type Props = {
  networkId: NetworkId
  hash: string
}

export const TransactionStatus: React.FC<Props> = ({ networkId, hash }) => {
  const url = getTransactionLink(hash, networkId)
  return (
    <Container>
      <StatusContainer>
        <Title>ステータス</Title>
        <Status>処理中</Status>
      </StatusContainer>
      <TransactionContainer>
        <Title>トランザクション</Title>
        <TransactionLink href={url} target="blank">
          トランザクションをみる
          <LinkContainer>
            <Image
              src={'/images/external-link.svg'}
              layout={'fixed'}
              width={24}
              height={24}
            />
          </LinkContainer>
        </TransactionLink>
      </TransactionContainer>
    </Container>
  )
}

const Container = styled.div`
  border: 0.5px solid ${color.content.gray2};
  border-radius: 4px;
  padding: 16px;
  height: 74px;
  display: flex;
  background-color: ${color.white};
`

const StatusContainer = styled.div`
  margin-right: 32px;
`

const Title = styled.div`
  ${font.mont.caption}
  color: ${color.content.middle};
`

const Status = styled.p`
  margin-top: 8px;
  ${font.mont.label}
  color: ${color.content.dark};
`

const TransactionContainer = styled.div``
const TransactionLink = styled.a`
  ${font.mont.subtitle2}
  color: ${color.primary};
  display: flex;
  margin-top: 2px;
  align-items: center;
  text-decoration: none;
`
const LinkContainer = styled.div`
  margin-left: 4px;
`
