import {
  ItemPaymentMethodDataEthereumContractERC721ShopFixedPrice,
  ItemPaymentMethodDataEthereumContractERC721ShopAuction,
  ItemPaymentMethodDataCreditCardStripeFixedPrice,
  ContractDataERC721Shop,
} from '../../apiClientV2/api'

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
  | ({
      paymentMethod: 'credit-card-stripe-fixed-price'
    } & Omit<ItemPaymentMethodDataCreditCardStripeFixedPrice, 'paymentMethod'>)
