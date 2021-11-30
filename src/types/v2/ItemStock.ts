import { ItemItemStocks as APIItemStock } from '../../apiClientV2/api'
import { ItemStockStatus } from './ItemStockStatus'

export type ItemStock = Omit<APIItemStock, 'status'> & {
  status: ItemStockStatus
}
