import React from 'react'
import { IconButton } from '.'

export const Twitter: React.VFC = () => (
  <IconButton imagePath={'/images/twitter_icon.svg'} href={''} />
)
export const FaceBook: React.VFC = () => (
  <IconButton imagePath={'/images/facebook.svg'} href={''} />
)
export const PaperClip: React.VFC = () => (
  <IconButton imagePath={'/images/paperclip.svg'} href={''} />
)

export default {
  title: 'atoms/IconButton',
}
