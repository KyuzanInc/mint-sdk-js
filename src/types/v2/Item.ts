import { ItemDetail } from './ItemDetail'
import { Item as APIItem } from '../../apiClientV2/api'
import { ItemStock } from './ItemStock'

export type Item = Omit<APIItem, 'itemDetail' | 'itemStocks'> & {
  itemDetail: ItemDetail
  itemStocks: ItemStock[]
}
