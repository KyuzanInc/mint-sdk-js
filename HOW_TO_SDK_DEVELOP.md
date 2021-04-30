# SDK の開発方法

## `example/`を利用した開発

example のコードで、`npm link`を用いて SDK の開発を行うと簡単です。

[npm link 使い方参考 URL](https://docs.npmjs.com/cli/v7/commands/npm-link)

1. `% npm link`をルートディレクトリーで行う
2. `example`ディレクトリーで、`npm link @kyuzan/mint-sdk-js`

これで、`example`から利用される SDK はローカルのものとなります。

あとは、SDK のルートディレクトリーで`% npm run dev`をしながら開発するとリアルタイムでコードが反映された開発ができます

### 後始末

`example`ディレクトリーで`% npm i`することで元に戻ります。
