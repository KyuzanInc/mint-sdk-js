import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image';
import { color, curve, font } from '../../../style'
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
      <InnerContainer>
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
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  max-height: 74px;
  width: 100%;
  max-width: 310px;
  display: flex;
  background-color: ${color.white};
`

const InnerContainer = styled.div`
  border: 0.5px solid ${color.content.gray2};
  border-radius: 4px;
  padding: 5%;
  width: 100%;
  display: flex;
  background-color: ${color.white};
`

const StatusContainer = styled.div`
  margin-right: 4%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${font.mont.caption}
  color: ${color.content.middle};
  @media (max-width: 480px) {
    font-size: 10px;
  };
`

const Status = styled.div`
  align-items: center;
  ${font.mont.label}
  line-height: 24px;
  color: ${color.content.dark};
  height: 24px;
  @media (max-width: 480px) {
    font-size: 10px;
  };
  margin: 2px 0;
`

const TransactionContainer = styled.div`
  width: 70%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`
const TransactionLink = styled.a`
  ${font.mont.subtitle2}
  color: ${color.primary};
  display: flex;
  align-items: center;
  text-decoration: none;
  @media (max-width: 480px) {
    font-size: 12px;
  };
`
const LinkContainer = styled.div`
  margin-left: 2%;
`
