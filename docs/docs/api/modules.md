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

Defined in: [types/BigNumber.ts:3](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/BigNumber.ts#L3)

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
`currentBidderAddress`? | *string* \| *null* | only 'auction'   |
`currentPrice`? | *number* | only 'auction' ether   |
`description` | *string* | - |
`endAt`? | Date | only 'auction'   |
`imageURI` | *string* | https://ipfs.io/ipfs/xxxx   |
`initialPrice`? | *number* | only 'auction' ether   |
`itemId` | *string* | - |
`minBidPercentage`? | *number* | only 'auction'   |
`minBidPrice`? | *number* | only 'auction'   |
`name` | *string* | - |
`networkId` | *1* \| *4* | - |
`previews` | { `mimeType`: *string* ; `url`: *string*  }[] | プレビューのURI 動画・画像が入る プレビューが設定されていない場合は空配列になる   |
`price`? | *number* | only 'fixedPrice'  ether   |
`signature` | *string* | - |
`startAt`? | Date | only 'auction'   |
`tokenId` | *number* | - |
`tokenURI` | *string* | https://ipfs.io/ipfs/xxxx   |
`tradeType` | *fixedPrice* \| *auction* | - |

Defined in: [types/Item.ts:5](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/Item.ts#L5)

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

Defined in: [types/ItemLog.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/ItemLog.ts#L1)

___

### NetworkId

Ƭ **NetworkId**: *1* \| *4*

Defined in: [types/NetworkId.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/NetworkId.ts#L1)

___

### Token

Ƭ **Token**: *object*

TokenはERC721を表現している

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`authorAddress` | *string* | - |
`contractAddress` | *string* | - |
`description` | *string* | - |
`imageURI` | *string* | https://ipfs.io/ipfs/xxxx   |
`name` | *string* | - |
`previews` | { `mimeType`: *string* ; `url`: *string*  }[] | プレビューのURI 動画・画像が入る プレビューが設定されていない場合は空配列になる   |
`tokenId` | *number* | - |
`tokenURI` | *string* | https://ipfs.io/ipfs/xxxx   |

Defined in: [types/Token.ts:4](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/Token.ts#L4)

___

### WalletInfo

Ƭ **WalletInfo**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`address` | *string* |
`balance` | [*BigNumber*](modules.md#bignumber) |

Defined in: [types/WalletInfo.ts:3](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/WalletInfo.ts#L3)

___

### WalletSetting

Ƭ **WalletSetting**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`fortmatic` | *object* |
`fortmatic.key` | *string* |

Defined in: [types/WalletSetting.ts:1](https://github.com/KyuzanInc/annapurna-sdk-js/blob/be8e97f/src/types/WalletSetting.ts#L1)
