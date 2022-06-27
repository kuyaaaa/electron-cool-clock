// 系统托盘图标菜单配置
import SettingWindow from "../views/setting";

const { Menu, Tray, app } = require("electron");
const path = require("path");

const menu = Menu.buildFromTemplate([
    {
        label: "设置",
        click: () => SettingWindow(),
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
        ? path.join(__dirname, "../../public/favicon.ico")
        : path.join(__dirname, "../favicon.ico");

    const appTray = new Tray(iconPath);

    appTray.setToolTip("cool-clock");
    appTray.setContextMenu(menu);

    // 双击事件
    appTray.on("double-click", () => {
        console.log("double-click");
    });
});
