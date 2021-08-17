---
id: "modules"
title: "@kyuzan/mint-sdk-js"
sidebar_label: "Table of contents"
custom_edit_url: null
hide_title: true
---

# @kyuzan/mint-sdk-js

## Table of contents

### Classes

- [MintSDK](classes/mintsdk.md)
- [WrongNetworkError](classes/wrongnetworkerror.md)

### Interfaces

- [AccountInfo](interfaces/accountinfo.md)
- [ItemShippingInfo](interfaces/itemshippinginfo.md)
- [RegisterItemShippingInfoRequestBody](interfaces/registeritemshippinginforequestbody.md)

## Type aliases

### BigNumber

Ƭ **BigNumber**: ethers.BigNumber

Defined in: [src/types/BigNumber.ts:3](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/BigNumber.ts#L3)

___

### CurrencyUnit

Ƭ **CurrencyUnit**: *typeof* currencys[*number*]

Defined in: [src/types/CurrencyUnit.ts:3](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/CurrencyUnit.ts#L3)

___

### Item

Ƭ **Item**: *object*

Itemはマスターデータ
Itemが購買・引出されてERC721トークンとなったものが[Token](modules.md#token)

#### Type declaration:

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorAddress` | *string* | Itemの作成者ウォレットアドレス |
| `buyerAddress` | *string* \| ``null`` | 購入者のウォレットアドレス アドレスが null でない場合、Itemが「引出された」「購入された」た状態を表す |
| `chainType` | ``"ethereum"`` | - |
| `collectionId` | *string* | - |
| `createdBy` | *string*[] | アイテムの作成者 IPFSにあるアイテムデータの`createdBy`値 |
| `currentBidderAddress?` | *string* \| ``null`` | アイテムの最新の入札者ウォレットアドレス。 tradeType === 'auction or autoExtensionAuction` の時だけ値が入る |
| `currentPrice?` | *number* | アイテムの現在の入札価格。単位は`ether`。 tradeType === 'auction or autoExtensionAuction` の時だけ値が入る |
| `defaultEndAt?` | Date | オークション初期終了日時 tradeType === 'auction or autoExtensionAuction` の時だけ値が入る |
| `description` | *string* | アイテムの詳細 IPFSにあるアイテムデータの`description`値 |
| `endAt?` | Date | オークション終了日時 autoExtensionAuctionの場合は更新される tradeType === 'auction or autoExtensionAuction` の時だけ値が入る |
| `feeRatePermill` | *number* | - |
| `imageURI` | *string* | ipfs://xxxx |
| `imageURIHTTP` | *object* | imageURIのブラウザ閲覧用 https://xxxx |
| `imageURIHTTP.mimeType` | *string* | - |
| `imageURIHTTP.url` | *string* | - |
| `initialPrice?` | *number* | オークション開始価格 tradeType === 'auction` の時だけ値が入る |
| `itemId` | *string* | - |
| `minBidPercentage?` | *number* | アイテムの最低入札価格比 `currentPrice * minBidPercentage`でminBidPriceが求められる tradeType === 'auction or autoExtensionAuction` の時だけ値が入る |
| `minBidPrice?` | *number* | アイテムの最新の最低入札価格 tradeType === 'auction or autoExtensionAuction` の時だけ値が入る |
| `mintContractAddress` | *string* | - |
| `mintShopContractAddress` | *string* | - |
| `name` | *string* | アイテムの名前 IPFSにあるアイテムデータの`name`値 |
| `networkId` | [*NetworkId*](modules.md#networkid) | Itemが所属するネットワーク 1 === Ethereum メインネットワーク 4 === Ethereum Rinkebyネットワーク 137 ===  Polygon メインネットワーク 80001 === Matic Mumbaiネットワーク |
| `physicalOrderStatus?` | ItemsPhysicalOrderStatus | type === 'nftWithPhysicalProduct'だけ値が入る addressIsBlank: エンドユーザーからの住所登録待ち wip: Mint管理者側の配送アクション待ち shipped: 出荷済み |
| `previews` | { `mimeType`: *string* ; `url`: *string*  }[] | プレビューのURI 動画・画像が入る プレビューが設定されていない場合は空配列になる |
| `price?` | *number* | アイテムの販売価格。単位は`ether`。 tradeType === 'fixedPrice` の時だけ値が入る |
| `startAt?` | Date | オークション開始日時 tradeType === 'auction or autoExtensionAuction' の時だけ値が入る |
| `tokenId` | *number* | `Item`に対応するERC721準拠した tokenId `Item`が買われた時などに、生成されるTokenの tokenId |
| `tokenURI` | *string* | ipfs://xxxx |
| `tokenURIHTTP` | *string* | tokenURIのブラウザ閲覧用 https://xxxx |
| `tradeType` | [*ItemTradeType*](modules.md#itemtradetype) | - |
| `type?` | [*ItemsType*](modules.md#itemstype) | nftWithPhysicalProduct === 物理アイテム付きアイテム typeがないものは、ノーマルなNFTアイテム |
| `withdrawableAt?` | Date | 引き出し可能日時。この日時以降、`sendTxMakeSuccessfulBid`を呼ぶことでToken引き出すことができる tradeType === 'autoExtensionAuction` の時だけ値が入る |
| `yearCreated` | *string* | アイテムの制作年 IPFSにあるアイテムデータの`yearCreated`値 |

Defined in: [src/types/Item.ts:10](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/Item.ts#L10)

___

### ItemLog

Ƭ **ItemLog**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `accountAddress` | *string* |
| `createAt` | Date |
| `price` | *number* |
| `transactionHash` | *string* |
| `type` | ``"bought"`` \| ``"bid"`` |

Defined in: [src/types/ItemLog.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/ItemLog.ts#L1)

___

### ItemTradeType

Ƭ **ItemTradeType**: *typeof* itemsTradeTypes[*number*]

Defined in: [src/types/ItemTradeType.ts:6](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/ItemTradeType.ts#L6)

___

### ItemsType

Ƭ **ItemsType**: *typeof* itemsTypes[*number*]

Defined in: [src/types/ItemsType.ts:5](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/ItemsType.ts#L5)

___

### NetworkId

Ƭ **NetworkId**: ``1`` \| ``4`` \| ``80001`` \| ``137``

Defined in: [src/types/NetworkId.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/NetworkId.ts#L1)

___

### Residence

Ƭ **Residence**: *typeof* residenceList[*number*]

Defined in: [src/types/Residence.ts:2](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/Residence.ts#L2)

___

### Token

Ƭ **Token**: *object*

TokenはERC721を表現している
Item:Token = 1:1

#### Type declaration:

| Name | Type | Description |
| :------ | :------ | :------ |
| `authorAddress` | *string* | https://ipfs.io/ipfs/xxxx |
| `contractAddress` | *string* | - |
| `description` | *string* | - |
| `imageURI` | *string* | ipfs:// |
| `imageURIHTTP` | *object* | imageURIのブラウザ閲覧用 https://xxxx |
| `imageURIHTTP.mimeType` | *string* | - |
| `imageURIHTTP.url` | *string* | - |
| `item` | [*Item*](modules.md#item) | Tokenの元になったItemが入る |
| `name` | *string* | - |
| `previews` | { `mimeType`: *string* ; `url`: *string*  }[] | プレビューのURI 動画・画像が入る プレビューが設定されていない場合は空配列になる |
| `tokenId` | *number* | - |
| `tokenURI` | *string* | ipfs://xxxx |
| `tokenURIHTTP` | *string* | tokenURIのブラウザ閲覧用 https://xxxx |

Defined in: [src/types/Token.ts:6](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/Token.ts#L6)

___

### WalletInfo

Ƭ **WalletInfo**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `address` | *string* |
| `balance` | [*BigNumber*](modules.md#bignumber) |
| `unit` | [*CurrencyUnit*](modules.md#currencyunit) |

Defined in: [src/types/WalletInfo.ts:4](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/WalletInfo.ts#L4)

___

### WalletSetting

Ƭ **WalletSetting**: *object*

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `fortmatic` | *object* |
| `fortmatic.key` | *string* |

Defined in: [src/types/WalletSetting.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/types/WalletSetting.ts#L1)
