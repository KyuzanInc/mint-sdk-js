# SDK の package 公開方法

GithubAction での公開方法を行うと簡単です。

## Github Action の実行

1. [Github Actions](https://github.com/KyuzanInc/mint-sdk-js/actions)から`npm-publish`を選択
2. `run workflow`で、`main`ブランチを選択し実行
3. 自動で npm package 公開までアクションが実行されます。

## 公開までの Action 実行詳細・注意点

### npm publish の公開バージョンについて

publish のステップでは、action のきっかけとなる最新 commit から最後に publish されたすべての commit を調べます。
commit メッセージに基づいてリリースのバージョンのインクリメントを決めています

- mejer version: commit メッセージまたは説明に "BREAKING CHANGE" という文字がある

- minor version: commit メッセージまたは説明に "feat" という文字がある

- patch version: 上記以外

### Tag について

package 公開した際に公開するバージョンでタグを切るように設定しています。

### docs と demo site のデプロイ

SDK の package が公開成功した場合、最新の SDK を使うように docs と demo(example)のデプロイ Action が実行されます。

トリガーについては`workflows`の各アクション詳細を確認してください。

### 参考

https://github.com/marketplace/actions/automated-releases-for-npm-packages
