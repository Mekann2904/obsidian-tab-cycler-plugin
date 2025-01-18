# Right Click & Cmd Scroll Tabs Plugin

このObsidianプラグインを使用すると、右クリック + スクロールまたはCmd（Windows/LinuxではCtrl） + スクロールを使用してタブを切り替えることができます。また、タブスクロールの動作をカスタマイズするための追加機能も提供します。

This Obsidian plugin allows users to scroll through tabs using right-click + scroll or Cmd (Ctrl on Windows/Linux) + scroll. It also provides additional features for customizing the behavior of tab scrolling.

---

## Features | 機能

- **右クリック + スクロール** / **Right Click + Scroll**:
  右クリックを押しながらホイールをスクロールすることでタブを切り替えます。
  Switch between tabs by holding the right mouse button and scrolling the wheel.

- **Cmd + スクロール** / **Cmd + Scroll**:
  Cmd（またはCtrl）キーを押しながらスクロールしてタブをナビゲートします。
  Use Cmd (or Ctrl) + scroll to navigate through tabs.

- **キャンバスタブのスクロール** / **Canvas Tab Scrolling**:
  キャンバスタブのスクロールを有効化（オプション）。
  Enables scrolling through canvas tabs (optional).

- **エラーログ** / **Error Logging**:
  デバッグのためにエラーの詳細をコンソールに出力します（オプション）。
  Outputs error details to the console for debugging (optional).

---

## Installation | インストール方法

### Manual Installation | 手動インストール

1. [Releases](https://github.com/your-repo/obsidian-tab-cycler-plugin/releases)ページから最新のリリースをダウンロードします。
   Download the latest release from the [Releases](https://github.com/your-repo/obsidian-tab-cycler-plugin/releases) page.
2. ZIPファイルを解凍します。
   Extract the ZIP file.
3. `main.js`、`manifest.json`、`styles.css`をObsidianのプラグインフォルダ（通常は`.obsidian/plugins/obsidian-tab-cycler-plugin`）にコピーします。
   Copy `main.js`, `manifest.json`, and `styles.css` into your Obsidian plugin folder (usually located at `.obsidian/plugins/obsidian-tab-cycler-plugin`).
4. Obsidianの設定でプラグインを有効にします。
   Enable the plugin in Obsidian's settings.

---

## Settings | 設定

このプラグインには以下のカスタマイズ可能なオプションがあります：
This plugin offers the following customizable options:

- **右クリック + スクロールを有効化** / **Enable Right Click + Scroll**:
  右クリック + スクロールでタブを切り替える機能を有効または無効にします。
  Toggle the ability to scroll through tabs using right-click + scroll.

- **Cmd + スクロールを有効化** / **Enable Cmd + Scroll**:
  Cmd（またはCtrl） + スクロールでタブを切り替える機能を有効または無効にします。
  Toggle the ability to scroll through tabs using Cmd (or Ctrl) + scroll.

- **キャンバスタブスクロールを有効化** / **Enable Canvas Tab Scroll**:
  キャンバスタブのスクロール機能を有効または無効にします。
  Toggle scrolling for canvas tabs.

- **エラーログの有効化** / **Enable Error Logging**:
  デバッグ目的でエラーの詳細をコンソールに出力します。
  Toggle error logging to the console for debugging purposes.

---

## Usage | 使用方法

1. Obsidianで複数のタブを開きます。
   Open multiple tabs in Obsidian.
2. プラグイン設定で必要な機能を有効化します。
   Enable the desired features in the plugin settings.
3. 右クリック + スクロールまたはCmd + スクロールでタブをナビゲートします。
   Use right-click + scroll or Cmd + scroll to navigate between tabs.

---

## Compatibility | 互換性

- **プラットフォーム** / **Platform**:
  Windows、macOS、Linux
  Windows, macOS, and Linux

- **Obsidianバージョン** / **Obsidian Version**:
  Obsidian v1.0.0以降が必要です。
  Requires Obsidian v1.0.0 or later.

---

## Development | 開発

### Build Instructions | ビルド手順

1. リポジトリをクローンします / Clone the repository:
   ```bash
   git clone https://github.com/your-repo/obsidian-tab-cycler-plugin.git
   cd obsidian-tab-cycler-plugin
   ```
2. 依存関係をインストールします / Install dependencies:
   ```bash
   npm install
   ```
3. プラグインをビルドします / Build the plugin:
   ```bash
   npm run build
   ```
4. ビルドしたファイルを適切なプラグインフォルダにコピーして、ローカルのObsidianボルトで変更をテストします。
   Test your changes in a local Obsidian vault by copying the built files into the appropriate plugin folder.

---

## License | ライセンス

このプラグインは[MITライセンス](LICENSE)の下でライセンスされています。
This plugin is licensed under the [MIT License](LICENSE).

---

## Contribution | コントリビューション

貢献は歓迎します！プラグインの改善のために、問題の報告やプルリクエストを自由に提出してください。
Contributions are welcome! Feel free to submit issues or pull requests to improve the plugin.

---

何か問題が発生したり、機能の提案がある場合は、[GitHubリポジトリ](https://github.com/your-repo/obsidian-tab-cycler-plugin)でIssueを作成してください。
If you encounter any issues or have feature suggestions, please open an issue on the [GitHub repository](https://github.com/your-repo/obsidian-tab-cycler-plugin).

