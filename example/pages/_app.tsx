import { AppComponent } from 'next/dist/next-server/lib/router/router'
import * as React from 'react'
import Layout from '../components/Layout'

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
