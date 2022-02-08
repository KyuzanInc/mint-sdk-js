import {
  ItemPaymentMethodDataEthereumContractERC721ShopFixedPrice,
  ItemPaymentMethodDataEthereumContractERC721ShopAuction,
  ContractDataERC721Shop,
} from '../../apiClient/api'
import { CreditCardStripeCurrencyType } from './CreditCardStripeCurrencyType'

export type PaymentMethodData =
  | ({
      paymentMethod: 'ethereum-contract-erc721-shop-fixed-price'
      contractDataERC721Shop: ContractDataERC721Shop
    } & Omit<
      ItemPaymentMethodDataEthereumContractERC721ShopFixedPrice,
      'paymentMethod'
    >)
  | ({
      paymentMethod: 'ethereum-contract-erc721-shop-auction'
    } & Omit<
      ItemPaymentMethodDataEthereumContractERC721ShopAuction,
      'paymentMethod'
    >)
  | {
      paymentMethod: 'credit-card-stripe-fixed-price'
      currency: CreditCardStripeCurrencyType
    }
