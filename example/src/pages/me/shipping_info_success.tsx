import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../style'
import { NextPage } from 'next'
import Link from 'next/link'
import { Anchor } from '../../components/atoms/Anchor'
import { PrimaryButton } from '../../components/atoms/PrimaryButton'

const Page: NextPage = () => {
  return (
    <Container>
      <Attention>
        このページは、MintDeveloper用に用意したデモページです。実際の住所を入力しても、商品が届くことはありません。ご注意ください。
      </Attention>
      <Description>
        配送先の住所が登録されました。
        <br />
        商品が発送されるまでしばらくお待ちください
      </Description>
      <ButtonContainer>
        <Link href={'/me'} passHref>
          <Anchor>
            <BackButton isLoading={false} label={'マイページに戻る'} />
          </Anchor>
        </Link>
      </ButtonContainer>
    </Container>
  )
}

export default Page

const Container = styled.div`
  background: ${color.background.bague};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 72px;
  margin: auto;
  padding-bottom: 64px;
`

const Attention = styled.div`
  width: 100%;
  background-color: ${color.secondary};
  ${font.mont.subtitle1}
  padding: 32px;
  color: ${color.white};
  text-align: center;
`

const Description = styled.p`
  ${font.mont.subtitle1}
  margin-top: 64px;
  text-align: center;
  line-height: 2;
`

const ButtonContainer = styled.div`
  margin-top: 64px;
`

const BackButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 1px solid ${color.primary};
  color: ${color.primary};
  margin-right: 16px;
`
