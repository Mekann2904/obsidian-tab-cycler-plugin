import { App, Plugin } from 'obsidian';

export default class RightClickScrollTabsPlugin extends Plugin {
  onload() {
    console.log('RightClickScrollTabsPlugin loaded');

    // イベントリスナーを追加
    this.registerDomEvent(document, 'wheel', (event: WheelEvent) => {
      if (event.buttons === 2) { // 右クリックが押されている場合
        this.handleTabScroll(event);
      }
    });
  }

  onunload() {
    console.log('RightClickScrollTabsPlugin unloaded');
  }

  private handleTabScroll(event: WheelEvent) {
    const workspaces = this.app.workspace.getLeavesOfType('markdown');
    if (workspaces.length <= 1) return; // タブが1つ以下の場合は無視

    // ホイールの方向でタブを切り替え
    const direction = event.deltaY > 0 ? 1 : -1;
    const currentLeaf = this.app.workspace.activeLeaf;
    if (!currentLeaf) return;

    const currentIndex = workspaces.indexOf(currentLeaf);
    const newIndex = (currentIndex + direction + workspaces.length) % workspaces.length;

    const nextLeaf = workspaces[newIndex];
    if (nextLeaf) {
      this.app.workspace.setActiveLeaf(nextLeaf);
    }

    event.preventDefault(); // デフォルトのスクロール動作を防ぐ
  }
}
