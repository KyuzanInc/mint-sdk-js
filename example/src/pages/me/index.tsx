import React from 'react'
import { MyPage } from '../../components/organisms/MyPage'
import { wrapper } from '../../redux/getStore'
import CommonMeta from '../../components/atoms/CommonMeta'

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const host = context.req.headers.host
    const baseUrl = `http://${host}`
    const currentPath = context.req.url
    return {
      props: {
        baseUrl,
        currentPath,
      },
    }
  }
)

const Page = ({
  baseUrl,
  currentPath,
}: {
  baseUrl: string
  currentPath: string
}) => {
  return (
    <>
      <CommonMeta
        url={`${currentPath}/${baseUrl}`}
        title={'マイページ'}
        ogpImagePath={`${baseUrl}/images/ogp/ogp.png`}
      />
      <MyPage />
    </>
  )
}

export default Page
