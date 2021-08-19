import React from 'react'
import { CarouselItem } from '.'

export const Basic: React.VFC = () => (
  <CarouselItem
    imageURL={'/images/items/collection001/001.jpg'}
    isEnd={false}
    name={'ばんえい競馬 001'}
    price={0.613}
  />
)
export default {
  title: 'molecules/CarouselItem',
}
