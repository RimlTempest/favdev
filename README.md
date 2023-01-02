# favdev

読んだ技術記事を簡単にまとめ共有するサービスです。  
ランキング付けなどを行い共有できます。  
他にもその記事から得られた知識のメモも一緒に残すことができます。

## 開発環境

⚙️ VS Code extensions

- ESLint
- Prettier

フロントエンド

- NextJs13 / React
- next-auth [next-auth 公式サイト](https://next-auth.js.org/)

バックエンド

- tRPC [tRPC 公式サイト](https://trpc.io)
- WebSockets
- Prisma

バックエンド

- postgres

✅ テスト

- Playwright [Playwright 公式サイト](https://playwright.dev/)

💚 CI

- GitHub Actions

## 環境構築

```bash
# git clone
git clone https://github.com/RimlTempest/favdev.git

# ローカル環境
cd favdev

# パッケージ
pnpm i
```

## コマンド

実行

```bash
# ビルド runs `prisma generate` + `prisma migrate` + `next build`
pnpm build

# DB リセット
pnpm db-nuke

# 開発環境 next.js + WebSocket server
pnpm dev

# リセットして立ち上げ postgres db + runs migrations + seeds + starts next.js
pnpm dx

```

テスト

```bash

# 単体テスト 実行
pnpm test:unit  # runs normal jest unit tests

# E2Eテスト 実行
pnpm test:e2e

# 開発環境 E2Eテスト 実行
pnpm test-dev   # runs e2e tests on dev

# 開発環境 E2Eテスト 実行
pnpm test-start # runs e2e tests on `next start` - build required before
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