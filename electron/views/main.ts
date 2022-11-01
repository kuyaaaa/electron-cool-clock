import { app, BrowserWindow, ipcMain, shell } from "electron";
import EleStore from "electron-store";
import path from "path";
import { env as PROCESS_ENV } from "process";
import remote from "@electron/remote/main";
import windowMove from "../utils/drag";

const store = new EleStore();

const windowPosition = store.get("window-position") as { x: number; y: number } | undefined;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 100,
        x: windowPosition?.x,
        y: windowPosition?.y,
        type: "toolbar",
        frame: false,
        resizable: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
            preload: path.join(__dirname, "./preload.js"),
        },
    });

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../index.html"));
    } else {
        const url = `http://${PROCESS_ENV.VITE_DEV_SERVER_HOST}:${PROCESS_ENV.VITE_DEV_SERVER_PORT}`;
        win.loadURL(url);
    }

    remote.enable(win.webContents);
    // 窗口移动挂载
    windowMove(win);

    win.on("move", () => {
        const [x, y] = win.getPosition();
        store.set("window-position", { x, y });
    });

    ipcMain.on("reload-window", () => {
        win.reload();
    });

    ipcMain.on("get-page-size", (event, size) => {
        win.setContentSize(size.width + 4, size.height + 4, true);
    });

    ipcMain.on("open-browser", (event, url) => {
        shell.openExternal(url);
    });

    win.once("close", () => {
        global.WINDOWS.mainWindow = null;
    });

    global.WINDOWS.mainWindow = win;
};

export default createWindow;
