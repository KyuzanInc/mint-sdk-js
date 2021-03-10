import React, { useState } from 'react'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import { Item as ItemType } from '@kyuzan/annapurna-sdk-js'
import styled from '@emotion/styled'
import Link from 'next/link'

export const Item: React.FC<{
  item: ItemType
  onClickBid: (itemId: string, ether: number) => any
  onClickBuy: (itemId: string) => any
}> = ({ item, onClickBid, onClickBuy }) => {
  const [values, setValues] = useState<number[]>([0])
  const isFixedPrice = item.tradeType === 'fixedPrice'
  const isBought = isFixedPrice && item.buyerAddress!.length !== 0
  const isBeforeAuction = isBefore(new Date(), item.startAt as Date)
  const isAfterAuction = isAfter(new Date(), item.endAt as Date)
  const onAuction = !isBeforeAuction && !isAfterAuction
  return (
    <Container>
      {isBought && <p>売れた</p>}
      {!isFixedPrice && isBeforeAuction && <p>オークション前</p>}
      {!isFixedPrice && isAfterAuction && <p>オークション後</p>}
      {!isFixedPrice && onAuction && <p>オークション中</p>}
      <img src={item.imageURL} />
      <p>{item.name}</p>
      <p>trade type: {item.tradeType}</p>
      <p>price: {item.price}</p>
      <p>buyer: {item.buyerAddress}</p>
      {!isFixedPrice && onAuction && (
        <>
          <input
            type="number"
            value={values[0]}
            onChange={(e) => {
              const value = e.target.value
              setValues([parseInt(value, 10)])
            }}
          />
          <Button onClick={() => onClickBid(item.itemId, values[0])}>
            '入札'
          </Button>
        </>
      )}
      {!isBought && isFixedPrice && (
        <Button onClick={() => onClickBuy(item.itemId)}>'買う'</Button>
      )}
      <Link href={`/rdemo/${item.itemId}`}>アイテム詳細</Link>
    </Container>
  )
}

const Container = styled.div`
  width: 300px;
  margin: 0 32px;

  img {
    width: 100%;
    height: auto;
  }
`

const Button = styled.div`
  cursor: pointer;
  padding: 24px 32px;
  border: solid 1px #333;
  margin: 16px 0;
`
