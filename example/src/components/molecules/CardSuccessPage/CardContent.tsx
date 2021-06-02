import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { font } from '../../../style'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'
import { TwitterButton } from '../../atoms/TwitterButton'

type Props = {
  url: string
  tweetUrl: string
}

export const CardContent: React.VFC<Props> = ({ url, tweetUrl }) => {
  return (
    <Container>
      <Typography>Congratulation on getting your NFT !</Typography>
      <Description>
        NFTの購入が完了しました。
        <br />
        NFTは購入完了処理後、あなたのウォレットで確認できるようになります。
        <br />
      </Description>
      <ButtonList>
        <Link passHref href={url}>
          <MyPageButton isLoading={false} label={'マイページへ'} />
        </Link>
        <Link passHref href={tweetUrl}>
          <TwitterButton />
        </Link>
      </ButtonList>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 44px 42px;
`

const Typography = styled.h2`
  ${font.lg.h2}
  color: #FF8C00;
  background: -webkit-linear-gradient(0deg, #fd80a8 0%, #fccf42 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`
const Description = styled.div`
  ${font.lg.body1}
  color: black;
  text-align: left;
  padding: 64px 0;
`

const ButtonList = styled.div`
  display: flex;
  flex-direction: colum;
`

const MyPageButton = styled(PrimaryLoadingButton)`
  width: 290px;
  text-align: center;
  margin-right: 16px;
`
