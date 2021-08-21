import React from 'react'
import { Account } from '../../components/organisms/Account'
import { useAppSelector, wrapper } from '../../redux/getStore'
import { getAccountInfoActionCreator } from '../../redux/myAccountInfo'
import { getTokensActionCreator } from '../../redux/accountTokens'
import styled from '@emotion/styled'
import { color } from '../../style'
import CommonMeta from '../../components/atoms/CommonMeta'

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const host = context.req.headers.host
    const baseUrl = `http://${host}`
    const currentPath = context.req.url
    const walletAddress = context.query['walletAddress'] as string
    if (typeof walletAddress === 'undefined') {
      context.res.writeHead(302, { Location: '/' })
      context.res.end()
      return { props: {} as never }
    }
    await Promise.all([
      context.store.dispatch(
        getAccountInfoActionCreator({ walletAddress }) as any
      ),
      context.store.dispatch(getTokensActionCreator({ walletAddress }) as any),
    ])

    return {
      props: {
        baseUrl,
        currentPath,
        walletAddress,
      },
    }
  }
)

const Page = ({
  baseUrl,
  currentPath,
  walletAddress,
}: {
  baseUrl: string
  currentPath: string
  walletAddress: string
}) => {
  const accountInfo = useAppSelector(
    (state) => state.app.accountInfo.data.accountInfoMap[walletAddress]
  )
  return (
    <Container>
      <CommonMeta
        url={`${currentPath}/${baseUrl}`}
        title={`${walletAddress}`}
        ogpImagePath={accountInfo.avatarImgUrl}
      />
      <Account />
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
  padding-top: 144px;
  margin: auto;
`
