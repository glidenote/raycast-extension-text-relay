# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Text Relay for Raycastは、Raycast内で入力したテキストを現在アクティブな他のアプリケーションウィンドウに自動送信する拡張機能です。直接ペーストをサポートしていないアプリケーションへのテキスト入力を支援します。

## 開発コマンド

```bash
# 開発モードで実行（Raycast内でリアルタイム更新）
pnpm run dev

# プロダクションビルド
pnpm run build

# コードのlint実行
pnpm run lint

# lintエラーの自動修正
pnpm run fix-lint

# Raycast Storeへの公開
pnpm run publish
```

## アーキテクチャ

### コア実装
- **src/send-text.tsx**: メインコンポーネント
  - Raycast Form APIを使用したUI実装
  - Raycast Clipboard.paste APIでテキスト送信
  - 自動的なウィンドウ管理とフォーカス制御

### 技術的な実装フロー
1. ユーザーがForm内でテキスト入力
2. 遅延時間を設定（デフォルト0.1秒）
3. Cmd+Enterで送信トリガー
4. 指定時間待機
5. `Clipboard.paste()`APIでテキストを送信
   - Raycastが自動的にウィンドウを閉じる
   - 前のアプリケーションにフォーカスを戻す
   - テキストをペースト

### 重要な技術的制約
- **クリップボード依存**: ターゲットアプリがペースト操作をサポートしている必要がある

## Raycast開発の特徴

### Raycast API使用パターン
- `@raycast/api`からのインポートが基本
- `Form`コンポーネントでユーザー入力を受け付け
- `Action.SubmitForm`でフォーム送信を処理
- `showToast`で通知表示
- `closeMainWindow`でRaycastウィンドウを閉じる

### 開発時の注意点
- `ray develop`コマンドで自動リロードが有効
- エラーはToast通知で表示するのがRaycastの慣習
- キーボードショートカットは`shortcut`プロパティで定義

## デバッグとテスト

### 手動テスト手順
1. `pnpm run dev`で開発モード起動
2. Raycast内で"Send Text to Active Window"を検索
3. テキスト入力してCtrl+Enterで送信
4. ターゲットアプリケーションで結果確認

### よくある問題
- **ペースト非対応アプリ**: 一部のアプリケーションではペースト操作がサポートされていない場合がある

## 拡張時の考慮事項

- 新機能追加時は`Form`コンポーネントに新しいフィールドを追加
- エラーハンドリングは必ず`showToast`で通知
- `Clipboard.paste()`APIは自動的にウィンドウ管理を行うため、手動での`closeMainWindow()`は不要