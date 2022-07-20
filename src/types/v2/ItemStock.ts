import {
  ItemStock as APIItemStock,
  ItemStocksDataItemStocksInner,
} from '../../apiClient/api'
import { Item } from './Item'
import { ItemStockPhysicalShippingInfoStatus } from './ItemStockPhysicalShippingInfoStatus'
import { ItemStockStatus } from './ItemStockStatus'

export type ItemStock = Omit<APIItemStock, 'status' | 'item'> & {
  status: ItemStockStatus
  item: Item
}

export type ItemStockWithPhysicalShippingInfoStatus = Omit<
  ItemStocksDataItemStocksInner,
  'status' | 'item' | 'physicalShippingInfoStatus'
> & {
  status: ItemStockStatus
  item: Item
  physicalShippingInfoStatus: ItemStockPhysicalShippingInfoStatus | null
}
