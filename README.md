# GrokBotToDoList

ブラウザで動く ToDo リストです。タスクの追加・完了・編集・削除、フィルタ、localStorage による永続化に対応しています。認証は不要です。

## 機能

- タスク追加（タイトル必須、メモと期限は任意）
- 一覧表示
- 完了 / 未完了の切り替え
- タイトルの編集
- 削除（確認ダイアログ + 元に戻す）
- フィルタ（すべて / 未完了 / 完了済み）
- ブラウザの localStorage に保存（再読み込みしても残る）

## 必要な環境

- Node.js 18 以上
- npm

## インストール

```bash
npm install
```

## ローカルで起動

```bash
npm run dev
```

起動後、ブラウザで表示される URL（通常は http://localhost:5173 ）を開きます。

## テスト

```bash
npm test
```

ウォッチモードで実行する場合:

```bash
npm run test:watch
```

テストは Vitest で、追加・完了・削除・永続化をカバーしています。

## 本番ビルド

```bash
npm run build
npm run preview
```

`npm run build` は型チェックのあと、`dist/` に静的ファイルを出力します。

## 技術スタック

- Vite
- React
- TypeScript
- Vitest / Testing Library
