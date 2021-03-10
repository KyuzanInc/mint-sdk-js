---
id: "annapurnasdk"
title: "Class: AnnapurnaSDK"
sidebar_label: "AnnapurnaSDK"
custom_edit_url: null
hide_title: true
---

# Class: AnnapurnaSDK

## Constructors

### constructor

\+ `Private`**new AnnapurnaSDK**(`accessToken`: *string*, `networkId`: [*NetworkId*](../modules.md#networkid), `axios`: AxiosInstance, `fortmatic`: *WidgetMode*, `metamaskProvider`: *null* \| *Web3Provider*, `shopContract`: { `abi`: *any* ; `address`: *string*  }): [*AnnapurnaSDK*](annapurnasdk.md)

#### Parameters:

Name | Type |
:------ | :------ |
`accessToken` | *string* |
`networkId` | [*NetworkId*](../modules.md#networkid) |
`axios` | AxiosInstance |
`fortmatic` | *WidgetMode* |
`metamaskProvider` | *null* \| *Web3Provider* |
`shopContract` | *object* |
`shopContract.abi` | *any* |
`shopContract.address` | *string* |

**Returns:** [*AnnapurnaSDK*](annapurnasdk.md)

Defined in: [index.ts:39](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L39)

## Properties

### eventAccountsChangeCallbacks

• `Private` **eventAccountsChangeCallbacks**: (`accounts`: *string*[]) => *any*[]

Defined in: [index.ts:37](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L37)

___

### eventConnectCallbacks

• `Private` **eventConnectCallbacks**: () => *any*[]

Defined in: [index.ts:39](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L39)

___

### eventDisconnectCallbacks

• `Private` **eventDisconnectCallbacks**: () => *any*[]

Defined in: [index.ts:38](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L38)

___

### getWalletInfo

• **getWalletInfo**: () => *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

#### Type declaration:

▸ (): *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

**Returns:** *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

Defined in: [index.ts:169](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L169)

Defined in: [index.ts:169](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L169)

## Methods

### connectWallet

▸ **connectWallet**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [index.ts:153](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L153)

___

### disconnectWallet

▸ **disconnectWallet**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [index.ts:164](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L164)

___

### emitAccountChange

▸ `Private`**emitAccountChange**(`accounts`: *string*[]): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`accounts` | *string*[] |

**Returns:** *void*

Defined in: [index.ts:427](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L427)

___

### emitConnect

▸ `Private`**emitConnect**(): *void*

**Returns:** *void*

Defined in: [index.ts:435](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L435)

___

### emitDisconnect

▸ `Private`**emitDisconnect**(): *void*

**Returns:** *void*

Defined in: [index.ts:431](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L431)

___

### formatItem

▸ `Private`**formatItem**(`item`: [*Item*](../modules.md#item)): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`item` | [*Item*](../modules.md#item) |

**Returns:** *object*

Name | Type |
:------ | :------ |
`authorAddress` | *string* |
`buyerAddress` | *null* \| *string* |
`currentBidderAddress`? | *null* \| *string* |
`currentPrice`? | *number* |
`description` | *string* |
`endAt` | *undefined* \| Date |
`imageURL` | *string* |
`initialPrice`? | *number* |
`itemId` | *string* |
`name` | *string* |
`networkId` | *1* \| *4* |
`price`? | *number* |
`signature` | *string* |
`startAt` | *undefined* \| Date |
`tokenId` | *number* |
`tokenURI` | *string* |
`tradeType` | *fixedPrice* \| *auction* |

Defined in: [index.ts:419](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L419)

___

### getItemById

▸ **getItemById**(`itemId`: *string*): *Promise*<{ `authorAddress`: *string* ; `buyerAddress`: *null* \| *string* ; `currentBidderAddress?`: *null* \| *string* ; `currentPrice?`: *number* ; `description`: *string* ; `endAt`: *undefined* \| Date ; `imageURL`: *string* ; `initialPrice?`: *number* ; `itemId`: *string* ; `name`: *string* ; `networkId`: *1* \| *4* ; `price?`: *number* ; `signature`: *string* ; `startAt`: *undefined* \| Date ; `tokenId`: *number* ; `tokenURI`: *string* ; `tradeType`: *fixedPrice* \| *auction*  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemId` | *string* |

**Returns:** *Promise*<{ `authorAddress`: *string* ; `buyerAddress`: *null* \| *string* ; `currentBidderAddress?`: *null* \| *string* ; `currentPrice?`: *number* ; `description`: *string* ; `endAt`: *undefined* \| Date ; `imageURL`: *string* ; `initialPrice?`: *number* ; `itemId`: *string* ; `name`: *string* ; `networkId`: *1* \| *4* ; `price?`: *number* ; `signature`: *string* ; `startAt`: *undefined* \| Date ; `tokenId`: *number* ; `tokenURI`: *string* ; `tradeType`: *fixedPrice* \| *auction*  }\>

Defined in: [index.ts:223](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L223)

___

### getItemLogs

▸ **getItemLogs**(`itemId`: *string*): *Promise*<[*ItemLog*](../modules.md#itemlog)[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemId` | *string* |

**Returns:** *Promise*<[*ItemLog*](../modules.md#itemlog)[]\>

Defined in: [index.ts:229](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L229)

___

### getItems

▸ **getItems**(): *Promise*<{ `authorAddress`: *string* ; `buyerAddress`: *null* \| *string* ; `currentBidderAddress?`: *null* \| *string* ; `currentPrice?`: *number* ; `description`: *string* ; `endAt`: *undefined* \| Date ; `imageURL`: *string* ; `initialPrice?`: *number* ; `itemId`: *string* ; `name`: *string* ; `networkId`: *1* \| *4* ; `price?`: *number* ; `signature`: *string* ; `startAt`: *undefined* \| Date ; `tokenId`: *number* ; `tokenURI`: *string* ; `tradeType`: *fixedPrice* \| *auction*  }[]\>

**Returns:** *Promise*<{ `authorAddress`: *string* ; `buyerAddress`: *null* \| *string* ; `currentBidderAddress?`: *null* \| *string* ; `currentPrice?`: *number* ; `description`: *string* ; `endAt`: *undefined* \| Date ; `imageURL`: *string* ; `initialPrice?`: *number* ; `itemId`: *string* ; `name`: *string* ; `networkId`: *1* \| *4* ; `price?`: *number* ; `signature`: *string* ; `startAt`: *undefined* \| Date ; `tokenId`: *number* ; `tokenURI`: *string* ; `tradeType`: *fixedPrice* \| *auction*  }[]\>

Defined in: [index.ts:205](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L205)

___

### getItemsByBidderAddress

▸ **getItemsByBidderAddress**(`address`: *string*): *Promise*<{ `authorAddress`: *string* ; `buyerAddress`: *null* \| *string* ; `currentBidderAddress?`: *null* \| *string* ; `currentPrice?`: *number* ; `description`: *string* ; `endAt`: *undefined* \| Date ; `imageURL`: *string* ; `initialPrice?`: *number* ; `itemId`: *string* ; `name`: *string* ; `networkId`: *1* \| *4* ; `price?`: *number* ; `signature`: *string* ; `startAt`: *undefined* \| Date ; `tokenId`: *number* ; `tokenURI`: *string* ; `tradeType`: *fixedPrice* \| *auction*  }[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`address` | *string* |

**Returns:** *Promise*<{ `authorAddress`: *string* ; `buyerAddress`: *null* \| *string* ; `currentBidderAddress?`: *null* \| *string* ; `currentPrice?`: *number* ; `description`: *string* ; `endAt`: *undefined* \| Date ; `imageURL`: *string* ; `initialPrice?`: *number* ; `itemId`: *string* ; `name`: *string* ; `networkId`: *1* \| *4* ; `price?`: *number* ; `signature`: *string* ; `startAt`: *undefined* \| Date ; `tokenId`: *number* ; `tokenURI`: *string* ; `tradeType`: *fixedPrice* \| *auction*  }[]\>

Defined in: [index.ts:212](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L212)

___

### getProvider

▸ `Private`**getProvider**(): *Web3Provider*

**Returns:** *Web3Provider*

Defined in: [index.ts:410](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L410)

___

### getServerUnixTime

▸ **getServerUnixTime**(): *Promise*<any\>

サーバーのUnixタイムを取得

**Returns:** *Promise*<any\>

unix time (ms)

Defined in: [index.ts:405](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L405)

___

### getTokensByAddress

▸ **getTokensByAddress**(`address`: *string*): *Promise*<[*Token*](../modules.md#token)[]\>

#### Parameters:

Name | Type |
:------ | :------ |
`address` | *string* |

**Returns:** *Promise*<[*Token*](../modules.md#token)[]\>

Defined in: [index.ts:246](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L246)

___

### isWalletConnect

▸ **isWalletConnect**(): *Promise*<any\>

**Returns:** *Promise*<any\>

Defined in: [index.ts:144](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L144)

___

### offAccountsChange

▸ **offAccountsChange**(`callback?`: (`accounts`: *string*[]) => *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback?` | (`accounts`: *string*[]) => *any* |

**Returns:** *void*

Defined in: [index.ts:356](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L356)

___

### offConnect

▸ **offConnect**(`callback?`: () => *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback?` | () => *any* |

**Returns:** *void*

Defined in: [index.ts:372](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L372)

___

### offDisconnect

▸ **offDisconnect**(`callback?`: () => *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback?` | () => *any* |

**Returns:** *void*

Defined in: [index.ts:388](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L388)

___

### onAccountsChange

▸ **onAccountsChange**(`callback`: (`accounts`: *string*[]) => *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`accounts`: *string*[]) => *any* |

**Returns:** *void*

Defined in: [index.ts:352](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L352)

___

### onConnect

▸ **onConnect**(`callback`: () => *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | () => *any* |

**Returns:** *void*

Defined in: [index.ts:368](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L368)

___

### onDisconnect

▸ **onDisconnect**(`callback`: () => *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | () => *any* |

**Returns:** *void*

Defined in: [index.ts:384](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L384)

___

### sendTxBid

▸ **sendTxBid**(`itemId`: *string*, `bidPrice`: *number*): *Promise*<TransactionResponse\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemId` | *string* |
`bidPrice` | *number* |

**Returns:** *Promise*<TransactionResponse\>

Defined in: [index.ts:253](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L253)

___

### sendTxBuyItem

▸ **sendTxBuyItem**(`itemId`: *string*): *Promise*<TransactionResponse\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemId` | *string* |

**Returns:** *Promise*<TransactionResponse\>

Defined in: [index.ts:321](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L321)

___

### sendTxMakeSuccessfulBid

▸ **sendTxMakeSuccessfulBid**(`itemId`: *string*): *Promise*<TransactionResponse\>

#### Parameters:

Name | Type |
:------ | :------ |
`itemId` | *string* |

**Returns:** *Promise*<TransactionResponse\>

Defined in: [index.ts:291](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L291)

___

### waitForTransaction

▸ **waitForTransaction**(`txHash`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`txHash` | *string* |

**Returns:** *Promise*<void\>

Defined in: [index.ts:197](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L197)

___

### formatEther

▸ `Static`**formatEther**(`bg`: *BigNumber*): *string*

BigNumberをether(通常のETHと表示される価格)にフォーマットして返す

#### Parameters:

Name | Type |
:------ | :------ |
`bg` | *BigNumber* |

**Returns:** *string*

Ether単位でパースされたstring

Defined in: [index.ts:33](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L33)

___

### initialize

▸ `Static`**initialize**(`accessToken`: *string*, `networkId`: [*NetworkId*](../modules.md#networkid), `walletSetting`: [*WalletSetting*](../modules.md#walletsetting), `devOption?`: { `backendUrl?`: *string* ; `contractMintAbi?`: *any* ; `contractMintShopAddress?`: *string* ; `jsonRPCUrl?`: *string*  }): *Promise*<[*AnnapurnaSDK*](annapurnasdk.md)\>

sdkのイニシャライズ

#### Parameters:

Name | Type |
:------ | :------ |
`accessToken` | *string* |
`networkId` | [*NetworkId*](../modules.md#networkid) |
`walletSetting` | [*WalletSetting*](../modules.md#walletsetting) |
`devOption?` | *object* |
`devOption.backendUrl?` | *string* |
`devOption.contractMintAbi?` | *any* |
`devOption.contractMintShopAddress?` | *string* |
`devOption.jsonRPCUrl?` | *string* |

**Returns:** *Promise*<[*AnnapurnaSDK*](annapurnasdk.md)\>

sdkのインスタンス

Defined in: [index.ts:84](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L84)

___

### parseEther

▸ `Static`**parseEther**(`ether`: *string*): *BigNumber*

ether(通常のETHと表示される価格)をBigNumberとして返す

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ether` | *string* | 通常のETHと表示されるもの   |

**Returns:** *BigNumber*

etherをBigNumberとしてparseしたもの

Defined in: [index.ts:23](https://github.com/KyuzanInc/annapurna-sdk-js/blob/4264e58/src/index.ts#L23)
