import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../../style'
import { NextPage } from 'next'
import { FormType } from '../../../../components/organisms/ShippingInfo/presentation'
import { ShoppingInfo } from '../../../../components/organisms/ShippingInfo'
import { useAppDispatch, useAppSelector } from '../../../../redux/getStore'
import { submitShippingInfoActionCreator } from '../../../../redux/shippingInfo'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loading = useAppSelector((state) => state.app.shippingInfo.meta.loading)
  const handleSubmit = (shippingInfo: FormType) => {
    dispatch(
      submitShippingInfoActionCreator({
        itemId: router.query.itemId as string,
        data: shippingInfo,
      }) as any
    )
  }
  return (
    <Container>
      <Attention>
        このページは、MintDeveloper用に用意したデモページです。実際の住所を入力しても、商品が届くことはありません。ご注意ください。
      </Attention>
      <InnerContainer>
        <ShoppingInfo loading={loading} onSubmit={handleSubmit} />
      </InnerContainer>
    </Container>
  )
}

export default Page

const Container = styled.div`
  background: ${color.background.bague};
  min-width: 840px;
  min-height: 100vh;
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

const InnerContainer = styled.div`
  min-width: 840px;
  min-height: 100vh;
`
