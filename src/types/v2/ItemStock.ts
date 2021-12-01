import { ItemStock as APIItemStock } from '../../apiClientV2/api'
import { Item } from './Item'
import { ItemStockStatus } from './ItemStockStatus'

export type ItemStock = Omit<APIItemStock, 'status' | 'item'> & {
  status: ItemStockStatus
  item: Item
}
