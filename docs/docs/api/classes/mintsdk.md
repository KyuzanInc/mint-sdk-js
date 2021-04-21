---
id: "mintsdk"
title: "Class: MintSDK"
sidebar_label: "MintSDK"
custom_edit_url: null
hide_title: true
---

# Class: MintSDK

## Constructors

### constructor

\+ **new MintSDK**(`accessToken`: *string*, `networkIds`: [*NetworkId*](../modules.md#networkid)[], `walletSetting`: [*WalletSetting*](../modules.md#walletsetting), `devOption?`: { `backendUrl?`: *string* ; `jsonRPCUrl?`: *string*  }): [*MintSDK*](mintsdk.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `accessToken` | *string* |
| `networkIds` | [*NetworkId*](../modules.md#networkid)[] |
| `walletSetting` | [*WalletSetting*](../modules.md#walletsetting) |
| `devOption?` | *object* |
| `devOption.backendUrl?` | *string* |
| `devOption.jsonRPCUrl?` | *string* |

**Returns:** [*MintSDK*](mintsdk.md)

Defined in: [src/index.ts:97](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L97)

## Properties

### getWalletInfo

• **getWalletInfo**: () => *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

ウォレットのアカウントと残高情報などの情報が取得できる

**Required**
- ウォレットに接続していること

**`returns`** 

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
await sdk.connectWallet()  // required
await sdk.getWalletInfo()
```

#### Type declaration:

▸ (): *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

**Returns:** *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

Defined in: [src/index.ts:232](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L232)

Defined in: [src/index.ts:232](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L232)

## Methods

### addEthereumChain

▸ **addEthereumChain**(`networkId`: ``80001`` \| ``137``): *Promise*<void\>

指定したネットワークをウォレットに追加する
137 => Polygon本番ネットワーク
80001 => Polygonテストネットワーク

**Required**
sdk.isInjectedWallet() => trueの場合のみ（MetaMaskのみ使える）

#### Parameters:

| Name | Type |
| :------ | :------ |
| `networkId` | ``80001`` \| ``137`` |

**Returns:** *Promise*<void\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
await sdk.getConnectedNetworkId()
```

Defined in: [src/index.ts:832](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L832)

___

### connectWallet

▸ **connectWallet**(): *Promise*<void\>

ウォレットに接続
MetamaskがインストールされているブラウザではMetamaskが、されていない場合はFortmaticに接続を行う
ウォレットが接続されるとResolveされる
ウォレット接続をキャンセルした場合は、Rejectされる

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
await sdk.isWalletConnect() // false
await sdk.connectWallet()
await sdk.isWalletConnect()  // true
```

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:188](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L188)

___

### disconnectWallet

▸ **disconnectWallet**(): *Promise*<void\>

ウォレットから切断
Fortmaticの場合、切断される
**MetaMaskが接続されている場合は何も実行されない**

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
await sdk.disconnectWallet()
```

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:212](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L212)

___

### getConnectedNetworkId

▸ **getConnectedNetworkId**(): *Promise*<number\>

接続中のネットワークIDを返す

**Returns:** *Promise*<number\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
await sdk.getConnectedNetworkId()
```

Defined in: [src/index.ts:805](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L805)

___

### getItemById

▸ **getItemById**(`itemId`: *string*): *Promise*<[*Item*](../modules.md#item)\>

ItemのitemId指定でアイテムを取得

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | *string* | [Item](../modules.md#item)のitemId |

**Returns:** *Promise*<[*Item*](../modules.md#item)\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemById('item.itemId')
```

Defined in: [src/index.ts:361](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L361)

___

### getItemByToken

▸ **getItemByToken**(`token`: [*Token*](../modules.md#token)): *Promise*<[*Item*](../modules.md#item)\>

Tokenに紐づいたItemを取得

#### Parameters:

| Name | Type |
| :------ | :------ |
| `token` | [*Token*](../modules.md#token) |

**Returns:** *Promise*<[*Item*](../modules.md#item)\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemByToken(token)
```

Defined in: [src/index.ts:378](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L378)

___

### getItemLogs

▸ **getItemLogs**(`itemId`: *string*, `paging?`: { `page`: *number* = 1; `perPage`: *number* = 30 }): *Promise*<[*ItemLog*](../modules.md#itemlog)[]\>

アイテムの履歴(bidされた、買われた)の取得
最新の物から返される

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `itemId` | *string* | - | [Item](../modules.md#item)のitemId |
| `paging` | *object* | - | - |
| `paging.page` | *number* | 1 | - |
| `paging.perPage` | *number* | 30 | - |

**Returns:** *Promise*<[*ItemLog*](../modules.md#itemlog)[]\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemLogs('Item.itemId')
```

Defined in: [src/index.ts:405](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L405)

___

### getItems

▸ **getItems**(`__namedParameters?`: { `page`: *number* ; `perPage`: *number*  }): *Promise*<[*Item*](../modules.md#item)[]\>

公開中のアイテムを取得

#### Parameters:

| Name | Type |
| :------ | :------ |
| `__namedParameters` | *object* |
| `__namedParameters.page` | *number* |
| `__namedParameters.perPage` | *number* |

**Returns:** *Promise*<[*Item*](../modules.md#item)[]\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
const items = await sdk.getItems()
```

Defined in: [src/index.ts:306](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L306)

___

### getItemsByBidderAddress

▸ **getItemsByBidderAddress**(`address`: *string*): *Promise*<[*Item*](../modules.md#item)[]\>

指定したアドレスがBidしたItemの一覧を取得

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | *string* | ウォレットのアドレス |

**Returns:** *Promise*<[*Item*](../modules.md#item)[]\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemsByBidderAddress('0x1111......')
```

Defined in: [src/index.ts:338](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L338)

___

### getServerUnixTime

▸ **getServerUnixTime**(): *Promise*<any\>

サーバーのUnixタイムを取得

**Returns:** *Promise*<any\>

unix time (ms)

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
await sdk.getServerUnixTime()  // ex) 1615444120104
```

Defined in: [src/index.ts:748](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L748)

___

### getTokensByAddress

▸ **getTokensByAddress**(`address`: *string*): *Promise*<[*Token*](../modules.md#token)[]\>

指定したアドレスが所持しているMINT経由で獲得したトークンを取得

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | *string* | Walletのアドレス |

**Returns:** *Promise*<[*Token*](../modules.md#token)[]\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...
const tokens = await sdk.getTokensByAddress('0x11111...')
```

Defined in: [src/index.ts:442](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L442)

___

### isCorrectNetwork

▸ **isCorrectNetwork**(): *Promise*<boolean\>

適切なネットワークかを判定

**Returns:** *Promise*<boolean\>

trueならば適切なネットワーク

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.isCorrectNetwork() // true
```

Defined in: [src/index.ts:781](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L781)

___

### isInjectedWallet

▸ **isInjectedWallet**(): *boolean*

MetaMaskかどうかを判定

**Returns:** *boolean*

trueならばMetaMask

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.isInjectedWallet() // true
```

Defined in: [src/index.ts:765](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L765)

___

### isWalletConnect

▸ **isWalletConnect**(): *Promise*<any\>

有効なアカウントがあるの状態を返す

**Returns:** *Promise*<any\>

ウォレットが接続されていればtrue

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
await sdk.isWalletConnect()
```

Defined in: [src/index.ts:165](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L165)

___

### onAccountsChange

▸ **onAccountsChange**(`callback`: (`accounts`: *string*[]) => *any*): *void*

アカウントが変更された際に呼び出される関数を設定できる

#### Parameters:

| Name | Type |
| :------ | :------ |
| `callback` | (`accounts`: *string*[]) => *any* |

**Returns:** *void*

void

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
sdk.onAccountsChange((accounts: string[]) => {
   // some thing
})
```

Defined in: [src/index.ts:650](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L650)

___

### onConnect

▸ **onConnect**(`callback`: () => *any*): *void*

ウォレットに接続した際に呼び出される関数を設定できる

#### Parameters:

| Name | Type |
| :------ | :------ |
| `callback` | () => *any* |

**Returns:** *void*

void

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
sdk.onConnect(() => {
   // some thing
})
```

Defined in: [src/index.ts:683](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L683)

___

### onDisconnect

▸ **onDisconnect**(`callback`: () => *any*): *void*

ウォレットから切断した際に呼び出される関数を設定できる

#### Parameters:

| Name | Type |
| :------ | :------ |
| `callback` | () => *any* |

**Returns:** *void*

void

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
sdk.onDisconnect(() => {
   // some thing
})
```

Defined in: [src/index.ts:716](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L716)

___

### sendTxBid

▸ **sendTxBid**(`itemId`: *string*, `bidPrice`: *number*): *Promise*<TransactionResponse\>

指定した金額でBidするトランザクションを発行
Bidする謹賀具の総額を`bidPrice`に指定する

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemId` | *string* | [Item](../modules.md#item)のitemId |
| `bidPrice` | *number* | 単位はether |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
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

Defined in: [src/index.ts:474](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L474)

___

### sendTxBuyItem

▸ **sendTxBuyItem**(`itemId`: *string*, `userResidence?`: ``"unknown"`` \| ``"jp"``): *Promise*<TransactionResponse\>

FixedPriceのアイテムを購入するトランザクションを発行
ユーザーの居住地を問うUIを合わせて実装必要
消費税に関する会計処理などがスムーズに行えます

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `itemId` | *string* | - | [Item](../modules.md#item)のitemId |
| `userResidence` | ``"unknown"`` \| ``"jp"`` | 'unknown' | [Residence](../modules.md#residence) 購入者の居住地を指定する |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
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

Defined in: [src/index.ts:595](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L595)

___

### sendTxMakeSuccessfulBid

▸ **sendTxMakeSuccessfulBid**(`itemId`: *string*, `userResidence?`: ``"unknown"`` \| ``"jp"``): *Promise*<TransactionResponse\>

オークションで勝利したアイテムを引き出すトランザクションを発行
ユーザーの居住地を問うUIを合わせて実装必要
消費税に関する会計処理などがスムーズに行えます

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `itemId` | *string* | - | [Item](../modules.md#item)のitemId |
| `userResidence` | ``"unknown"`` \| ``"jp"`` | 'unknown' | [Residence](../modules.md#residence) 購入者の居住地を指定する |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
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

Defined in: [src/index.ts:534](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L534)

___

### validateNetworkForItem

▸ `Private`**validateNetworkForItem**(`item`: [*Item*](../modules.md#item)): *Promise*<void\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `item` | [*Item*](../modules.md#item) |

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:878](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L878)

___

### waitForTransaction

▸ **waitForTransaction**(`txHash`: *string*): *Promise*<void\>

Transactionが成功するとResolveするPromiseを返します

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | *string* | {@link ethers.providers.TransactionResponse}のhashプロパティ  ```typescript import { MintSDK } from '@KyuzanInc/mint-sdk-js' const sdk = await MintSDK.initialize(...) await sdk.connectWallet() // required try {  const tx = await sdk.sendTxBuyItem('item.itemId')  await tx.wait()  // success transaction } catch (err) {  // display error message } ``` |

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:286](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L286)

___

### formatEther

▸ `Static`**formatEther**(`bg`: *BigNumber*): *string*

BigNumberをether(通常のETHと表示される価格)にフォーマットして返す

#### Parameters:

| Name | Type |
| :------ | :------ |
| `bg` | *BigNumber* |

**Returns:** *string*

Ether単位でパースされたstring

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
await sdk.connectWallet()  // required
const walletInfo = await sdk.getWalletInfo()
MintSDK.formatEther(walletInfo.balance) // 3.2
```

Defined in: [src/index.ts:65](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L65)

___

### parseEther

▸ `Static`**parseEther**(`ether`: *string*): *BigNumber*

ether(通常のETHと表示される価格)をBigNumberとして返す

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ether` | *string* | 通常のETHと表示されるもの |

**Returns:** *BigNumber*

etherをBigNumberとしてparseしたもの

```typescript
import { MintSDK } from '@KyuzanInc/mint-sdk-js'

MintSDK.parseEther('3.2') // BigNumber
```

Defined in: [src/index.ts:46](https://github.com/KyuzanInc/annapurna-sdk-js/blob/d180508/src/index.ts#L46)
