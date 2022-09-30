/** ipcRenderer交互方法 */
import { ipcRenderer } from "electron";

/**
 * 窗口移动ipcRenderer发送消息
 * @param   canMove     是否可以移动
 */
export const ipcWindowMove = (canMove: boolean) => ipcRenderer.send("window-move-open", canMove);

/**
 * 关闭当前窗口
 */
export const ipcCloseCurrentWindow = () => ipcRenderer.send("close-current-window");

/**
 * 刷新窗口页面
 */
export const ipcReloadWindow = () => ipcRenderer.send("reload-window");

/**
 * 获取页面的宽高
 */
export const ipcGetPageSize = (size: { width: number; height: number }) =>
    ipcRenderer.send("get-page-size", size);
