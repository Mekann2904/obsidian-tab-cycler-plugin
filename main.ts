import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface RightClickScrollTabsSettings {
  enableRightClickScroll: boolean;
  enableCmdScroll: boolean;
  enableCanvasScroll: boolean;
  enableErrorLogging: boolean;
}

const DEFAULT_SETTINGS: RightClickScrollTabsSettings = {
  enableRightClickScroll: true,
  enableCmdScroll: true,
  enableCanvasScroll: false,
  enableErrorLogging: false,
};

export default class RightClickScrollTabsPlugin extends Plugin {
  public settings: RightClickScrollTabsSettings; // public に変更

  private isRightClickHeld: boolean = false;
  private isScrollActionTriggered: boolean = false;

  async onload() {
    console.log('RightClickScrollTabsPlugin loaded');

    await this.loadSettings();

    this.addSettingTab(new RightClickScrollTabsSettingTab(this.app, this));

    // 右クリックの押下状態を追跡
    this.registerDomEvent(document, 'mousedown', (event: MouseEvent) => {
      if (this.settings.enableRightClickScroll && event.button === 2) { // 右クリック
        this.isRightClickHeld = true;
        this.isScrollActionTriggered = false; // リセット
      }
    });

    this.registerDomEvent(document, 'mouseup', (event: MouseEvent) => {
      if (this.settings.enableRightClickScroll && event.button === 2) { // 右クリック
        this.isRightClickHeld = false;
        if (!this.isScrollActionTriggered) {
          this.allowContextMenu(event);
        }
      }
    });

    // ホイールイベントでタブを切り替える
    document.addEventListener(
      'wheel',
      (event: WheelEvent) => {
        try {
          if (this.settings.enableRightClickScroll && this.isRightClickHeld) {
            this.handleTabScroll(event);
            this.isScrollActionTriggered = true;
            event.preventDefault();
          } else if (this.settings.enableCmdScroll && event.metaKey) { // Cmdキー + スクロール
            this.handleTabScroll(event);
            event.preventDefault();
          }
        } catch (error) {
          if (this.settings.enableErrorLogging) {
            console.error("Error in handleTabScroll:", error);
          }
        }
      },
      { passive: false } // passive を無効化
    );
  }

  onunload() {
    console.log('RightClickScrollTabsPlugin unloaded');
  }

  private handleTabScroll(event: WheelEvent) {
    const leaves = this.getFileLeaves(); // 修正箇所
    if (this.settings.enableErrorLogging) console.log("Leaves:", leaves);

    if (leaves.length <= 1) {
      if (this.settings.enableErrorLogging) console.log("Only one tab open. Ignoring scroll.");
      return; // タブが1つ以下の場合は無視
    }

    const direction = event.deltaY > 0 ? 1 : -1; // ホイールの方向
    if (this.settings.enableErrorLogging) console.log("Scroll direction:", direction);

    const currentLeaf = this.app.workspace.activeLeaf;
    if (!currentLeaf) {
      if (this.settings.enableErrorLogging) console.log("No active leaf. Ignoring scroll.");
      return;
    }

    const currentIndex = leaves.indexOf(currentLeaf);
    const newIndex = (currentIndex + direction + leaves.length) % leaves.length;

    if (this.settings.enableErrorLogging) console.log("Current index:", currentIndex, "New index:", newIndex);

    const nextLeaf = leaves[newIndex];
    if (nextLeaf) {
      if (this.settings.enableErrorLogging) console.log("Switching to leaf:", nextLeaf);
      this.app.workspace.setActiveLeaf(nextLeaf, { focus: true });
    }
  }

  private getFileLeaves() {
    const leaves: any[] = [];
    this.app.workspace.iterateAllLeaves((leaf) => {
      const viewType = leaf.view?.getViewType();
      if (
        viewType === 'markdown' ||
        viewType === 'pdf' ||
        (this.settings.enableCanvasScroll && viewType === 'canvas') // Canvas に対応
      ) {
        leaves.push(leaf);
      }
    });
    return leaves;
  }

  private allowContextMenu(event: MouseEvent) {
    const customContextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: event.clientX,
      clientY: event.clientY,
    });
    event.target?.dispatchEvent(customContextMenuEvent);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class RightClickScrollTabsSettingTab extends PluginSettingTab {
  plugin: RightClickScrollTabsPlugin;

  constructor(app: App, plugin: RightClickScrollTabsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'Right Click & Cmd Scroll Tabs Settings' });

    // 右クリック+スクロールの有効/無効
    new Setting(containerEl)
      .setName('Enable Right Click + Scroll')
      .setDesc('Toggle to enable or disable scrolling tabs with right click + scroll.')
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enableRightClickScroll)
          .onChange(async (value) => {
            this.plugin.settings.enableRightClickScroll = value;
            await this.plugin.saveSettings();
          })
      );

    // Cmdキー+スクロールの有効/無効
    new Setting(containerEl)
      .setName('Enable Cmd + Scroll')
      .setDesc('Toggle to enable or disable scrolling tabs with Cmd key + scroll.')
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enableCmdScroll)
          .onChange(async (value) => {
            this.plugin.settings.enableCmdScroll = value;
            await this.plugin.saveSettings();
          })
      );

    // Canvas のスクロール対応の有効/無効
    new Setting(containerEl)
      .setName('Enable Canvas Tab Scroll')
      .setDesc('Toggle to enable or disable scrolling for canvas tabs.')
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enableCanvasScroll)
          .onChange(async (value) => {
            this.plugin.settings.enableCanvasScroll = value;
            await this.plugin.saveSettings();
          })
      );

    // エラーログ出力の有効/無効
    new Setting(containerEl)
      .setName('Enable Error Logging')
      .setDesc('Toggle to enable or disable error logging to the console.')
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.enableErrorLogging)
          .onChange(async (value) => {
            this.plugin.settings.enableErrorLogging = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
