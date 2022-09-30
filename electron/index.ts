import { app, BrowserWindow } from "electron";
import remote from "@electron/remote/main";
import createMainWindow from "./views/main";
import { isFirstLaunch } from "./utils/utils";
// 全局变量挂载
import "./utils/global";
// 系统托盘
import createTray from "./utils/tray";

remote.initialize();

// this solve "Passthrough is not supported"
app.disableHardwareAcceleration();

// 开机自启配置
if (isFirstLaunch()) {
    app.setLoginItemSettings({ openAtLogin: true });
}

// 多开检测
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    createTray();
    app.on("second-instance", () => {
        const { mainWindow } = global.WINDOWS;
        mainWindow?.focus();
    });
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
