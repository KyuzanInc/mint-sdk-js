import { AppComponent } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import { getStore } from '../redux/getStore'
import * as React from 'react'
import Layout from '../components/Layout'

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return (
    <Provider store={getStore()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
