// 系统托盘图标菜单配置
import SettingWindow from "../views/setting";

const { Menu, Tray, app, BrowserWindow } = require("electron");
const path = require("path");

const menu = Menu.buildFromTemplate([
    {
        label: "设置",
        click: () => {
            if (global.WINDOWS.settingWindow) {
                global.WINDOWS.settingWindow.show();
            } else {
                SettingWindow();
            }
        },
    },
    {
        label: "退出",
        click() {
            app.quit();
        },
    },
]);

app.whenReady().then(() => {
    const iconPath = !app.isPackaged
        ? path.join(__dirname, "../../public/favicon-32.ico")
        : path.join(__dirname, "../favicon-32.ico");

    const appTray = new Tray(iconPath);

    appTray.setToolTip("cool-clock");
    appTray.setContextMenu(menu);

    // 双击事件
    appTray.on("double-click", () => {
        console.log("double-click");
    });
});
