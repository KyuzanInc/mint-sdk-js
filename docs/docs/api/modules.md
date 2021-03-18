---
id: "modules"
title: "@kyuzan/annapurna-sdk-js"
sidebar_label: "Table of contents"
custom_edit_url: null
hide_title: true
---

# @kyuzan/annapurna-sdk-js

## Table of contents

### Classes

- [AnnapurnaSDK](classes/annapurnasdk.md)

## Type aliases

### BigNumber

Ƭ **BigNumber**: ethers.BigNumber

Defined in: [types/BigNumber.ts:3](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/BigNumber.ts#L3)

___

### Item

Ƭ **Item**: *object*

Itemはマスターデータ
Itemが購買・引出されてERC721トークンとなったものが[Token](modules.md#token)

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`authorAddress` | *string* | - |
`buyerAddress` | *string* \| *null* | buyerAddress にアドレスが入っている場合、Itemが「引出された」「購入された」ている   |
`chainType` | *ethereum* | - |
`collectionId` | *string* | - |
`createdBy` | *string*[] | - |
`currentBidderAddress`? | *string* \| *null* | only 'auction'   |
`currentPrice`? | *number* | only 'auction' ether   |
`description` | *string* | - |
`endAt`? | Date | only 'auction'   |
`feeRatePermill` | *number* | - |
`imageURI` | *string* | ipfs://xxxx   |
`imageURIHTTP` | *object* | imageURIのブラウザ閲覧用 https://xxxx   |
`imageURIHTTP.mimeType` | *string* | - |
`imageURIHTTP.url` | *string* | - |
`initialPrice`? | *number* | only 'auction' ether   |
`itemId` | *string* | - |
`minBidPercentage`? | *number* | only 'auction'   |
`minBidPrice`? | *number* | only 'auction'   |
`mintContractAddress` | *string* | - |
`mintShopContractAddress` | *string* | - |
`name` | *string* | - |
`networkId` | *1* \| *4* | - |
`previews` | { `mimeType`: *string* ; `url`: *string*  }[] | プレビューのURI 動画・画像が入る プレビューが設定されていない場合は空配列になる   |
`price`? | *number* | only 'fixedPrice'  ether   |
`signature` | *string* \| *undefined* | **`deprecated`**  |
`signatureBidAuction` | *string* \| *undefined* | - |
`signatureBuyAuction` | *string* \| *undefined* | - |
`signatureBuyFixedPrice` | *string* \| *undefined* | - |
`startAt`? | Date | only 'auction'   |
`tokenId` | *number* | - |
`tokenURI` | *string* | ipfs://xxxx   |
`tokenURIHTTP` | *string* | tokenURIのブラウザ閲覧用 https://xxxx   |
`tradeType` | *fixedPrice* \| *auction* | - |
`yearCreated` | *string* | - |

Defined in: [types/Item.ts:5](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/Item.ts#L5)

___

### ItemLog

Ƭ **ItemLog**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`accountAddress` | *string* |
`createAt` | Date |
`price` | *number* |
`transactionHash` | *string* |
`type` | *bought* \| *bid* |

Defined in: [types/ItemLog.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/ItemLog.ts#L1)

___

### NetworkId

Ƭ **NetworkId**: *1* \| *4*

Defined in: [types/NetworkId.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/NetworkId.ts#L1)

___

### Residence

Ƭ **Residence**: *typeof* residenceList[*number*]

Defined in: [types/Residence.ts:2](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/Residence.ts#L2)

___

### Token

Ƭ **Token**: *object*

TokenはERC721を表現している
Item:Token = 1:1

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`authorAddress` | *string* | https://ipfs.io/ipfs/xxxx   |
`contractAddress` | *string* | - |
`description` | *string* | - |
`imageURI` | *string* | ipfs://   |
`imageURIHTTP` | *object* | imageURIのブラウザ閲覧用 https://xxxx   |
`imageURIHTTP.mimeType` | *string* | - |
`imageURIHTTP.url` | *string* | - |
`item` | [*Item*](modules.md#item) | Tokenの元になったItemが入る   |
`name` | *string* | - |
`previews` | { `mimeType`: *string* ; `url`: *string*  }[] | プレビューのURI 動画・画像が入る プレビューが設定されていない場合は空配列になる   |
`tokenId` | *number* | - |
`tokenURI` | *string* | ipfs://xxxx   |
`tokenURIHTTP` | *string* | tokenURIのブラウザ閲覧用 https://xxxx   |

Defined in: [types/Token.ts:7](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/Token.ts#L7)

___

### WalletInfo

Ƭ **WalletInfo**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | *string* |
`balance` | [*BigNumber*](modules.md#bignumber) |

Defined in: [types/WalletInfo.ts:3](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/WalletInfo.ts#L3)

___

### WalletSetting

Ƭ **WalletSetting**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`fortmatic` | *object* |
`fortmatic.key` | *string* |

Defined in: [types/WalletSetting.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/914fc48/src/types/WalletSetting.ts#L1)
