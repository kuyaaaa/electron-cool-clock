import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { env as PROCESS_ENV } from "process";

/** 前端页面路径名 */
const FRONT_PATH = "setting";

const createWindow = () => {
    const win = new BrowserWindow({
        title: "setting",
        width: 1000,
        height: 700,
        resizable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
            preload: path.join(__dirname, "./preload.js"),
        },
    });

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, `../index.html`), {
            hash: `${FRONT_PATH}`,
        });
    } else {
        const url = `http://${PROCESS_ENV.VITE_DEV_SERVER_HOST}:${PROCESS_ENV.VITE_DEV_SERVER_PORT}/#/${FRONT_PATH}`;
        win.loadURL(url);
    }

    win.once("close", () => {
        global.WINDOWS.settingWindow = null;
    });

    ipcMain.once("close-current-window", () => {
        win.close();
    });

    global.WINDOWS.settingWindow = win;
};

export default createWindow;
