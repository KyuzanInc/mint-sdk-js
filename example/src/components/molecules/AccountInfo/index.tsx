import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { color, font } from '../../../style'
import { Anchor } from '../../atoms/Anchor'
import { WalletAddressWithClipBoard } from '../WalletAddressWithClipBoard'
import { PrimaryLoadingButton } from '../../atoms/LoadingBotton'

type Props = {
  //
  loading: boolean
  profileUrl: string | undefined
  displayName: string | undefined
  bio: string | undefined
  isShowEditButton: boolean
  onEdit: (() => void) | undefined
  walletAddress: string | undefined
  instagramAccountName: string | undefined
  twitterAccountName: string | undefined
  siteUrl: string | undefined
}

export const AccountInfo: React.VFC<Props> = ({
  displayName,
  bio,
  walletAddress,
  profileUrl,
  instagramAccountName,
  twitterAccountName,
  siteUrl,
  loading,
  onEdit,
}) => {
  if (loading) {
    return (
      <Container>
        <Skeleton circle={true} height={120} width={120} />
        <DisplayName>
          <Skeleton width={100} />
        </DisplayName>
        <WalletAddressContainer>
          <Skeleton width={60} />
        </WalletAddressContainer>
        <Bio>
          <Skeleton width={200} height={40} />
        </Bio>
      </Container>
    )
  }
  return (
    <Container>
      <AvatarContainer>
        {typeof profileUrl === 'undefined' && (
          <Jazzicon diameter={120} seed={jsNumberForAddress(walletAddress)} />
        )}
      </AvatarContainer>
      <DisplayName>{displayName}</DisplayName>
      <WalletAddressContainer>
        <WalletAddressWithClipBoard walletAddress={walletAddress ?? ''} />
      </WalletAddressContainer>
      <Bio>{bio}</Bio>
      <LinksContainer>
        {typeof twitterAccountName !== 'undefined' && (
          <Link href={`https://twitter.com/${twitterAccountName}`} passHref>
            <Anchor target={'_blank'} referrerPolicy={'no-referrer'}>
              <LinksButton>
                <Image
                  src={'/images/icons/twitter.svg'}
                  layout={'fixed'}
                  width={24}
                  height={24}
                />
              </LinksButton>
            </Anchor>
          </Link>
        )}
        {typeof instagramAccountName !== 'undefined' && (
          <Link
            href={`https://www.instagram.com/${instagramAccountName}`}
            passHref
          >
            <Anchor target={'_blank'} referrerPolicy={'no-referrer'}>
              <LinksButton>
                <Image
                  src={'/images/icons/instagram.svg'}
                  layout={'fixed'}
                  width={24}
                  height={24}
                />
              </LinksButton>
            </Anchor>
          </Link>
        )}
        {typeof siteUrl !== 'undefined' && (
          <Link href={siteUrl} passHref>
            <Anchor target={'_blank'} referrerPolicy={'no-referrer'}>
              <LinksButton>
                <Image
                  src={'/images/icons/home.svg'}
                  layout={'fixed'}
                  width={24}
                  height={24}
                />
              </LinksButton>
            </Anchor>
          </Link>
        )}
      </LinksContainer>
      {onEdit && (
        <EditButton>
          <PrimaryLoadingButton
            label={'編集'}
            isLoading={false}
            onClick={onEdit}
          />
        </EditButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
`

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
`

const DisplayName = styled.div`
  ${font.lg.h3}
  margin-top: 24px;
`

const WalletAddressContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Bio = styled.div`
  ${font.lg.caption}
  color: ${color.content.gray};
  line-height: 1.6;
  text-align: center;
  min-width: 0px;
  max-width: 480px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin-top: 8px;
`

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`

const LinksButton = styled.div`
  width: 44px;
  height: 44px;
  background-color: ${color.content.gray2};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
`

const EditButton = styled.div`
  margin-top: 24px;
`
