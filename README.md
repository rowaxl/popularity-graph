# 都道府県総人口推移グラフ

[地域経済分析システム（RESAS：リーサス）](https://opendata.resas-portal.go.jp/)のデータを利用し、
5年ごとの都道府県別人口推移をグラフとして表すアプリケーションである。

## 構成
Next.js
SWR
YARN

## 環境構築方法
1. Git Repositoryをクローンする
2. [RESAS](https://opendata.resas-portal.go.jp/)に利用登録し、API KEYを発行する
3. `.env.local`に、`NEXT_PUBLIC_RESAS_API_KEY=<API KEY>`を入力し保存する
4. プロジェクトルートで `yarn install` を実行して、必要ライブラリーをインストールする
5. (開発環境) `yarn dev` を実行し、開発環境を立ち上げる (本番環境) `yarn build` `yarn start`順で実行し、環境を立ち上げる
