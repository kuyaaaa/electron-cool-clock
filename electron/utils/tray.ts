// 系统托盘图标菜单配置

import { Menu, Tray, app } from "electron";
import path from "path";
import createSettingWindow from "../views/setting";

export default () => {
    const menu = Menu.buildFromTemplate([
        {
            label: "设置",
            click: () => {
                if (global.WINDOWS.settingWindow) {
                    global.WINDOWS.settingWindow.show();
                } else {
                    createSettingWindow();
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
            global.WINDOWS.mainWindow?.focus();
        });
    });
};
