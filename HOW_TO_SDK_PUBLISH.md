# SDK のpackage 公開方法

GithubActionでの公開方法を行うと簡単です。

## Github Action の実行

1. [Github Actions](https://github.com/KyuzanInc/mint-sdk-js/actions)から`npm-publish`を選択
2. `run workflow`で、`main`ブランチを選択し実行
3. 自動でnpm package 公開までアクションが実行されます。

## 公開までのAction実行詳細・注意点

### npm publish の公開バージョンについて

バージョンは実行したブランチのルートのpackage.jsonに記されるバージョンで公開をおこないます。

すでに指定versionでpackageが公開されている場合、**patch version**を1つ挙げて公開します。

minor version, major version を上げる際はpackage.jsonのバージョン変更をおこなってください。

### Tagについて

package公開する際に公開するバージョンでタグを切るように設定しています。

### docs と demo site のデプロイ

SDKのpackageが公開成功した場合、最新のSDKを使うようにdocsとdemo(example)のデプロイActionが実行されます。

トリガーについては`workflows`の各アクション詳細を確認してください。