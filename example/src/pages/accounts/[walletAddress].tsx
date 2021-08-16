import React from 'react'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Account } from '../../components/organisms/Account'
export const getServerSideProps: GetServerSideProps<
  { walletAddress: string },
  { walletAddress: string }
> = async (context) => {
  const walletAddress = context.params?.walletAddress
  if (typeof walletAddress === 'undefined') {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return { props: {} as never }
  }
  return {
    props: {
      walletAddress,
    },
  }
}

const ItemDetailPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return <Account />
}

export default ItemDetailPage
