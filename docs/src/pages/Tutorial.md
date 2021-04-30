---
title: Tutorial
---

# Mint SDK チュートリアル

このチュートリアルを終えると、Rinkeby ネットワークでの NFT のオークション取引を一通り行うことができます。

## 0.事前に必要なこと

1. Kyuzan Inc. に問い合わせ、プロジェクトの`access-token`を取得する
2. [Fortmatic](https://fortmatic.com/)から Rinkeby 用のアクセストークンを取得する
3. [#how-to-get-eth-for-rinkebytest-env](/docs/api#how-to-get-eth-for-rinkebytest-env)を参考に Rinkeby の ETH を取得する

## 1.パッケージのインストール

```sh
% npm i @kyuzan/mint-sdk-js
```

## 2.SDK の初期化

```typescript
import { MintSDK } from '@kyuzan/mint-sdk-js'
const sdk = new MintSDK({
  'YOUR_ACCESS_KEY',
  [4],
  {
    fortmatic: {
      key: 'YOUR_FORTMATIC_KEY',
    },
  }
})
```

## 3.Item の取得

以下のメソッドで、公開されている`Item`を取得することができます。

```jsx
const items = sdk.getItems()
```

## 4.SendTxBidAuction

## 5.SendTxBuyAuction