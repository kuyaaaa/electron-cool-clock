// 系统托盘图标菜单配置
const { Menu, Tray, app } = require("electron");
const path = require("path");

const menu = Menu.buildFromTemplate([
    {
        label: "设置",
        click() {}, // 打开相应页面
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
