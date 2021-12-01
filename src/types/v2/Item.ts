import { Item as APIItem } from '../../apiClientV2/api'
import { ItemType } from './ItemType'

export type Item = Omit<APIItem, 'itemDetail' | 'itemStocks' | 'type'> & {
  type: ItemType
}
