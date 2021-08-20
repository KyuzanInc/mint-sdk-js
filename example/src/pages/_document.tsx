import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import CommonMeta from '../components/atoms/CommonMeta'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/images/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <CommonMeta />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
