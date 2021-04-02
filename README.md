# @kyuzan/mint-sdk-js

[![npm version](https://badge.fury.io/js/%40kyuzan%2Fmint-sdk-js.svg)](https://badge.fury.io/js/%40kyuzan%2Fmint-sdk-js)

[Mint](https://www.mintnft.jp/) クライアント SDK

## Mint の導入

お気軽に[Kyuzan Inc.](https://www.mintnft.jp/) にお問い合わせください。

## Source Code

[@kyuzan/mint-sdk-js](https://github.com/KyuzanInc/mint-sdk-js)

## Getting Started

### Install

```bash
% npm i @kyuzan/mint-sdk-js
```

### API Documentation

[SDK Docs](https://kyuzaninc.github.io/mint-sdk-js/)

## About ETH

通常の NFT ショップなどは ETH は、ether という単位で取引される。（日本円でいうと`円`）

ETH にとって wei が最小単位である。（銭）

`1ether === 1000000000000000000wei`

### ETH in SDK

SDK では基本的には、`number`型を用いて ether 単位で通貨を扱う。

一部、`BigNumber`クラスとして通貨を扱っている。wei を`number`型で扱うと、環境によってはオーバーフローを起こすため、`BigNumber`クラスを用いて表現しているためだ。

SDK では通貨のユーティリティーとして以下を提供している。

- `SDK.formatEther` を用いると、`BigNumber`から ether 単位に変換した`string`を取得できる
- `SDK.parseEther`を用いると、ether の文字列から`wei`を表現した`BigNumber`を取得できる

## How to Get ETH for Rinkeby(Test Env)

テスト環境で使える ETH の入手方法は以下の通り

1. ウォレットのアドレスをメモ
1. [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/) のサイトにアクセス
1. Tweet リンクをクリック
1. `0x0000.....`部分を 1 でメモしたアドレスに置換する
1. Tweet
1. Tweet の URL をコピーしサイトの Input に貼り付ける
1. Give me Ether ボタンを押す
1. しばらくすると入金される
