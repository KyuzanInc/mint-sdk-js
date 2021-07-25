import React from 'react'
import { color, font } from '../../../style'
import styled from '@emotion/styled'

type Props = {
  imageURL: string
  isEnd?: boolean
  name: string
  price: number
}

export const CarouselItem: React.FC<Props> = ({ imageURL, isEnd, name, price }) => {
  
  return(
    <CarouselItemContainer>
      <Image src={imageURL}/>
        {isEnd?(
          null
        ):(
        <Info>
          <Name>{name}</Name>
          <Price>{price}<Unit>ETH</Unit></Price>
        </Info>  
        )}
    </CarouselItemContainer>
  )
}

const CarouselItemContainer = styled.div`
  width:100%;
  height:100%;
  position:relative;
`

const Image = styled.img`
  width:100%;
  height:100%;
  object-fit: cover;
`

const Info = styled.div`
  position:absolute;
  right:32px;
  bottom:32px;
  color:${color.background.white};
`

const Name = styled.p`
  ${font.mont.caption};
`

const Price = styled.h3`
  ${font.mont.h2};
`

const Unit = styled.span`
  ${font.mont.h2};
  margin: 0 0 0 16px;
`