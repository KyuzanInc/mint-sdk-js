import { AppComponent } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import { createStore } from '../redux/createStore'
import * as React from 'react'
import Layout from '../components/Layout'

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return (
    <Provider store={createStore()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
