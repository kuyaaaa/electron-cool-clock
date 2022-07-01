import { screen as electronScreen, ipcMain, BrowserWindow } from "electron";

/**
 * 窗口移动事件
 * author: https://zhuanlan.zhihu.com/p/112564936
 */
export default (win: BrowserWindow) => {
    let winStartPosition = { x: 0, y: 0 };
    let mouseStartPosition = { x: 0, y: 0 };
    let movingInterval: any = null;

    /** 窗口移动事件 */
    ipcMain.on("window-move-open", (events, canMoving) => {
        if (canMoving) {
            // 读取原位置
            const winPosition = win.getPosition();
            winStartPosition = { x: winPosition[0], y: winPosition[1] };
            mouseStartPosition = electronScreen.getCursorScreenPoint();
            // 清除
            if (movingInterval) {
                clearInterval(movingInterval);
            }
            // 新开
            movingInterval = setInterval(() => {
                // 实时更新位置
                const cursorPosition = electronScreen.getCursorScreenPoint();
                const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
                const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
                win.setPosition(x, y, true);
            }, 20);
        } else {
            clearInterval(movingInterval);
            movingInterval = null;
        }
    });
};
