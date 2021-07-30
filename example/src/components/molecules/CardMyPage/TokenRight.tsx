import styled from '@emotion/styled'
import { Token } from '@kyuzan/mint-sdk-js'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { color, font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'

type Props = {
  token: Token
  onWriteShipAddress: () => void
  onViewShipAddress: () => void
}

export const TokenRight: React.VFC<Props> = ({
  token,
  onWriteShipAddress,
  onViewShipAddress,
}) => {
  const withPhysical = token.item.type === 'nftWithPhysicalProduct'
  if (!withPhysical) {
    return (
      <Container>
        <Link passHref href={`/items/${token.item.itemId}`}>
          <Anchor>
            <ReverseButton isLoading={false} label={'商品を見る'} />
          </Anchor>
        </Link>
      </Container>
    )
  }

  const { physicalOrderStatus } = token.item
  if (physicalOrderStatus === 'shippingInfoIsBlank') {
    return (
      <Container>
        <Image
          layout={'fixed'}
          width={222}
          height={36}
          src={'/images/STEP1.svg'}
        />
        <Description>
          フィジカルアイテムの配送先の住所を入力してください
        </Description>
        <InputAddressButton
          isLoading={false}
          onClick={onWriteShipAddress}
          label={'配送先の住所を入力する'}
        />
      </Container>
    )
  }
  if (physicalOrderStatus === 'wip') {
    return (
      <Container>
        <Image
          layout={'fixed'}
          width={222}
          height={36}
          src={'/images/STEP2.svg'}
        />
        <Description>商品が発送されるまでお待ちください</Description>
        <ReverseButton
          isLoading={false}
          onClick={onViewShipAddress}
          label={'配送先の住所を確認する'}
        />
      </Container>
    )
  }
  if (physicalOrderStatus === 'shipped') {
    return (
      <Container>
        <Image
          layout={'fixed'}
          width={222}
          height={36}
          src={'/images/STEP3.svg'}
        />
        <Description>商品が到着するまでお待ちください</Description>
        <ReverseButton
          isLoading={false}
          onClick={onViewShipAddress}
          label={'配送先の住所を確認する'}
        />
      </Container>
    )
  }
  return null
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const InputAddressButton = styled(PrimaryLoadingButton)`
  line-height: 19px;
`

const ReverseButton = styled(PrimaryLoadingButton)`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${color.primary};
  color: ${color.primary};
  &:hover{
    background-color: ${color.content.superLight};
  }
`

const Description = styled.p`
  ${font.mont.subtitle2}
  color: ${color.primary};
  text-align: center;
`
