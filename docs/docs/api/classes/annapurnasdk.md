---
id: "annapurnasdk"
title: "Class: AnnapurnaSDK"
sidebar_label: "AnnapurnaSDK"
custom_edit_url: null
hide_title: true
---

# Class: AnnapurnaSDK

## Properties

### getWalletInfo

• **getWalletInfo**: () => *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

ウォレットのアカウントと残高情報などの情報が取得できる

**Required**
- ウォレットに接続していること

**`returns`** 

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
await sdk.connectWallet()  // required
await sdk.getWalletInfo()
```

#### Type declaration:

▸ (): *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

**Returns:** *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

Defined in: [src/index.ts:270](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L270)

Defined in: [src/index.ts:270](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L270)

## Methods

### connectWallet

▸ **connectWallet**(): *Promise*<void\>

ウォレットに接続
MetamaskがインストールされているブラウザではMetamaskが、されていない場合はFortmaticに接続を行う
ウォレットが接続されるとResolveされる
ウォレット接続をキャンセルした場合は、Rejectされる

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
await sdk.isWalletConnect() // false
await sdk.connectWallet()
await sdk.isWalletConnect()  // true
```

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:226](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L226)

___

### disconnectWallet

▸ **disconnectWallet**(): *Promise*<void\>

ウォレットから切断
Fortmaticの場合、切断される
**MetaMaskが接続されている場合は何も実行されない**

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = await AnnapurnaSDK.initialize(...)
await sdk.disconnectWallet()
```

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:250](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L250)

___

### getItemById

▸ **getItemById**(`itemId`: *string*): *Promise*<[*Item*](../modules.md#item)\>

ItemのitemId指定でアイテムを取得

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemId` | *string* | [Item](../modules.md#item)のitemId   |

**Returns:** *Promise*<[*Item*](../modules.md#item)\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
const item = await sdk.getItemById('item.itemId')
```

Defined in: [src/index.ts:394](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L394)

___

### getItemByToken

▸ **getItemByToken**(`token`: [*Token*](../modules.md#token)): *Promise*<[*Item*](../modules.md#item)\>

Tokenに紐づいたItemを取得

#### Parameters:

Name | Type |
:------ | :------ |
`token` | [*Token*](../modules.md#token) |

**Returns:** *Promise*<[*Item*](../modules.md#item)\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
const item = await sdk.getItemByToken(token)
```

Defined in: [src/index.ts:411](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L411)

___

### getItemLogs

▸ **getItemLogs**(`itemId`: *string*, `paging?`: { `page`: *number* = 1; `perPage`: *number* = 30 }): *Promise*<[*ItemLog*](../modules.md#itemlog)[]\>

アイテムの履歴(bidされた、買われた)の取得
最新の物から返される

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`itemId` | *string* | - | [Item](../modules.md#item)のitemId   |
`paging` | *object* | - | - |
`paging.page` | *number* | 1 | - |
`paging.perPage` | *number* | 30 | - |

**Returns:** *Promise*<[*ItemLog*](../modules.md#itemlog)[]\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = await AnnapurnaSDK.initialize(...)
const item = await sdk.getItemLogs('Item.itemId')
```

Defined in: [src/index.ts:438](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L438)

___

### getItems

▸ **getItems**(`__namedParameters?`: { `page`: *number* ; `perPage`: *number*  }): *Promise*<[*Item*](../modules.md#item)[]\>

公開中のアイテムを取得

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | *object* |
`__namedParameters.page` | *number* |
`__namedParameters.perPage` | *number* |

**Returns:** *Promise*<[*Item*](../modules.md#item)[]\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = await AnnapurnaSDK.initialize(...)
const items = await sdk.getItems()
```

Defined in: [src/index.ts:339](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L339)

___

### getItemsByBidderAddress

▸ **getItemsByBidderAddress**(`address`: *string*): *Promise*<[*Item*](../modules.md#item)[]\>

指定したアドレスがBidしたItemの一覧を取得

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`address` | *string* | ウォレットのアドレス   |

**Returns:** *Promise*<[*Item*](../modules.md#item)[]\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
const item = await sdk.getItemsByBidderAddress('0x1111......')
```

Defined in: [src/index.ts:371](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L371)

___

### getServerUnixTime

▸ **getServerUnixTime**(): *Promise*<any\>

サーバーのUnixタイムを取得

**Returns:** *Promise*<any\>

unix time (ms)

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = AnnapurnaSDK.initialize(...)
await	sdk.connectWallet()
await sdk.getServerUnixTime()  // ex) 1615444120104
```

Defined in: [src/index.ts:798](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L798)

___

### getTokensByAddress

▸ **getTokensByAddress**(`address`: *string*): *Promise*<[*Token*](../modules.md#token)[]\>

指定したアドレスが所持しているMINT経由で獲得したトークンを取得

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`address` | *string* | Walletのアドレス   |

**Returns:** *Promise*<[*Token*](../modules.md#token)[]\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...
const tokens = await sdk.getTokensByAddress('0x11111...')
```

Defined in: [src/index.ts:475](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L475)

___

### isCorrectNetwork

▸ **isCorrectNetwork**(): *Promise*<boolean\>

適切なネットワークかを判定

**Returns:** *Promise*<boolean\>

trueならば適切なネットワーク

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = AnnapurnaSDK.initialize(...)
sdk.isInjectedWallet() // true
```

Defined in: [src/index.ts:831](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L831)

___

### isInjectedWallet

▸ **isInjectedWallet**(): *boolean*

MetaMaskかどうかを判定

**Returns:** *boolean*

trueならばMetaMask

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = AnnapurnaSDK.initialize(...)
await sdk.isInjectedWallet() // true
```

Defined in: [src/index.ts:815](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L815)

___

### isWalletConnect

▸ **isWalletConnect**(): *Promise*<any\>

有効なアカウントがあるの状態を返す

**Returns:** *Promise*<any\>

ウォレットが接続されていればtrue

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = await AnnapurnaSDK.initialize(...)
await sdk.isWalletConnect()
```

Defined in: [src/index.ts:203](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L203)

___

### onAccountsChange

▸ **onAccountsChange**(`callback`: (`accounts`: *string*[]) => *any*): *void*

アカウントが変更された際に呼び出される関数を設定できる

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | (`accounts`: *string*[]) => *any* |

**Returns:** *void*

void

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
sdk.onAccountsChange((accounts: string[]) => {
   // some thing
})
```

Defined in: [src/index.ts:700](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L700)

___

### onConnect

▸ **onConnect**(`callback`: () => *any*): *void*

ウォレットに接続した際に呼び出される関数を設定できる

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | () => *any* |

**Returns:** *void*

void

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
sdk.onConnect(() => {
   // some thing
})
```

Defined in: [src/index.ts:733](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L733)

___

### onDisconnect

▸ **onDisconnect**(`callback`: () => *any*): *void*

ウォレットから切断した際に呼び出される関数を設定できる

#### Parameters:

Name | Type |
:------ | :------ |
`callback` | () => *any* |

**Returns:** *void*

void

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
sdk.onDisconnect(() => {
   // some thing
})
```

Defined in: [src/index.ts:766](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L766)

___

### sendTxBid

▸ **sendTxBid**(`itemId`: *string*, `bidPrice`: *number*): *Promise*<TransactionResponse\>

指定した金額でBidするトランザクションを発行
Bidする謹賀具の総額を`bidPrice`に指定する

**Required**
- ウォレットに接続していること

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemId` | *string* | [Item](../modules.md#item)のitemId   |
`bidPrice` | *number* | 単位はether   |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
await sdk.connectWallet() // required
try {
 const tx = await sdk.sendTxBid('item.itemId', 2)
 // show loading
 await tx.wait()
 // success transaction
} catch (err) {
 // display error message
}
```

Defined in: [src/index.ts:507](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L507)

___

### sendTxBuyItem

▸ **sendTxBuyItem**(`itemId`: *string*, `userResidence?`: *unknown* \| *jp*): *Promise*<TransactionResponse\>

FixedPriceのアイテムを購入するトランザクションを発行
ユーザーの居住地を問うUIを合わせて実装必要
消費税に関する会計処理などがスムーズに行えます

**Required**
- ウォレットに接続していること

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`itemId` | *string* | - | [Item](../modules.md#item)のitemId   |
`userResidence` | *unknown* \| *jp* | 'unknown' | [Residence](../modules.md#residence) 購入者の居住地を指定する   |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
await sdk.connectWallet() // required
try {
 const tx = await sdk.sendTxBuyItem('item.itemId', 'jp')
 // show loading
 await tx.wait()
 // success transaction
} catch (err) {
 // display error message
}
```

Defined in: [src/index.ts:640](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L640)

___

### sendTxMakeSuccessfulBid

▸ **sendTxMakeSuccessfulBid**(`itemId`: *string*, `userResidence?`: *unknown* \| *jp*): *Promise*<TransactionResponse\>

オークションで勝利したアイテムを引き出すトランザクションを発行
ユーザーの居住地を問うUIを合わせて実装必要
消費税に関する会計処理などがスムーズに行えます

**Required**
- ウォレットに接続していること

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`itemId` | *string* | - | [Item](../modules.md#item)のitemId   |
`userResidence` | *unknown* \| *jp* | 'unknown' | [Residence](../modules.md#residence) 購入者の居住地を指定する   |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
const sdk = await AnnapurnaSDK.initialize(...)
await sdk.connectWallet() // required
try {
 const tx = await sdk.sendTxMakeSuccessfulBid('item.itemId', 'jp')
 // show loading
 await tx.wait()
 // success transaction
} catch (err) {
 // display error message
}
```

Defined in: [src/index.ts:573](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L573)

___

### waitForTransaction

▸ **waitForTransaction**(`txHash`: *string*): *Promise*<void\>

Transactionが成功するとResolveするPromiseを返します

**Required**
- ウォレットに接続していること

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`txHash` | *string* | {@link ethers.providers.TransactionResponse}のhashプロパティ  ```typescript import { AnnapurnaSDK } from '@kyuzan/annapurna' const sdk = await AnnapurnaSDK.initialize(...) await sdk.connectWallet() // required try {  const tx = await sdk.sendTxBuyItem('item.itemId')  await tx.wait()  // success transaction } catch (err) {  // display error message } ```    |

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:319](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L319)

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

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

const sdk = await AnnapurnaSDK.initialize(...)
await sdk.connectWallet()  // required
const walletInfo = await sdk.getWalletInfo()
AnnapurnaSDK.formatEther(walletInfo.balance) // 3.2
```

Defined in: [src/index.ts:63](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L63)

___

### initialize

▸ `Static`**initialize**(`accessToken`: *string*, `networkId`: [*NetworkId*](../modules.md#networkid), `walletSetting`: [*WalletSetting*](../modules.md#walletsetting), `devOption?`: { `backendUrl?`: *string* ; `contractMintAbi?`: *any* ; `contractMintShopAddress?`: *string* ; `jsonRPCUrl?`: *string*  }): *Promise*<[*AnnapurnaSDK*](annapurnasdk.md)\>

sdkのイシャライズ

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

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'
await AnnapurnaSDK.initialize(YOUR PROJECT ID, YOUR ACCESS TOKEN, { fortmatic: { token: YOUR FORTMATIC TOKEN } })
```

Defined in: [src/index.ts:124](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L124)

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

```typescript
import { AnnapurnaSDK } from '@kyuzan/annapurna'

AnnapurnaSDK.parseEther('3.2') // BigNumber
```

Defined in: [src/index.ts:44](https://github.com/KyuzanInc/annapurna-sdk-js/blob/89e5eb2/src/index.ts#L44)
