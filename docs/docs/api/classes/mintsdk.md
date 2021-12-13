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

Defined in: [src/index.ts:97](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L97)

## Properties

### getWalletInfo

• **getWalletInfo**: () => *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

ウォレットのアカウントと残高情報などの情報が取得できる

**Required**
- ウォレットに接続していること

**`returns`** 

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
await sdk.connectWallet()  // required
await sdk.getWalletInfo()
```

#### Type declaration:

▸ (): *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

**Returns:** *Promise*<[*WalletInfo*](../modules.md#walletinfo)\>

Defined in: [src/index.ts:206](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L206)

Defined in: [src/index.ts:206](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L206)

___

### walletStrategy

• `Private` **walletStrategy**: WalletStrategy

Defined in: [src/index.ts:97](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L97)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
await sdk.addEthereumChain(137)
```

Defined in: [src/index.ts:1125](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L1125)

___

### connectWallet

▸ **connectWallet**(): *Promise*<void\>

ウォレットに接続
MetamaskがインストールされているブラウザではMetamaskが、されていない場合はFortmaticに接続を行う
ウォレットが接続されるとResolveされる
ウォレット接続をキャンセルした場合は、Rejectされる

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
await sdk.isWalletConnect() // false
await sdk.connectWallet()
await sdk.isWalletConnect()  // true
```

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:171](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L171)

___

### disconnectWallet

▸ **disconnectWallet**(): *Promise*<void\>

ウォレットから切断
Fortmaticの場合、切断される
**MetaMaskが接続されている場合は何も実行されない**

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
await sdk.disconnectWallet()
```

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:187](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L187)

___

### getAccountInfo

▸ **getAccountInfo**(`arg`: { `walletAddress`: *string*  }): *Promise*<[*AccountInfo*](../interfaces/accountinfo.md)\>

ユーザーのウォレットアドレスの画像や表示名を取得できる
設定されていない場合は、各項目空文字が入っています

#### Parameters:

| Name | Type |
| :------ | :------ |
| `arg` | *object* |
| `arg.walletAddress` | *string* |

**Returns:** *Promise*<[*AccountInfo*](../interfaces/accountinfo.md)\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
const accountInfo = await sdk.getAccountInfo({ walletAddress: '0xxxxxxxx' })
```

Defined in: [src/index.ts:941](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L941)

___

### getConnectedNetworkId

▸ **getConnectedNetworkId**(): *Promise*<number\>

接続中のネットワークIDを返す

**Returns:** *Promise*<number\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
await sdk.getConnectedNetworkId()
```

Defined in: [src/index.ts:790](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L790)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemById('item.itemId')
```

Defined in: [src/index.ts:355](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L355)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemByToken(token)
```

Defined in: [src/index.ts:372](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L372)

___

### getItemLogs

▸ **getItemLogs**(`itemId`: *string*, `paging?`: { `page`: *number* = 1; `perPage`: *number* = 30 }): *Promise*<{ `accountAddress`: *string* ; `createAt`: Date ; `price`: *number* ; `transactionHash?`: *string* ; `type`: ItemLogTypeEnum  }[]\>

