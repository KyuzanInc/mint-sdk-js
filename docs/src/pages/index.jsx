import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './styles.module.css'

export default function Home() {
  const context = useDocusaurusContext()
  return (
    <Layout
      title={`Mint Developers | あなたのNFTショップ構築に並走します`}
      description="Mint SDKは、NFT Shop開発に特化したJavaScriptライブラリです。MINT SDKと管理者ダッシュボードを使うことで、素早く簡単にオリジナルNFT Shopを作成し、オリジナルのNFTを販売することができます。"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={clsx('heroContainer', styles.heroContainer)}>
          <div className={clsx(styles.heroContainerLeft)}>
            <h2 className={clsx(styles.heroContainerLeftTitle)}>
              Mint helps you build<br/>
              your own NFT shop
            </h2>
            <p className={clsx(styles.heroContainerLeftDescription)}>
              Mint SDKは、NFT Shop開発に特化したJavaScriptライブラリです。MINT SDKと管理者ダッシュボードを使うことで、素早く簡単にオリジナルNFT Shopを作成し、オリジナルのNFTを販売することができます。
            </p>
            <div className={clsx(styles.heroContainerLeftButtons)}>
              <Link
                className={clsx(
                  'button button--primary button--lg',
                  styles.getStarted
                )}
                href={'http://demo.mintnft.jp/'}
              >
                Try Demo(作成中)
              </Link>
              <Link
                className={clsx(
                  'button button--primary button--lg',
                  styles.learnMore
                )}
                href={'http://mintnft.jp/'}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className={clsx(styles.heroContainerRight)}>
            <img src={'img/hero.svg'} alt={'about mint'} />
          </div>
        </div>
      </header>
      <main>
        <div className={clsx(styles.contentContainer)}>
          <div className={clsx(styles.contentImg)}>
            <img src={'img/content_mint_sdk.svg'} alt={'mint sdk'}/>
          </div>
          <div className={clsx(styles.contentText)}>
            <h3 className={clsx(styles.contentTitle)}>Mint SDK</h3>
            <div className={clsx(styles.contentDescription)}>
              Mint SDKは、NFT Shop開発に特化したJavaScriptライブラリです。DEMO では、Mint SDKを使用して開発した NFT Shop をみることができます。
            </div>
            <Link href={'https://demo.mintnft.jp'} className={clsx(styles.contentLink)}>
              DEMOをみる (作成中)
            </Link>
            <div className={clsx(styles.contentDescription)}>
              DEMOのソースコードはオープンソースとなっています。実際の動作を確認しながらMINT SDKの使用方法を理解することができます。
            </div>
            <Link href={'https://github.com/KyuzanInc/mint-sdk-js/tree/multi_network'} className={clsx(styles.contentLink)}>
              DEMOのソースコードを見る
            </Link>
            <div className={clsx(styles.contentDescription)}>
              MINT SDKの詳細な使用方法については、APIドキュメントをご覧ください。
            </div>
            <Link to={useBaseUrl('/docs/api')} className={clsx(styles.contentLink)}>
              APIドキュメントを見る
            </Link>
          </div>
        </div>
        <div className={clsx(styles.contentContainerReverse)}>
          <div className={clsx(styles.contentImgReverse)}>
            <img src={'img/content_dashboard.svg'} alt={'dashboard'}/>
          </div>
          <div className={clsx(styles.contentText)}>
            <h3 className={clsx(styles.contentTitle)}>DASHBOARD</h3>
            <div className={clsx(styles.contentDescription)}>
              ショップでの出品や商品管理はダッシュボードからおこなえます。

              NFT販売において面倒な会計・税務についても、ダッシュボードの売り上げレポートを使えば簡単に処理することができます
            </div>
            <Link href={'https://www.mintnft.jp/#contact-form'} className={clsx(styles.contentLink)}>
              今すぐはじめる
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}
