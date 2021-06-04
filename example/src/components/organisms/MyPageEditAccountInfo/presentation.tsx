import styled from '@emotion/styled'
import Link from 'next/link'
import React, { ChangeEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { color, font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import {
  PrimaryLoadingButton,
  PrimaryLoadingButtonSubmit,
} from '../../atoms/LoadingBotton'
import {
  TextField as BaseTextField,
  TextAreaField as BaseTextAreaField,
} from '../../molecules/TextField'

type Props = {
  onSubmit: (data: Form) => void
  submitting: boolean
  uploadingImg: boolean
  onSelectImg: (e: ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  avatarImgUrl: string
  displayName: string
  bio: string
  twitterAccountName: string
  instagramAccountName: string
  homepageUrl: string
}

type Form = {
  avatarImgUrl: string
  displayName: string
  bio: string
  twitterAccountName: string
  instagramAccountName: string
  homepageUrl: string
}

export const Presentation: React.VFC<Props> = ({
  onSubmit,
  onSelectImg,
  loading,
  submitting,
  uploadingImg,
  avatarImgUrl,
  displayName,
  bio,
  twitterAccountName,
  instagramAccountName,
  homepageUrl,
}) => {
  const { register, handleSubmit, setValue } = useForm<Form>({
    defaultValues: {
      avatarImgUrl: avatarImgUrl,
      displayName: displayName,
      bio: bio,
      twitterAccountName: twitterAccountName,
      instagramAccountName: instagramAccountName,
      homepageUrl: homepageUrl,
    },
  })

  useEffect(() => {
    setValue('avatarImgUrl', avatarImgUrl)
  }, [avatarImgUrl])

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>プロフィール設定</Title>
        {loading ? (
          <FormContainer>
            <Skeleton height={32} style={{ marginBottom: 24 }} />
            <Skeleton width={160} height={32} />
          </FormContainer>
        ) : (
          <>
            <FormContainer>
              <AvatarContainer>
                <Avatar>
                  <Image
                    src={avatarImgUrl || 'https://place-hold.it/400x400'}
                  />
                </Avatar>
                <label htmlFor="avatar">
                  <InputFile
                    accept={'image/png,image/jpeg,image/gif'}
                    id="avatar"
                    type="file"
                    onChange={onSelectImg}
                  />
                  <SelectImgButton
                    isLoading={uploadingImg}
                    label={'ファイルを選択'}
                  />
                </label>
              </AvatarContainer>
              <TextField
                label={'DisplayName'}
                registerReturnVal={register('displayName')}
                placeHolder={'kyuzan'}
              />
              <TextAreaField
                label={'BIO'}
                registerReturnVal={register('bio')}
                placeHolder={'1200字以内'}
              />
              <TextField
                label={'Twitter'}
                registerReturnVal={register('twitterAccountName')}
                placeHolder={'@kyuzan'}
              />
              <TextField
                label={'Instagram'}
                registerReturnVal={register('instagramAccountName')}
                placeHolder={'アカウントネーム'}
              />
              <TextField
                label={'Site URL'}
                registerReturnVal={register('homepageUrl')}
                placeHolder={'https://xxxx.com'}
              />
            </FormContainer>
            <ButtonsContainer>
              <Link href={'/me'} passHref>
                <Anchor>
                  <BackButton isLoading={false} label={'マイページに戻る'} />
                </Anchor>
              </Link>
              <PrimaryLoadingButtonSubmit
                isLoading={submitting}
                label={'保存する'}
              />
            </ButtonsContainer>
          </>
        )}
      </form>
    </Container>
  )
}

const Container = styled.div``

const AvatarContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 64px;
`

const Avatar = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 32px;
`

const InputFile = styled('input')({
  display: 'none',
})

const Image = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
`

const SelectImgButton = styled(PrimaryLoadingButton)``

const Title = styled.h1`
  margin-top: 64px;
  ${font.lg.h3}
  text-align: center;
`

const TextField = styled(BaseTextField)`
  margin-bottom: 64px;
`

const TextAreaField = styled(BaseTextAreaField)`
  margin-bottom: 64px;
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

const ButtonsContainer = styled.div`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const BackButton = styled(PrimaryLoadingButton)`
  background-color: transparent;
  border: 1px solid ${color.primary};
  color: ${color.primary};
  margin-right: 16px;
`
