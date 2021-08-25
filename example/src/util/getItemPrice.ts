import { Item } from '@kyuzan/mint-sdk-js'

export const getItemPrice = (item?: Item) => {
  if (item?.tradeType === 'fixedPrice') return item.price ?? 0

  let price = item?.currentPrice || item?.initialPrice || 0
  if (price < 0.01) {
    price = 0.01
  } else {
    price = Math.round(price * 100) / 100
  }
  return price
}
