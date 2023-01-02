# favdev

読んだ技術記事を簡単にまとめ共有するサービスです。  
ランキング付けなどを行い共有できます。  
他にもその記事から得られた知識のメモも一緒に残すことができます。

パス、シーケンス図は [こちら](./docs/設計.md)

## 開発環境

### ⚙️ VS Code

- ESLint
- Prettier
- markuplint

### 🗼 フロントエンド

feature driven 設計を参考にし実装を行っています。

単体テストは Jest を利用し記述していきます。  
結合テストは Storybook/Jest を利用し stories ファイルに記述していきます。  
E2E テストは Playwright を利用し記述していきます。

詳しくは以下を用いています ↓

- NextJS 13 / React
- next-auth [next-auth 公式サイト](https://next-auth.js.org/)
- tailwind
- lint
  - eslint
  - prettier
  - markuplint

### 🔨 バックエンド

tRPC を利用して実装を行っていきます。  
ランキング編集画面にて WebSockets を利用したリアルタイム更新がされる仕組みを実現しています。  
Prisma は DB の ORM ツールで CRUD 操作の効率化や可視化などを行ってくれます。  
zod はバリデーションツールで入力情報などの制限をかけたりするのに利用しております。

詳しくは以下を用いています ↓

- tRPC [tRPC 公式サイト](https://trpc.io)
- WebSockets
- Prisma
- zod

### 💾 DB

基本的に postgres を利用しています。  
ビルドやテスト時は sqlite で仮環境を作成します。

- postgres
- sqlite

### ✅ テスト

- Jest
- Playwright [Playwright 公式サイト](https://playwright.dev/)

### 💚 CI

- GitHub Actions
  - Lighthouse CI
  - Playwright vrt
  - CodeQL

### 💻 効率化

- docker-compose
- Storybook
- renovate

## 環境構築

```bash
# git clone
git clone https://github.com/RimlTempest/favdev.git

# ローカル環境
cd favdev

# パッケージ
yarn i
```

## コマンド

実行

```bash
# ビルド runs `prisma generate` + `prisma migrate` + `next build`
yarn build

# DB リセット
yarn db-nuke

# 開発環境 next.js + WebSocket server
yarn dev

# リセットして立ち上げ postgres db + runs migrations + seeds + starts next.js
yarn dx

```

テスト

```bash

# 単体テスト 実行
yarn test:unit

# E2Eテスト 実行
yarn test

# 開発環境 E2Eテスト 実行
yarn test:dev

# 開発環境 E2Eテスト 実行
yarn test:start
```

効率化

```bash
# storybook 立ち上げ
yarn storybook

# prisma studio立ち上げ
yarn studio
```

## Deployment

### Using [Render](https://render.com/)

The project contains a [`render.yaml`](./render.yaml) [_"Blueprint"_](https://render.com/docs/blueprint-spec) which makes the project easily deployable on [Render](https://render.com/).

The database is setup with a `starter` plan, but you can use a free plan for 90 days.

Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints) and connect to this Blueprint and see how the app and database automatically gets deployed.

You will either need to create an environment group called `trpc-websockets` with environment variables or remove that from `render.yaml` in favor of manual environment variables that overrides the ones in `/.env`.

## Files of note

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="./prisma/schema.prisma"><code>./prisma/schema.prisma</code></a></td>
      <td>Prisma schema</td>
    </tr>
    <tr>
      <td><a href="./src/api/trpc/[trpc].tsx"><code>./src/api/trpc/[trpc].tsx</code></a></td>
      <td>tRPC response handler</td>
    </tr>
    <tr>
      <td><a href="./src/server/routers"><code>./src/server/routers</code></a></td>
      <td>Your app's different tRPC-routers</td>
    </tr>
  </tbody>
</table>
