import Head from 'next/head'
import React from 'react'

type Props = {
  baseUrl?: string
  title?: string
  description?: string
  ogpImagePath?: string
  currentPath?: string
}

const CommonMeta: React.FC<Props> = ({
  baseUrl = '',
  title = 'Mint デモショップ | あなたのNFTショップ構築に並走します',
  description = 'Mintは、ブランド、クリエイターが独自のNFTショップを簡単に、すばやく構築できるよう、ブロックチェーン・およびバックエンドソリューションを提供するNFT BaaSサービスです',
  ogpImagePath = 'images/ogp/OGP.png',
  currentPath = '/',
}: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} key="description" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        property="og:url"
        content={`${baseUrl}${currentPath}`}
        key="og:url"
      />
      <meta
        property="og:image"
        content={`${baseUrl}/${ogpImagePath}`}
        key="og:image"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
    </Head>
  )
}
export default CommonMeta
