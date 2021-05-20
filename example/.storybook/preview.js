import React from 'react'
import emotionReset from 'emotion-reset'
import { color } from '../src/style/index'
import { Global, css } from '@emotion/react'

export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
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
      <Story />
    </div>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