アイテムの履歴(bidされた、買われた)の取得
最新の物から返される

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `itemId` | *string* | - | [Item](../modules.md#item)のitemId |
| `paging` | *object* | - | - |
| `paging.page` | *number* | 1 | - |
| `paging.perPage` | *number* | 30 | - |

**Returns:** *Promise*<{ `accountAddress`: *string* ; `createAt`: Date ; `price`: *number* ; `transactionHash?`: *string* ; `type`: ItemLogTypeEnum  }[]\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemLogs('Item.itemId')
```

Defined in: [src/index.ts:399](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L399)

___

### getItemShippingInfo

▸ **getItemShippingInfo**(`arg`: { `itemId`: *string*  }): *Promise*<InlineResponse2006\>

物理アイテム付きのItemの入力された発送先情報を取得
{@link Items}セキュリティの観点から、ユーザーのSignが必要になります

**Required**
- ウォレットに接続していること
- ユーザーが[Item](../modules.md#item)の`type`が`nftWithPhysicalProduct`であること
- [Item](../modules.md#item)が引き出されている or 買われていること（[Token](../modules.md#token)になっていること)
- ユーザーが[Item](../modules.md#item)の`physicalOrderStatus`が`wip`または`ship`であること
- ユーザーが[Token](../modules.md#token)の所有者であること

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | *object* | itemId = [Item](../modules.md#item)のitemI |
| `arg.itemId` | *string* | - |

**Returns:** *Promise*<InlineResponse2006\>

Defined in: [src/index.ts:889](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L889)

___

### getItems

▸ **getItems**(`__namedParameters?`: { `itemType?`: ``"nft"`` \| ``"nftWithPhysicalProduct"`` ; `networkId?`: [*NetworkId*](../modules.md#networkid)[] ; `onSale?`: *boolean* ; `page`: *number* ; `perPage`: *number* ; `sort?`: { `order`: ``"asc"`` \| ``"desc"`` ; `sortBy`: ``"endAt"`` \| ``"startAt"`` \| ``"price"``  } ; `tradeType?`: ``"fixedPrice"`` \| ``"auction"`` \| ``"autoExtensionAuction"``  }): *Promise*<[*Item*](../modules.md#item)[]\>

公開中(Items.openStatus === 'open')のアイテムを取得
ステータスの変更は管理画面から行えます。

#### 制限事項

次の制限事項に注意してください。

- `tradeType === 'fixedPrice'`を指定した場合、`'endAt' | 'startAt'`によるsortは行えません
- `tradeType === 'auction'`を指定した場合、`price`によるsortは行えません
- `onSale`を指定した場合、`startAt`によるsortは行えません

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | *object* | - |
| `__namedParameters.itemType?` | ``"nft"`` \| ``"nftWithPhysicalProduct"`` | - |
| `__namedParameters.networkId?` | [*NetworkId*](../modules.md#networkid)[] | 指定しなければ、コンストラクターの値が使われます |
| `__namedParameters.onSale?` | *boolean* |  |
| `__namedParameters.page` | *number* | ページ数。 |
| `__namedParameters.perPage` | *number* | 1ページあたりのアイテム数。 デフォルトは30。 |
| `__namedParameters.sort?` | *object* | `'endAt','startAt'`はオークションの場合に有効で、オークションの終了・開始時間でsortを行います。`price`は固定価格販売の場合のみ有効です。 |
| `__namedParameters.sort.order` | ``"asc"`` \| ``"desc"`` | - |
| `__namedParameters.sort.sortBy` | ``"endAt"`` \| ``"startAt"`` \| ``"price"`` | - |
| `__namedParameters.tradeType?` | ``"fixedPrice"`` \| ``"auction"`` \| ``"autoExtensionAuction"`` | - |

**Returns:** *Promise*<[*Item*](../modules.md#item)[]\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)

const items = await sdk.getItems({ onSale: true })
```

Defined in: [src/index.ts:261](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L261)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
const item = await sdk.getItemsByBidderAddress('0x1111......')
```

Defined in: [src/index.ts:332](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L332)

___

### getServerUnixTime

▸ **getServerUnixTime**(): *Promise*<number\>

サーバーのUnixタイムを取得

**Returns:** *Promise*<number\>

unix time (ms)

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
await sdk.getServerUnixTime()  // ex) 1615444120104
```

Defined in: [src/index.ts:733](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L733)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...
const tokens = await sdk.getTokensByAddress('0x11111...')
```

Defined in: [src/index.ts:431](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L431)

___

### isCorrectNetwork

▸ **isCorrectNetwork**(): *Promise*<boolean\>

適切なネットワークかを判定

**Returns:** *Promise*<boolean\>

trueならば適切なネットワーク

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.isCorrectNetwork() // true
```

Defined in: [src/index.ts:766](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L766)

___

### isInjectedWallet

▸ **isInjectedWallet**(): *boolean*

MetaMaskかどうかを判定

**Returns:** *boolean*

trueならばMetaMask

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.isInjectedWallet() // true
```

Defined in: [src/index.ts:750](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L750)

___

### isWalletConnect

▸ **isWalletConnect**(): *Promise*<boolean\>

有効なアカウントがあるの状態を返す

**Returns:** *Promise*<boolean\>

ウォレットが接続されていればtrue

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
await sdk.isWalletConnect()
```

Defined in: [src/index.ts:153](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L153)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
sdk.onAccountsChange((accounts: string[]) => {
   // some thing
})
```

Defined in: [src/index.ts:659](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L659)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
sdk.onConnect(() => {
   // some thing
})
```

Defined in: [src/index.ts:684](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L684)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = await MintSDK.initialize(...)
sdk.onDisconnect(() => {
   // some thing
})
```

Defined in: [src/index.ts:709](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L709)

___

### registerItemShippingInfo

▸ **registerItemShippingInfo**(`arg`: { `itemId`: *string* ; `shippingInfo`: *Omit*<[*RegisterItemShippingInfoRequestBody*](../interfaces/registeritemshippinginforequestbody.md), ``"tokenId"`` \| ``"signedData"`` \| ``"chainType"`` \| ``"networkId"`` \| ``"contractAddress"``\>  }): *Promise*<void\>

物理アイテム付きのItemの発送先情報を登録
ユーザーに配送先情報を入力してもらうフォームなどを用意して使ってください

**Required**
- ウォレットに接続していること
- ユーザーが[Item](../modules.md#item)の`type`が`nftWithPhysicalProduct`であること
- [Item](../modules.md#item)が引き出されている or 買われていること（[Token](../modules.md#token)になっていること)
- ユーザーが[Item](../modules.md#item)の`physicalOrderStatus`が`shippingInfoIsBlank`であること
- ユーザーが[Token](../modules.md#token)の所有者であること

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | *object* | itemId = [Item](../modules.md#item)のitemId, shippingInfo = 配送先情報 |
| `arg.itemId` | *string* | - |
| `arg.shippingInfo` | *Omit*<[*RegisterItemShippingInfoRequestBody*](../interfaces/registeritemshippinginforequestbody.md), ``"tokenId"`` \| ``"signedData"`` \| ``"chainType"`` \| ``"networkId"`` \| ``"contractAddress"``\> | - |

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:809](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L809)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
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

Defined in: [src/index.ts:466](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L466)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'
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

Defined in: [src/index.ts:595](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L595)

___

### sendTxMakeSuccessfulBid

▸ **sendTxMakeSuccessfulBid**(`itemId`: *string*, `userResidence?`: ``"unknown"`` \| ``"jp"``): *Promise*<TransactionResponse\>

オークションで勝利したアイテムを引き出すトランザクションを発行
ユーザーの居住地を問うUIを合わせて実装必要です。居住地を設定することで消費税に関する会計処理などがスムーズに行えます

**Required**
- ウォレットに接続していること
- **自動延長オークションは、`withdrawableAt`以降に引き出し可能です**

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `itemId` | *string* | - | [Item](../modules.md#item)のitemId |
| `userResidence` | ``"unknown"`` \| ``"jp"`` | 'unknown' | [Residence](../modules.md#residence) 購入者の居住地を指定する |

**Returns:** *Promise*<TransactionResponse\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'
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

Defined in: [src/index.ts:530](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L530)

___

### updateAccountInfo

▸ **updateAccountInfo**(`arg`: { `avatarImageId`: *string* ; `bio`: *string* ; `displayName`: *string* ; `homepageUrl`: *string* ; `instagramAccountName`: *string* ; `twitterAccountName`: *string*  }): *Promise*<void\>

ユーザーのウォレットアドレスの画像や表示名を設定できる
全ての項目は optionalです。設定しない場合は空文字を入れてください
`avatarImageId`は`sdk.uploadImg`の返り値です

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type |
| :------ | :------ |
| `arg` | *object* |
| `arg.avatarImageId` | *string* |
| `arg.bio` | *string* |
| `arg.displayName` | *string* |
| `arg.homepageUrl` | *string* |
| `arg.instagramAccountName` | *string* |
| `arg.twitterAccountName` | *string* |

**Returns:** *Promise*<void\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
const imgId = await sdk.uploadAvatarImg()
await sdk.updateAccountInfo({ imgId, .... })
```

Defined in: [src/index.ts:970](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L970)

___

### uploadAccountInfoAvatar

▸ **uploadAccountInfoAvatar**(`arg`: { `file`: File  }): *Promise*<{ `imgId`: *string* ; `uploadedImgUrl`: *string*  }\>

`sdk.updateAccountInfo`の引数の`imgId`を取得できる
uploadedImgUrlはアップロードされた画像のRead用のURLです。

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type |
| :------ | :------ |
| `arg` | *object* |
| `arg.file` | File |

**Returns:** *Promise*<{ `imgId`: *string* ; `uploadedImgUrl`: *string*  }\>

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = MintSDK.initialize(...)
await sdk.connectWallet()
const { imgId, uploadedImgUrl } = await sdk.uploadAccountInfoAvatar({ file })
```

Defined in: [src/index.ts:1045](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L1045)

___

### waitForTransaction

▸ **waitForTransaction**(`txHash`: *string*): *Promise*<void\>

Transactionが成功するとResolveするPromiseを返します

**Required**
- ウォレットに接続していること

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | *string* | {@link ethers.providers.TransactionResponse}のhashプロパティ  ```typescript import { MintSDK } from '@kyuzan/mint-sdk-js' const sdk = await MintSDK.initialize(...) await sdk.connectWallet() // required try {  const tx = await sdk.sendTxBuyItem('item.itemId')  await tx.wait()  // success transaction } catch (err) {  // display error message } ``` |

**Returns:** *Promise*<void\>

Defined in: [src/index.ts:231](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L231)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'

const sdk = await MintSDK.initialize(...)
await sdk.connectWallet()  // required
const walletInfo = await sdk.getWalletInfo()
MintSDK.formatEther(walletInfo.balance) // 3.2
```

Defined in: [src/index.ts:83](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L83)

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
import { MintSDK } from '@kyuzan/mint-sdk-js'

MintSDK.parseEther('3.2') // BigNumber
```

Defined in: [src/index.ts:64](https://github.com/KyuzanInc/annapurna-sdk-js/blob/5eef657/src/index.ts#L64)
