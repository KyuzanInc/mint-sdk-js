import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { color, font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import {PrimaryButton} from '../../atoms/PrimaryButton'

type Props = {
  onSubmit: (data: FormType) => void
  loading: boolean
}

export type FormType = {
  firstName: string
  lastName: string
  postalCode: string
  prefecture: string
  city: string
  address1: string
  address2: string
  tel: string
  email: string
  memo: string
}

export const ShippingInfo: React.VFC<Props> = ({ loading, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormType>()
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>配送先の住所を入力</Title>
        <FormContainer>
          <FormGroup>
            <Label>氏名</Label>
            <InputContainner>
              <Input
                fullWidth={false}
                {...register('lastName', { required: true })}
                placeholder={'田中'}
              />
              <Input
                fullWidth={false}
                {...register('firstName', { required: true })}
                placeholder={'太郎'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>郵便番号</Label>
            <InputContainner>
              <Input
                fullWidth={false}
                {...register('postalCode', { required: true })}
                placeholder={'1506136'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>都道府県</Label>
            <InputContainner>
              <Input
                fullWidth={false}
                {...register('prefecture', { required: true })}
                placeholder={'東京都'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>市区町村</Label>
            <InputContainner>
              <Input
                fullWidth={true}
                {...register('city', { required: true })}
                placeholder={'渋谷区'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>町名・番地</Label>
            <InputContainner>
              <Input
                fullWidth={true}
                {...register('address1', { required: true })}
                placeholder={'渋谷2-24-12'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>建物名・部屋番号</Label>
            <InputContainner>
              <Input
                fullWidth={true}
                {...register('address2', { required: true })}
                placeholder={'渋谷スクランブルスクエア39F WeWork'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>電話番号</Label>
            <InputContainner>
              <Input
                fullWidth={true}
                {...register('tel', { required: true })}
                placeholder={'09000000000'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>メールアドレス</Label>
            <InputContainner>
              <Input
                fullWidth={true}
                {...register('email', { required: true })}
                placeholder={'contact@kyuzan.com'}
              />
            </InputContainner>
          </FormGroup>
          <FormGroup>
            <Label>備考</Label>
            <InputContainner>
              <Memo {...register('memo')} placeholder={'自由入力'} />
            </InputContainner>
          </FormGroup>
        </FormContainer>
        <ButtonsContainer>
          <Link href={'/me'} passHref>
            <Anchor>
              <BackButton isLoading={false} label={'マイページに戻る'} />
            </Anchor>
          </Link>
          <PrimaryButton isLoading={loading} label={'保存する'} />
        </ButtonsContainer>
      </form>
    </Container>
  )
}

const Container = styled.div``

const Title = styled.h1`
  margin-top: 64px;
  ${font.mont.h3}
  text-align: center;
`

const FormContainer = styled.div`
  width: 640px;
  margin: 32px auto 0;
  padding: 64px 40px;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
`

const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 64px;
`

const Label = styled.span`
  ${font.mont.subtitle2}
  width: 160px;
`

const InputContainner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Input = styled.input<{ fullWidth: boolean }>`
  background: ${color.background.bague};
  border: 0.5px solid ${color.content.light};
  box-sizing: border-box;
  border-radius: 4px;
  ${font.mont.body1}
  padding: 12px 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '184px')};
`

const Memo = styled.textarea`
  background: ${color.background.bague};
  border: 0.5px solid ${color.content.light};
  box-sizing: border-box;
  border-radius: 4px;
  ${font.mont.body1}
  padding: 12px 16px;
  width: 100%;
`

const ButtonsContainer = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const BackButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 1px solid ${color.primary};
  color: ${color.primary};
  margin-right: 16px;
`
