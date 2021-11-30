import { PaymentMethodData } from './PaymentMethodData'
import { ItemDetail as APIItemDetail } from '../../apiClientV2/api'
import { ItemType } from './ItemType'

export type ItemDetail = Omit<APIItemDetail, 'paymentMethodData' | 'type'> & {
  paymentMethodData: PaymentMethodData
  type: ItemType
}
