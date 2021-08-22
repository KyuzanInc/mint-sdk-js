import css from '@emotion/css'

export const color = {
  primary: '#294446',
  secondary: '#CBA4A0',
  white: '#fff',
  subColor: {
    blue: '#3D98B8',
    orange: '#FF9575',
    yellow: '#DDB882',
  },
  background: {
    bague: '#F5F5F5',
    dark: '#333',
    white: '#fff',
  },
  utils: {
    error: '#FF3B30',
    link: '#007AFF',
  },
  content: {
    dark: 'rgba(0,0,0,.82)',
    middle: 'rgba(0,0,0,.54)',
    light: 'rgba(0, 0, 0, 0.14)',
    superLight: 'rgba(0, 0, 0, 0.08);',
    gray1: '#BDBDBD',
    gray2: '#EBEBEB',
  },
  active: 'linear-gradient(180deg, #FD80A8 0%, #FCCF42 100%);',
} as const

export const font = {
  mont: {
    h1: 'font-weight: 600; font-size: 48px; line-height: 1.3;',
    h2: 'font-weight: 600; font-size: 32px; line-height: 1.3;',
    h3: 'font-weight: 600; font-size: 24px; line-height: 1.3;',
    h4: 'font-weight: 600; font-size: 18px; line-height: 1.3;',
    subtitle1: 'font-weight: 600; font-size: 16px; line-height: 1.3;',
    subtitle2: 'font-weight: 600; font-size: 14px; line-height: 1.3;',
    body1: 'font-weight: 500; font-size: 16px; line-height: 1.3;',
    body2: 'font-weight: 500; font-size: 14px; line-height: 1.3;',
    article1: 'font-weight: 500; font-size: 16px; line-height: 1.5;',
    article2: 'font-weight: 500; font-size: 14px; line-height: 1.5;',
    button: 'font-weight: 700; font-size: 14px; line-height: 1.5;',
    caption: 'font-weight: 400; font-size: 12px; line-height: 1.5;',
    label: 'font-weight: 600; font-size: 12px; line-height: 1.5;',
    overline: 'font-weight: 400; font-size: 10px; line-height: 1.5;',
    unit: 'font-weight: 700; font-size: 10px; line-height: 1.3;',
  },
  noto: {
    h1: 'font-family: Noto Serif JP, serif; font-weight: 300; font-size: 48px; line-height: 1.3;',
    h2: 'font-family: Noto Serif JP, serif; font-weight: 300; font-size: 32px; line-height: 1.3;',
    h3: 'font-family: Noto Serif JP, serif; font-weight: 300; font-size: 20px; line-height: 1.3;',
    h4: 'font-family: Noto Serif JP, serif; font-weight: 300; font-size: 18px; line-height: 1.3;',
    subtitle1:
      'font-family: Noto Serif JP, serif; font-weight: 600; font-size: 16px; line-height: 1.3;',
    subtitle2:
      'font-family: Noto Serif JP, serif; font-weight: 600; font-size: 14px; line-height: 1.3;',
    body1:
      'font-family: Noto Serif JP, serif; font-weight: 500; font-size: 16px; line-height: 1.3;',
    body2:
      'font-family: Noto Serif JP, serif; font-weight: 500; font-size: 14px; line-height: 1.3;',
    article1:
      'font-family: Noto Serif JP, serif; font-weight: 500; font-size: 16px; line-height: 1.5;',
    article2:
      'font-family: Noto Serif JP, serif; font-weight: 500; font-size: 14px; line-height: 1.5;',
    button:
      'font-family: Noto Serif JP, serif; font-weight: 700; font-size: 14px; line-height: 1.5;',
    caption:
      'font-family: Noto Serif JP, serif; font-weight: 400; font-size: 12px; line-height: 1.5;',
    label:
      'font-family: Noto Serif JP, serif; font-weight: 600; font-size: 12px; line-height: 1.5;',
    overline:
      'font-family: Noto Serif JP, serif; font-weight: 400; font-size: 10px; line-height: 1.5;',
    unit: 'font-family: Noto Serif JP, serif; font-weight: 700; font-size: 10px; line-height: 1.3;',
  },
} as const

export const media = {
  lg: (...args: any) => css`
    @media (min-width: 1040px) {
      ${css(...args)}
    }
  `,
  md: (...args: any) => css`
    @media (min-width: 480px) and (max-width: 1039px) {
      ${css(...args)}
    }
  `,
  mdsp: (...args: any) => css`
    @media (max-width: 1039px) {
      ${css(...args)}
    }
  `,
  sp: (...args: any) => css`
    @media (max-width: 479px) {
      ${css(...args)}
    }
  `,
}

export const curve = {
  button: 'transition: all 0.15s 0.0s cubic-bezier(0.4, 0, 0.1, 1);',
  fade: 'transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;',
  ripple: 'transition: all 0.35s cubic-bezier(0.74, 0.11, 0.17, 0.51);',
} as const

export const zIndex = {
  base: 0,
  effect: -1,
  elevation: {
    ev5: 5,
    ev10: 10,
    ev15: 15,
  },
} as const
