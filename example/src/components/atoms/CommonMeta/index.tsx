import Head from 'next/head'
import React from 'react'

type Props = {
  url: string
  ogpImagePath: string
  title?: string
  description?: string
}

const SITE_TITLE = 'Mint デモショップ | あなたのNFTショップ構築に並走します'
const SITE_DESCRIPTION =
  'Mintは、ブランド、クリエイターが独自のNFTショップを簡単に、すばやく構築できるよう、ブロックチェーン・およびバックエンドソリューションを提供するNFT BaaSサービスです'

const CommonMeta: React.FC<Props> = ({
  url,
  title,
  description = SITE_DESCRIPTION,
  ogpImagePath,
}: Props) => {
  const siteTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta property="og:title" content={siteTitle} key="og:title" />
      <meta property="description" content={description} key="description" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:image" content={ogpImagePath} key="og:image" />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
    </Head>
  )
}
export default CommonMeta
