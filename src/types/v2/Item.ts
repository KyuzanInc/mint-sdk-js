import { Item as APIItem } from '../../apiClientV2/api'
import { ItemType } from './ItemType'
import { PaymentMethodData } from './PaymentMethodData'

export type Item = Omit<APIItem, 'paymentMethodData' | 'type'> & {
  type: ItemType
  paymentMethodData: PaymentMethodData
}
