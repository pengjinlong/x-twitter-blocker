# X/Twitter キーワードブロッカー

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Tampermonkey-orange.svg)

**言語:**
[🇨🇳 中文](../README.md) · [🇺🇸 English](README_en.md) · [🇯🇵 日本語](README_ja.md) · [🇰🇷 한국어](README_ko.md) · [🇩🇪 Deutsch](README_de.md) · [🇪🇸 Español](README_es.md)

</div>

---

## 📖 概要

**X/Twitter キーワードブロッカー** は、X（旧Twitter）上の特定キーワードを含むツイートやコメントを自動的に非表示にする軽量ブラウザツールです。**Chrome拡張機能** と **Tampermonkeyユーザースクリプト** の2つの方式をサポートし、快適なブラウジング体験を提供します。

> [!IMPORTANT]
> **デフォルトのキーワードリストは中国語**で記述されており、中国語スパムを対象としています。このツールを使用する前に、**必ずご自身の言語でキーワードを設定してください** — そうしないと、非中国語コンテンツに対してブロッカーは機能しません。（キーワードフィルタリングは**ツイート本文**と**ユーザー表示名**の両方に対応しています）
>
> - **Chrome拡張機能**：拡張アイコンをクリック → キーワードを追加（自動的に保存され適用されます）
> - **Tampermonkey**：スクリプト内の `BLOCKED_KEYWORDS` 配列を編集し、必要に応じて `MAX_EMOJI_COUNT` を設定してください

### ✨ 機能

- 🚫 **キーワードフィルタリング** — 本文またはユーザー表示名に設定したキーワードを含むツイートやコメントを自動非表示
- ⚡ **リアルタイム処理** — `MutationObserver`でスクロール読み込みにも対応
- 💾 **設定の永続化** — Chrome拡張版はキーワードをブラウザのローカルに自動保存
- 🎨 **ビジュアル管理UI** — Chrome拡張はポップアップUIでキーワードを直感的に管理
- 🪶 **軽量・依存なし** — 純粋なVanilla JS実装、ページパフォーマンスへの影響なし
- 🔒 **プライバシー保護** — すべての処理はローカルで完結、データ送信なし

---

## 🚀 2つの使用方法

---

### 方法1：Chrome拡張機能（推奨）

コードを編集せずにポップアップUIでキーワードを管理できます。

#### インストール手順

**1. リポジトリをダウンロード**

```bash
git clone https://github.com/pengjinlong/x-twitter-blocker.git
```

**2. Chrome拡張管理ページを開く**

アドレスバーに入力してアクセス：

```
chrome://extensions/
```

**3. デベロッパーモードを有効化**

ページ右上の **「デベロッパーモード」** をオンにします。

**4. 拡張機能を読み込む**

**「パッケージ化されていない拡張機能を読み込む」** をクリックし、プロジェクトの `chrome-extension/` フォルダを選択します。

**5. 完了！**

[x.com](https://x.com) または [twitter.com](https://twitter.com) にアクセスし、ブラウザツールバーの拡張アイコンをクリックしてキーワードを管理します。

#### 操作方法

| 操作 | 説明 |
|------|------|
| 拡張アイコンをクリック | 設定ポップアップを開く |
| キーワード入力 + 「追加」 | 新しいブロックキーワードを追加（Enterキーも可、自動保存され即時適用） |
| キーワード横の `×` をクリック | そのキーワードを削除（自動保存され即时適用） |
| 「全削除」をクリック | 全キーワードを削除 |
| Emoji閾値の `−` / `+` をクリック | emoji超過ブロックの閾値を調整（自動保存、デフォルト 2、0 で無効化） |

> **Emoji数毟橋について**：X/Twitterのスパムアカウントは表示名や投稿に大量のemojiを詰め込むことがあります。本機能Twitterがレンダリングするemoji画像とUnicode emoji文字の両方をカウントし、閘値超過時に自動ブロックします。

---

### 方法2：Tampermonkeyユーザースクリプト

Tampermonkeyがインストール済みで、コードを直接編集したいユーザー向けです。

#### インストール手順

**1. Tampermonkeyをインストール**

ブラウザの拡張ストアから [Tampermonkey](https://www.tampermonkey.net/) をインストールします。

**2. スクリプトをインストール**

- Tampermonkeyダッシュボードを開く
- **「+」** をクリックして新しいスクリプトを作成
- [`index.js`](../index.js) の全内容を貼り付ける
- `Ctrl + S` で保存

**3. キーワードとEmoji閘値を設定**

スクリプト上部の設定エリアで以下の2項目を編集します：

```javascript
// ブロックキーワードリスト
const BLOCKED_KEYWORDS = [
    'スパムワード',
    '別のキーワード',
    // ここに追加
];

// emoji数毟橋の閘値（0 に設定すると無効）
const MAX_EMOJI_COUNT = 2;
```

**4. 完了！**

X/Twitterのページを更新するとすぐに有効になります。

---

## 📄 ライセンス

このプロジェクトは [MIT License](../LICENSE) のもとで公開されています。

---

<div align="center">

⭐ 役に立てたらStarをお願いします！

</div>
