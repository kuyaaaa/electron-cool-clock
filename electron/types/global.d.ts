// 全局变量 global.* 拓展定义
/* eslint-disable no-var, vars-on-top, no-unused-vars */
import type { BrowserWindow } from "electron";

declare global {
    /** 窗口相关全局变量 */
    var WINDOWS: {
        /** 设置窗口实例 */
        settingWindow: BrowserWindow | null;
    };
}

export {};
