import { app, BrowserWindow } from "electron";
import path from "path";
import { env as PROCESS_ENV } from "process";

const remote = require("@electron/remote/main");

remote.initialize();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 280,
        height: 48,
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
};

// this solve "Passthrough is not supported"
app.disableHardwareAcceleration();

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
