import { AppComponent } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import { Global, css } from '@emotion/react'
import emotionReset from 'emotion-reset'
import { getStore } from '../redux/getStore'
import * as React from 'react'
import Layout from '../components/Layout'
import { color } from '../style/idnex'

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return (
    <Provider store={getStore()}>
      <Global
        styles={css`
          ${emotionReset}
          *, html, body {
            font-family: 'Montserrat', sans-serif;
            color: ${color.content.dark};
          }

          *,
          *::after,
          *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
