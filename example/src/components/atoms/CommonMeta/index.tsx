import Head from 'next/head'

export const CommonMeta = ({
  title = 'Mint デモショップ | あなたのNFTショップ構築に並走します',
  description = 'Mintは、ブランド、クリエイターが独自のNFTショップを簡単に、すばやく構築できるよう、ブロックチェーン・およびバックエンドソリューションを提供するNFT BaaSサービスです',
  ogImage = `images/OGP.png`,
}) => {
  const imagePath = window.location.href + `${ogImage}`;
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
      <meta property="og:image" content={imagePath} key="og:image" />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
    </Head>
  )
}
