import React from 'react'
import * as nextImage from 'next/image';
import emotionReset from 'emotion-reset'
import { color } from '../src/style/index'
import { Global, css } from '@emotion/react'

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />
})

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
