/** ipcRenderer交互方法 */
const { ipcRenderer } = require("electron");

/**
 * 窗口移动ipcRenderer发送消息
 * @param   canMove     是否可以移动
 */
export const ipcWindowMove = (canMove: boolean) => ipcRenderer.send("window-move-open", canMove);

/**
 * 关闭当前窗口
 */
export const ipcCloseCurrentWindow = () => ipcRenderer.send("close-current-window");
