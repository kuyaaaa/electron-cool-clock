import { app, BrowserWindow } from "electron";
import MainWindow from "./views/mian";

// 全局变量挂载
import "./utils/global";
// 系统托盘图标菜单配置
import "./utils/tray";

const remote = require("@electron/remote/main");

remote.initialize();

// this solve "Passthrough is not supported"
app.disableHardwareAcceleration();

// 开机自启配置
app.setLoginItemSettings({
    openAtLogin: true,
});

app.whenReady().then(() => {
    MainWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            MainWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
