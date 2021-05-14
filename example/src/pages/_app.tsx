import { AppComponent } from 'next/dist/next-server/lib/router/router'
import { Global, css } from '@emotion/react'
import emotionReset from 'emotion-reset'
import * as React from 'react'
import Layout from '../components/Layout'
import { color } from '../style'
import { ConnectedRouter } from 'connected-next-router'
import { wrapper } from '../redux/getStore'

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return (
    <ConnectedRouter>
      <Global
        styles={css`
          ${emotionReset}
          *, html, body {
            font-family: 'Montserrat', sans-serif;
            color: ${color.content.dark};
          }

          html,
          body {
            background-color: ${color.background.bague};
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
    </ConnectedRouter>
  )
}

export default wrapper.withRedux(MyApp)
